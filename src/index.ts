// Mapbox import
import mapboxgl from "mapbox-gl";
import { PMTiles, Protocol, TileType } from "pmtiles";

// @ts-expect-error
const VectorTileSourceImpl = mapboxgl.Style.getSourceType("vector");
export const SOURCE_TYPE = "pmtile-source";



const extend = (dest: any, ...sources: any): any => {
    for (const src of sources) {
        for (const k in src) {
            dest[k] = src[k];
        }
    }
    return dest;
}

const mercatorXFromLng = (lng: number): number => {
    return (180 + lng) / 360;
}

const mercatorYFromLat = (lat: number): number => {
    return (
        (180 -
            (180 / Math.PI) *
            Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))) /
        360
    );
}

class TileBounds {
    bounds;
    minzoom;
    maxzoom;

    constructor(bounds: mapboxgl.LngLatBoundsLike, minzoom: number, maxzoom: number) {
        this.bounds = mapboxgl.LngLatBounds.convert(this.validateBounds(bounds));
        this.minzoom = minzoom || 0;
        this.maxzoom = maxzoom || 24;
    }

    validateBounds(bounds: mapboxgl.LngLatBoundsLike): mapboxgl.LngLatBoundsLike {
        // make sure the bounds property contains valid longitude and latitudes
        if (!Array.isArray(bounds) || bounds.length !== 4)
            return [-180, -90, 180, 90];
        return [
            Math.max(-180, bounds[0]),
            Math.max(-90, bounds[1]),
            Math.min(180, bounds[2]),
            Math.min(90, bounds[3]),
        ];
    }

    contains(tileID: TileID): boolean {
        const worldSize = Math.pow(2, tileID.z);
        const level = {
            minX: Math.floor(mercatorXFromLng(this.bounds.getWest()) * worldSize),
            minY: Math.floor(mercatorYFromLat(this.bounds.getNorth()) * worldSize),
            maxX: Math.ceil(mercatorXFromLng(this.bounds.getEast()) * worldSize),
            maxY: Math.ceil(mercatorYFromLat(this.bounds.getSouth()) * worldSize),
        };
        const hit =
            tileID.x >= level.minX &&
            tileID.x < level.maxX &&
            tileID.y >= level.minY &&
            tileID.y < level.maxY;
        return hit;
    }
}

class Event {
    type: string;

    constructor(type: string, data: any = {}) {
        extend(this, data);
        this.type = type;
    }
}
class ErrorEvent extends Event {
    error: Error | undefined;

    constructor(error: Error, data: Object = {}) {
        super('error', extend({ error }, data));
    }
}

type Callback<T> = (error: Error | null | undefined, result: T | null | undefined) => void;
type MapboxMap = mapboxgl.Map & {
    _refreshExpiredTiles: any,
    _requestManager: any,
    painter: any
}
/**
 * Pmtiles Options
 */
type PmTilesOptions = {
    /**
     * The pmtile url
     */
    url: string
}



type Tile = {
    setTexture(arg0: (data: any) => any, painter: any): unknown;
    request: any;
    aborted: any;
    resourceTiming: any;
    setExpiryData(data: any): unknown;
    loadVectorData(data: any, painter: any): unknown;
    reloadCallback: any;
    tileID: any;
    uid: any;
    tileZoom: any;
    isSymbolTile: any;
    isExtraShadowCaster: any;
    actor: any;
    state: string;

}

type TileID = {
    z: number;
    x: number;
    y: number;
    canonical: TileID;

}
export const PmTilesSource = class PmTileSourceImpl extends VectorTileSourceImpl {
    static SOURCE_TYPE = SOURCE_TYPE

    id: string;
    scheme: string;
    minzoom!: number;
    maxzoom!: number;
    tileSize: number;
    attribution: string | undefined;
    tiles: string[];
    map!: MapboxMap;

    roundZoom: boolean = true;
    tileBounds: TileBounds | undefined;
    minTileCacheSize: number | undefined;
    maxTileCacheSize: number | undefined;
    promoteId: string | undefined;
    type: string = 'vector';
    fire!: Function;
    scope: string | undefined;
    dispatcher;
    reparseOverscaled: boolean;
    setEventedParent: any;


    _loaded;
    _tileWorkers!: { [string: string]: any; };
    _dataType;
    _implementation;
    _protocol: Protocol;
    _instance: PMTiles;
    _collectResourceTiming: boolean = false;
    _tileJSONRequest: Promise<any> | undefined;
    loadTile!: (tile: Tile, callback: Callback<void>) => void;
    tileType!: TileType;
    header: any;
    contentType!: string;

    static async getMetadata(url: string): Promise<any> {
        const instance = new PMTiles(url);
        return instance.getMetadata()
    }

    constructor(...args: [string, PmTilesOptions, any, any]) {
        super(...args);
        const [id, implementation, dispatcher, eventedParent] = args
        this.id = id;
        this._dataType = 'vector';
        this.dispatcher = dispatcher;
        this._implementation = implementation;
        if (!this._implementation) {
            this.fire(new ErrorEvent(new Error(`Missing implementation for ${this.id} custom source`)));
        }

        const { url } = implementation;

        this.reparseOverscaled = true;
        this.scheme = 'zxy';
        this.tileSize = 512;

        this._loaded = false;

        this.type = 'vector';
        this._protocol = new Protocol();

        this.tiles = [`pmtiles://${url}/{z}/{x}/{y}`]

        const p = new PMTiles(url);

        // this is so we share one instance across the JS code and the map renderer
        this._protocol.add(p);
        this._instance = p;

    }

    zoomToExtent() {
        const { minZoom, maxZoom, minLon, minLat, maxLon, maxLat, centerZoom, centerLon, centerLat } = this.header

        if (minZoom != null && maxZoom != null && minLon != null && minLat != null && maxLon != null && maxLat != null) {

            this.map.fitBounds([centerLat, centerLon
            ], { maxZoom: centerZoom });
        }
    }

    hasTile(tileID: TileID) {
        return !this.tileBounds || this.tileBounds.contains(tileID.canonical);
    }
    load(callback?: Callback<void>) {
        this._loaded = false;
        this.fire(new Event("dataloading", { dataType: "source" }));
        // We need to get both header and metadata 
        this._tileJSONRequest = Promise.all([this._instance.getHeader(), this._instance.getMetadata()]).then(([header, tileJSON]: any) => {

            this.header = header;
            const { specVersion, clustered, tileType, minZoom, maxZoom, minLon, minLat, maxLon, maxLat, centerZoom, centerLon, centerLat } = header

            if (minZoom != null && maxZoom != null && minLon != null && minLat != null && maxLon != null && maxLat != null) {
                this.tileBounds = new TileBounds(
                    [minLon, minLat, maxLon, maxLat],
                    minZoom,
                    maxZoom
                );
                this.minzoom = minZoom
                this.maxzoom = maxZoom

                // this.map.fitBounds([minLon, minLat, maxLon, maxLat], { maxZoom: centerZoom });
            }

            if (this.maxzoom == undefined) {
                console.warn('The maxzoom parameter is not defined in the source json. This can cause memory leak. So make sure to define maxzoom in the layer')
            }

            this._tileJSONRequest = undefined;
            this._loaded = true;

            extend(this, tileJSON);
            // we set this.type after extend to avoid overwriting 
            this.tileType = tileType

            switch (tileType) {
                case TileType.Png:
                    this.contentType = 'image/png';
                    break;
                case TileType.Jpeg:
                    this.contentType = 'image/jpeg';
                    break;
                case TileType.Webp:
                    this.contentType = 'image/webp';
                    break;
                case TileType.Avif:
                    this.contentType = 'image/avif';
                    break;
            }

            if ([TileType.Jpeg, TileType.Png].includes(this.tileType)) {
                this.loadTile = this.loadRasterTile
                this.type = 'raster';
            } else if (this.tileType === TileType.Mvt) {
                this.loadTile = this.loadVectorTile
                this.type = 'vector';
            } else {
                this.fire(new ErrorEvent(new Error("Unsupported Tile Type")));
            }

            // `content` is included here to prevent a race condition where `Style#updateSources` is called
            // before the TileJSON arrives. this makes sure the tiles needed are loaded once TileJSON arrives
            // ref: https://github.com/mapbox/mapbox-gl-js/pull/4347#discussion_r104418088
            this.fire(
                new Event("data", { dataType: "source", sourceDataType: "metadata" })
            );
            this.fire(
                new Event("data", { dataType: "source", sourceDataType: "content" })
            );
        }).catch((err: any) => {
            this.fire(new ErrorEvent(err));
            if (callback) callback(err);
        });
    }
    loaded(): boolean {
        return this._loaded;
    }
    loadVectorTile(tile: Tile, callback: Callback<void>) {
        const done = (err: Error | null | undefined, data?: any) => {
            delete tile.request;

            if (tile.aborted) return callback(null);

            if (err && (err as any).status !== 404) {
                return callback(err);
            }

            if (data && data.resourceTiming)
                tile.resourceTiming = data.resourceTiming;

            if (this.map?._refreshExpiredTiles && data) tile.setExpiryData(data);
            tile.loadVectorData(data, this.map?.painter);

            // cacheEntryPossiblyAdded(this.dispatcher);

            callback(null);

            if (tile.reloadCallback) {
                this.loadVectorTile(tile, tile.reloadCallback);
                tile.reloadCallback = null;
            }
        }

        const url = this.map?._requestManager.normalizeTileURL(
            tile.tileID.canonical.url(this.tiles, this.scheme)
        );
        const request = this.map?._requestManager.transformRequest(url, "Tile");

        const params = {
            request,
            data: {},
            uid: tile.uid,
            tileID: tile.tileID,
            tileZoom: tile.tileZoom,
            zoom: tile.tileID.overscaledZ,
            tileSize: this.tileSize * tile.tileID.overscaleFactor(),
            type: "vector",
            source: this.id,
            scope: this.scope,
            // pixelRatio: browser.devicePixelRatio,
            showCollisionBoxes: this.map?.showCollisionBoxes,
            promoteId: this.promoteId,
            isSymbolTile: tile.isSymbolTile,
            // brightness: this.map.style ? (this.map.style.getBrightness() || 0.0) : 0.0,
            extraShadowCaster: tile.isExtraShadowCaster,
        };
        // params.request.collectResourceTiming = this._collectResourceTiming;

        const afterLoad = (error: any, data: any, cacheControl: any, expires: any) => {
            if (error || !data) {
                done.call(this, error);
                return
            }
            // if (data.length == 0) {
            //     done.call(this, new Error("zero size data"));
            //     return
            // }
            params.data = {
                cacheControl: cacheControl,
                expires: expires,
                rawData: data,
            };
            // // the worker will skip the network request if the data is already there
            if (this.map._refreshExpiredTiles) tile.setExpiryData({ cacheControl, expires });
            if (tile.actor)
                tile.actor.send(
                    "loadTile",
                    params,
                    done.bind(this),
                    undefined,
                    true
                );
        };

        if (!tile.actor || tile.state === "expired") {
            tile.actor = this._tileWorkers[url] = this._tileWorkers[url] || this.dispatcher.getActor();

            tile.request = this._protocol.tile({ ...request }, afterLoad);
            // always load tiles on the main thread and pass the result instead of requesting a worker to do so

        } else if (tile.state === "loading") {
            // schedule tile reloading after it has been loaded
            tile.reloadCallback = callback;
        } else {
            debugger
            tile.request = this._protocol.tile({ ...tile, url }, afterLoad);
        }
        console.log(url)
    }

    loadRasterTileData(tile: Tile, data: any): void {
        tile.setTexture(data, this.map.painter);
    }

    loadRasterTile(tile: Tile, callback: Callback<void>) {
        const done = ({ data, cacheControl, expires }: any) => {
            delete tile.request;

            if (tile.aborted) return callback(null);

            // If the implementation returned `null` as tile data,
            // mark the tile as `loaded` and use an an empty image as tile data.
            // A map will render nothing in the tile’s space.
            if (data === null || data === undefined) {
                const emptyImage = { width: this.tileSize, height: this.tileSize, data: null };
                this.loadRasterTileData(tile, (emptyImage as any));
                tile.state = 'loaded';
                return callback(null);
            }

            if (data && data.resourceTiming)
                tile.resourceTiming = data.resourceTiming;

            if (this.map._refreshExpiredTiles) tile.setExpiryData({ cacheControl, expires });


            const blob = new window.Blob([new Uint8Array(data)], { type: 'image/png' });
            window.createImageBitmap(blob).then((imageBitmap) => {
                this.loadRasterTileData(tile, imageBitmap);
                tile.state = 'loaded';
                callback(null);
            }).catch((error) => {
                tile.state = 'errored';
                return callback(new Error(`Can't infer data type for ${this.id}, only raster data supported at the moment. ${error}`));
            })

        }

        const url = this.map?._requestManager.normalizeTileURL(
            tile.tileID.canonical.url(this.tiles, this.scheme)
        );
        const request = this.map?._requestManager.transformRequest(url, "Tile");

        const params = {
            ...request,

        };
        const controller = new AbortController();
        tile.request = { cancel: () => controller.abort() };
        this._protocol.tile(params, controller).then(done.bind(this))
            .catch(error => {
                // silence AbortError
                if (error.code === 20) return;
                tile.state = 'errored';
                callback(error);
            });

    }
}
export default PmTilesSource;

var mapboxPmTiles=function(e,t){"use strict";var r=Math.pow,n=(e,t,r)=>new Promise(((n,i)=>{var o=e=>{try{a(r.next(e))}catch(t){i(t)}},s=e=>{try{a(r.throw(e))}catch(t){i(t)}},a=e=>e.done?n(e.value):Promise.resolve(e.value).then(o,s);a((r=r.apply(e,t)).next())})),i=Uint8Array,o=Uint16Array,s=Int32Array,a=new i([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),l=new i([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),c=new i([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),h=function(e,t){for(var r=new o(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];var i=new s(r[30]);for(n=1;n<30;++n)for(var a=r[n];a<r[n+1];++a)i[a]=a-r[n]<<5|n;return{b:r,r:i}},u=h(a,2),d=u.b,f=u.r;d[28]=258,f[258]=28;var g,m=h(l,0).b,p=new o(32768);for(w=0;w<32768;++w)g=(61680&(g=(52428&(g=(43690&w)>>1|(21845&w)<<1))>>2|(13107&g)<<2))>>4|(3855&g)<<4,p[w]=((65280&g)>>8|(255&g)<<8)>>1;var y=function(e,t,r){for(var n=e.length,i=0,s=new o(t);i<n;++i)e[i]&&++s[e[i]-1];var a,l=new o(t);for(i=1;i<t;++i)l[i]=l[i-1]+s[i-1]<<1;a=new o(1<<t);var c=15-t;for(i=0;i<n;++i)if(e[i])for(var h=i<<4|e[i],u=t-e[i],d=l[e[i]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)a[p[d]>>c]=h;return a},v=new i(288);for(w=0;w<144;++w)v[w]=8;for(w=144;w<256;++w)v[w]=9;for(w=256;w<280;++w)v[w]=7;for(w=280;w<288;++w)v[w]=8;var w,x=new i(32);for(w=0;w<32;++w)x[w]=5;var b=y(v,9),T=y(x,5),D=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},U=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(7&t)&r},L=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(7&t)},M=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],z=function(e,t,r){var n=new Error(t||M[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,z),!r)throw n;return n},E=function(e,t,r,n){var o=e.length;if(!o||t.f&&!t.l)return r||new i(0);var s=!r||2!=t.i,h=t.i;r||(r=new i(3*o));var u=function(e){var t=r.length;if(e>t){var n=new i(Math.max(2*t,e));n.set(r),r=n}},f=t.f||0,g=t.p||0,p=t.b||0,v=t.l,w=t.d,x=t.m,M=t.n,E=8*o;do{if(!v){f=U(e,g,1);var C=U(e,g+1,3);if(g+=3,!C){var A=e[(H=4+((g+7)/8|0))-4]|e[H-3]<<8,_=H+A;if(_>o){h&&z(0);break}s&&u(p+A),r.set(e.subarray(H,_),p),t.b=p+=A,t.p=g=8*_,t.f=f;continue}if(1==C)v=b,w=T,x=9,M=5;else if(2==C){var S=U(e,g,31)+257,B=U(e,g+10,15)+4,P=S+U(e,g+5,31)+1;g+=14;for(var Z=new i(P),k=new i(19),I=0;I<B;++I)k[c[I]]=U(e,g+3*I,7);g+=3*B;var O=D(k),V=(1<<O)-1,$=y(k,O);for(I=0;I<P;){var H,R=$[U(e,g,V)];if(g+=15&R,(H=R>>4)<16)Z[I++]=H;else{var q=0,j=0;for(16==H?(j=3+U(e,g,3),g+=2,q=Z[I-1]):17==H?(j=3+U(e,g,7),g+=3):18==H&&(j=11+U(e,g,127),g+=7);j--;)Z[I++]=q}}var W=Z.subarray(0,S),K=Z.subarray(S);x=D(W),M=D(K),v=y(W,x),w=y(K,M)}else z(1);if(g>E){h&&z(0);break}}s&&u(p+131072);for(var J=(1<<x)-1,N=(1<<M)-1,F=g;;F=g){var Y=(q=v[L(e,g)&J])>>4;if((g+=15&q)>E){h&&z(0);break}if(q||z(2),Y<256)r[p++]=Y;else{if(256==Y){F=g,v=null;break}var G=Y-254;if(Y>264){var Q=a[I=Y-257];G=U(e,g,(1<<Q)-1)+d[I],g+=Q}var X=w[L(e,g)&N],ee=X>>4;X||z(3),g+=15&X;K=m[ee];if(ee>3){Q=l[ee];K+=L(e,g)&(1<<Q)-1,g+=Q}if(g>E){h&&z(0);break}s&&u(p+131072);var te=p+G;if(p<K){var re=0-K,ne=Math.min(K,te);for(re+p<0&&z(3);p<ne;++p)r[p]=n[re+p]}for(;p<te;p+=4)r[p]=r[p-K],r[p+1]=r[p+1-K],r[p+2]=r[p+2-K],r[p+3]=r[p+3-K];p=te}}t.l=v,t.p=F,t.b=p,t.f=f,v&&(f=1,t.m=x,t.d=w,t.n=M)}while(!f);return p==r.length?r:function(e,t,r){(null==r||r>e.length)&&(r=e.length);var n=new i(r-t);return n.set(e.subarray(t,r)),n}(r,0,p)},C=new i(0),A=function(e){31==e[0]&&139==e[1]&&8==e[2]||z(6,"invalid gzip data");var t=e[3],r=10;4&t&&(r+=2+(e[10]|e[11]<<8));for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!e[r++]);return r+(2&t)},_=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},S=function(e,t){return(8!=(15&e[0])||e[0]>>4>7||(e[0]<<8|e[1])%31)&&z(6,"invalid zlib data"),(e[1]>>5&1)==+!t&&z(6,"invalid zlib data: "+(32&e[1]?"need":"unexpected")+" dictionary"),2+(e[1]>>3&4)};function B(e,t){return 31==e[0]&&139==e[1]&&8==e[2]?function(e,t){var r=A(e);return r+8>e.length&&z(6,"invalid gzip data"),E(e.subarray(r,-8),{i:2},new i(_(e)),t)}(e,t):8!=(15&e[0])||e[0]>>4>7||(e[0]<<8|e[1])%31?function(e,t){return E(e,{i:2},t,t)}(e,t):function(e,t){return E(e.subarray(S(e,t),-4),{i:2},t,t)}(e,t)}var P="undefined"!=typeof TextDecoder&&new TextDecoder;try{P.decode(C,{stream:!0}),1}catch(ve){}var Z=(e,t)=>e*r(2,t),k=(e,t)=>Math.floor(e/r(2,t)),I=(e,t)=>Z(e.getUint16(t+1,!0),8)+e.getUint8(t),O=(e,t)=>Z(e.getUint32(t+2,!0),16)+e.getUint16(t,!0),V=(e,t,r,n,i)=>{if(e!==n.getUint8(i))return e-n.getUint8(i);const o=I(n,i+1);if(t!==o)return t-o;const s=I(n,i+4);return r!==s?r-s:0},$=(e,t,r,n)=>{const i=H(e,t,r,n);return i?{z:t,x:r,y:n,offset:i[0],length:i[1],isDir:!1}:null},H=(e,t,r,n)=>{let i=0,o=e.byteLength/17-1;for(;i<=o;){const s=o+i>>1,a=V(t,r,n,e,17*s);if(a>0)i=s+1;else{if(!(a<0))return[O(e,17*s+7),e.getUint32(17*s+13,!0)];o=s-1}}return null},R=(e,t)=>e.isDir&&!t.isDir?1:!e.isDir&&t.isDir?-1:e.z!==t.z?e.z-t.z:e.x!==t.x?e.x-t.x:e.y-t.y,q=(e,t)=>{const r=e.getUint8(17*t);return{z:127&r,x:I(e,17*t+1),y:I(e,17*t+4),offset:O(e,17*t+7),length:e.getUint32(17*t+13,!0),isDir:r>>7==1}},j=e=>{const t=[],r=new DataView(e);for(let n=0;n<r.byteLength/17;n++)t.push(q(r,n));return W(t)},W=e=>{e.sort(R);const t=new ArrayBuffer(17*e.length),r=new Uint8Array(t);for(let n=0;n<e.length;n++){const t=e[n];let i=t.z;t.isDir&&(i|=128),r[17*n]=i,r[17*n+1]=255&t.x,r[17*n+2]=t.x>>8&255,r[17*n+3]=t.x>>16&255,r[17*n+4]=255&t.y,r[17*n+5]=t.y>>8&255,r[17*n+6]=t.y>>16&255,r[17*n+7]=255&t.offset,r[17*n+8]=255&k(t.offset,8),r[17*n+9]=255&k(t.offset,16),r[17*n+10]=255&k(t.offset,24),r[17*n+11]=255&k(t.offset,32),r[17*n+12]=255&k(t.offset,48),r[17*n+13]=255&t.length,r[17*n+14]=t.length>>8&255,r[17*n+15]=t.length>>16&255,r[17*n+16]=t.length>>24&255}return t};var K={getHeader:function(e){return n(this,null,(function*(){const t=yield e.getBytes(0,512e3),r=new DataView(t.data),n=r.getUint32(4,!0),i=r.getUint16(8,!0),o=new TextDecoder("utf-8"),s=JSON.parse(o.decode(new DataView(t.data,10,n)));let a=0;"gzip"===s.compression&&(a=2);let l=0;"minzoom"in s&&(l=+s.minzoom);let c=0;"maxzoom"in s&&(c=+s.maxzoom);let h=0,u=0,d=0,f=-180,g=-85,m=180,p=85;if(s.bounds){const e=s.bounds.split(",");f=+e[0],g=+e[1],m=+e[2],p=+e[3]}if(s.center){const e=s.center.split(",");h=+e[0],u=+e[1],d=+e[2]}return{specVersion:r.getUint16(2,!0),rootDirectoryOffset:10+n,rootDirectoryLength:17*i,jsonMetadataOffset:10,jsonMetadataLength:n,leafDirectoryOffset:0,leafDirectoryLength:void 0,tileDataOffset:0,tileDataLength:void 0,numAddressedTiles:0,numTileEntries:0,numTileContents:0,clustered:!1,internalCompression:1,tileCompression:a,tileType:1,minZoom:l,maxZoom:c,minLon:f,minLat:g,maxLon:m,maxLat:p,centerZoom:d,centerLon:h,centerLat:u,etag:t.etag}}))},getZxy:function(e,t,r,i,o,s,a){return n(this,null,(function*(){let n=yield r.getArrayBuffer(t,e.rootDirectoryOffset,e.rootDirectoryLength,e);1===e.specVersion&&(n=j(n));const l=$(new DataView(n),i,o,s);if(l){let e=(yield t.getBytes(l.offset,l.length,a)).data;const r=new DataView(e);return 31===r.getUint8(0)&&139===r.getUint8(1)&&(e=B(new Uint8Array(e))),{data:e}}const c=((e,t)=>{if(e.byteLength<17)return null;const r=e.byteLength/17,n=q(e,r-1);if(n.isDir){const e=n.z,r=t.z-e;return{z:e,x:Math.trunc(t.x/(1<<r)),y:Math.trunc(t.y/(1<<r))}}return null})(new DataView(n),{z:i,x:o,y:s});if(c){const l=((e,t,r,n)=>{const i=H(e,128|t,r,n);return i?{z:t,x:r,y:n,offset:i[0],length:i[1],isDir:!0}:null})(new DataView(n),c.z,c.x,c.y);if(l){let n=yield r.getArrayBuffer(t,l.offset,l.length,e);1===e.specVersion&&(n=j(n));const c=$(new DataView(n),i,o,s);if(c){let e=(yield t.getBytes(c.offset,c.length,a)).data;const r=new DataView(e);return 31===r.getUint8(0)&&139===r.getUint8(1)&&(e=B(new Uint8Array(e))),{data:e}}}}}))}},J=class{constructor(){var e;this.tilev4=(e,t)=>n(this,null,(function*(){if("json"===e.type){const t=e.url.substr(10);let r=this.tiles.get(t);r||(r=new ae(t),this.tiles.set(t,r));const n=yield r.getHeader();return{data:{tiles:[`${e.url}/{z}/{x}/{y}`],minzoom:n.minZoom,maxzoom:n.maxZoom,bounds:[n.minLon,n.minLat,n.maxLon,n.maxLat]}}}const r=new RegExp(/pmtiles:\/\/(.+)\/(\d+)\/(\d+)\/(\d+)/),n=e.url.match(r);if(!n)throw new Error("Invalid PMTiles protocol URL");const i=n[1];let o=this.tiles.get(i);o||(o=new ae(i),this.tiles.set(i,o));const s=n[2],a=n[3],l=n[4],c=yield o.getHeader(),h=yield null==o?void 0:o.getZxy(+s,+a,+l,t.signal);return h?{data:new Uint8Array(h.data),cacheControl:h.cacheControl,expires:h.expires}:1===c.tileType?{data:new Uint8Array}:{data:null}})),this.tile=(e=this.tilev4,(t,r)=>{if(r instanceof AbortController)return e(t,r);const n=new AbortController;return e(t,n).then((e=>r(void 0,e.data,e.cacheControl||"",e.expires||"")),(e=>r(e))).catch((e=>r(e))),{cancel:()=>n.abort()}}),this.tiles=new Map}add(e){this.tiles.set(e.source.getKey(),e)}get(e){return this.tiles.get(e)}};function N(e,t){return 4294967296*(t>>>0)+(e>>>0)}function F(e){const t=e.buf;let r=t[e.pos++],n=127&r;return r<128?n:(r=t[e.pos++],n|=(127&r)<<7,r<128?n:(r=t[e.pos++],n|=(127&r)<<14,r<128?n:(r=t[e.pos++],n|=(127&r)<<21,r<128?n:(r=t[e.pos],n|=(15&r)<<28,function(e,t){const r=t.buf;let n=r[t.pos++],i=(112&n)>>4;if(n<128)return N(e,i);if(n=r[t.pos++],i|=(127&n)<<3,n<128)return N(e,i);if(n=r[t.pos++],i|=(127&n)<<10,n<128)return N(e,i);if(n=r[t.pos++],i|=(127&n)<<17,n<128)return N(e,i);if(n=r[t.pos++],i|=(127&n)<<24,n<128)return N(e,i);if(n=r[t.pos++],i|=(1&n)<<31,n<128)return N(e,i);throw new Error("Expected varint not more than 10 bytes")}(n,e)))))}function Y(e,t,r,n){if(0===n){1===r&&(t[0]=e-1-t[0],t[1]=e-1-t[1]);const n=t[0];t[0]=t[1],t[1]=n}}var G=[0,1,5,21,85,341,1365,5461,21845,87381,349525,1398101,5592405,22369621,89478485,357913941,1431655765,5726623061,22906492245,91625968981,366503875925,1466015503701,5864062014805,23456248059221,93824992236885,375299968947541,0x5555555555555];function Q(e,t){return n(this,null,(function*(){if(1===t||0===t)return e;if(2===t){if(void 0===globalThis.DecompressionStream)return B(new Uint8Array(e));const t=new Response(e).body;if(!t)throw Error("Failed to read response stream");const r=t.pipeThrough(new globalThis.DecompressionStream("gzip"));return new Response(r).arrayBuffer()}throw Error("Compression method not supported")}))}var X=(e=>(e[e.Unknown=0]="Unknown",e[e.Mvt=1]="Mvt",e[e.Png=2]="Png",e[e.Jpeg=3]="Jpeg",e[e.Webp=4]="Webp",e[e.Avif=5]="Avif",e))(X||{});function ee(e,t){let r=0,n=e.length-1;for(;r<=n;){const i=n+r>>1,o=t-e[i].tileId;if(o>0)r=i+1;else{if(!(o<0))return e[i];n=i-1}}if(n>=0){if(0===e[n].runLength)return e[n];if(t-e[n].tileId<e[n].runLength)return e[n]}return null}var te=class{constructor(e,t=new Headers){this.url=e,this.customHeaders=t,this.mustReload=!1}getKey(){return this.url}setHeaders(e){this.customHeaders=e}getBytes(e,t,r,i){return n(this,null,(function*(){let n,o;r?o=r:(n=new AbortController,o=n.signal);const s=new Headers(this.customHeaders);let a;s.set("range",`bytes=${e}-${e+t-1}`),this.mustReload&&(a="reload");let l=yield fetch(this.url,{signal:o,cache:a,headers:s});if(0===e&&416===l.status){const e=l.headers.get("Content-Range");if(!e||!e.startsWith("bytes */"))throw Error("Missing content-length on 416 response");const t=+e.substr(8);l=yield fetch(this.url,{signal:o,cache:"reload",headers:{range:"bytes=0-"+(t-1)}})}let c=l.headers.get("Etag");if((null==c?void 0:c.startsWith("W/"))&&(c=null),416===l.status||i&&c&&c!==i)throw this.mustReload=!0,new ie(i);if(l.status>=300)throw Error(`Bad response code: ${l.status}`);const h=l.headers.get("Content-Length");if(200===l.status&&(!h||+h>t))throw n&&n.abort(),Error("Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving.");return{data:yield l.arrayBuffer(),etag:c||void 0,cacheControl:l.headers.get("Cache-Control")||void 0,expires:l.headers.get("Expires")||void 0}}))}};function re(e,t){const n=e.getUint32(t+4,!0),i=e.getUint32(t+0,!0);return n*r(2,32)+i}function ne(e){const t={buf:new Uint8Array(e),pos:0},r=F(t),n=[];let i=0;for(let o=0;o<r;o++){const e=F(t);n.push({tileId:i+e,offset:0,length:0,runLength:1}),i+=e}for(let o=0;o<r;o++)n[o].runLength=F(t);for(let o=0;o<r;o++)n[o].length=F(t);for(let o=0;o<r;o++){const e=F(t);n[o].offset=0===e&&o>0?n[o-1].offset+n[o-1].length:e-1}return n}var ie=class extends Error{};function oe(e,t){return n(this,null,(function*(){const r=yield e.getBytes(0,16384);if(19792!==new DataView(r.data).getUint16(0,!0))throw new Error("Wrong magic number for PMTiles archive");if(function(e){const t=new DataView(e);return 2===t.getUint16(2,!0)?(console.warn("PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),2):1===t.getUint16(2,!0)?(console.warn("PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),1):3}(r.data)<3)return[yield K.getHeader(e)];const n=function(e,t){const r=new DataView(e),n=r.getUint8(7);if(n>3)throw Error(`Archive is spec version ${n} but this library supports up to spec version 3`);return{specVersion:n,rootDirectoryOffset:re(r,8),rootDirectoryLength:re(r,16),jsonMetadataOffset:re(r,24),jsonMetadataLength:re(r,32),leafDirectoryOffset:re(r,40),leafDirectoryLength:re(r,48),tileDataOffset:re(r,56),tileDataLength:re(r,64),numAddressedTiles:re(r,72),numTileEntries:re(r,80),numTileContents:re(r,88),clustered:1===r.getUint8(96),internalCompression:r.getUint8(97),tileCompression:r.getUint8(98),tileType:r.getUint8(99),minZoom:r.getUint8(100),maxZoom:r.getUint8(101),minLon:r.getInt32(102,!0)/1e7,minLat:r.getInt32(106,!0)/1e7,maxLon:r.getInt32(110,!0)/1e7,maxLat:r.getInt32(114,!0)/1e7,centerZoom:r.getUint8(118),centerLon:r.getInt32(119,!0)/1e7,centerLat:r.getInt32(123,!0)/1e7,etag:t}}(r.data.slice(0,127),r.etag),i=r.data.slice(n.rootDirectoryOffset,n.rootDirectoryOffset+n.rootDirectoryLength),o=`${e.getKey()}|${n.etag||""}|${n.rootDirectoryOffset}|${n.rootDirectoryLength}`,s=ne(yield t(i,n.internalCompression));return[n,[o,s.length,s]]}))}var se=class{constructor(e=100,t=!0,r=Q){this.cache=new Map,this.invalidations=new Map,this.maxCacheEntries=e,this.counter=1,this.decompress=r}getHeader(e){return n(this,null,(function*(){const t=e.getKey(),r=this.cache.get(t);if(r){r.lastUsed=this.counter++;return yield r.data}const n=new Promise(((t,r)=>{oe(e,this.decompress).then((e=>{e[1]&&this.cache.set(e[1][0],{lastUsed:this.counter++,data:Promise.resolve(e[1][2])}),t(e[0]),this.prune()})).catch((e=>{r(e)}))}));return this.cache.set(t,{lastUsed:this.counter++,data:n}),n}))}getDirectory(e,t,r,i){return n(this,null,(function*(){const o=`${e.getKey()}|${i.etag||""}|${t}|${r}`,s=this.cache.get(o);if(s){s.lastUsed=this.counter++;return yield s.data}const a=new Promise(((o,s)=>{(function(e,t,r,i,o){return n(this,null,(function*(){const n=yield e.getBytes(r,i,void 0,o.etag),s=ne(yield t(n.data,o.internalCompression));if(0===s.length)throw new Error("Empty directory is invalid");return s}))})(e,this.decompress,t,r,i).then((e=>{o(e),this.prune()})).catch((e=>{s(e)}))}));return this.cache.set(o,{lastUsed:this.counter++,data:a}),a}))}getArrayBuffer(e,t,r,i){return n(this,null,(function*(){const n=`${e.getKey()}|${i.etag||""}|${t}|${r}`,o=this.cache.get(n);if(o){o.lastUsed=this.counter++;return yield o.data}const s=new Promise(((o,s)=>{e.getBytes(t,r,void 0,i.etag).then((e=>{o(e.data),this.cache.has(n),this.prune()})).catch((e=>{s(e)}))}));return this.cache.set(n,{lastUsed:this.counter++,data:s}),s}))}prune(){if(this.cache.size>=this.maxCacheEntries){let e,t=1/0;this.cache.forEach(((r,n)=>{r.lastUsed<t&&(t=r.lastUsed,e=n)})),e&&this.cache.delete(e)}}invalidate(e){return n(this,null,(function*(){const t=e.getKey();if(this.invalidations.get(t))return yield this.invalidations.get(t);this.cache.delete(e.getKey());const r=new Promise(((r,n)=>{this.getHeader(e).then((e=>{r(),this.invalidations.delete(t)})).catch((e=>{n(e)}))}));this.invalidations.set(t,r)}))}},ae=class{constructor(e,t,r){this.source="string"==typeof e?new te(e):e,this.decompress=r||Q,this.cache=t||new se}getHeader(){return n(this,null,(function*(){return yield this.cache.getHeader(this.source)}))}getZxyAttempt(e,t,i,o){return n(this,null,(function*(){const n=function(e,t,n){if(e>26)throw Error("Tile zoom level exceeds max safe number limit (26)");if(t>r(2,e)-1||n>r(2,e)-1)throw Error("tile x/y outside zoom level bounds");const i=G[e];let o=0,s=0,a=0;const l=[t,n];let c=r(2,e)/2;for(;c>0;)o=(l[0]&c)>0?1:0,s=(l[1]&c)>0?1:0,a+=c*c*(3*o^s),Y(c,l,o,s),c/=2;return i+a}(e,t,i),s=yield this.cache.getHeader(this.source);if(s.specVersion<3)return K.getZxy(s,this.source,this.cache,e,t,i,o);if(e<s.minZoom||e>s.maxZoom)return;let a=s.rootDirectoryOffset,l=s.rootDirectoryLength;for(let e=0;e<=3;e++){const e=ee(yield this.cache.getDirectory(this.source,a,l,s),n);if(!e)return;if(e.runLength>0){const t=yield this.source.getBytes(s.tileDataOffset+e.offset,e.length,o,s.etag);return{data:yield this.decompress(t.data,s.tileCompression),cacheControl:t.cacheControl,expires:t.expires}}a=s.leafDirectoryOffset+e.offset,l=e.length}throw Error("Maximum directory depth exceeded")}))}getZxy(e,t,r,i){return n(this,null,(function*(){try{return yield this.getZxyAttempt(e,t,r,i)}catch(ve){if(ve instanceof ie)return this.cache.invalidate(this.source),yield this.getZxyAttempt(e,t,r,i);throw ve}}))}getMetadataAttempt(){return n(this,null,(function*(){const e=yield this.cache.getHeader(this.source),t=yield this.source.getBytes(e.jsonMetadataOffset,e.jsonMetadataLength,void 0,e.etag),r=yield this.decompress(t.data,e.internalCompression),n=new TextDecoder("utf-8");return JSON.parse(n.decode(r))}))}getMetadata(){return n(this,null,(function*(){try{return yield this.getMetadataAttempt()}catch(ve){if(ve instanceof ie)return this.cache.invalidate(this.source),yield this.getMetadataAttempt();throw ve}}))}};const le=t.Style.getSourceType("vector"),ce="pmtile-source",he=(e,...t)=>{for(const r of t)for(const t in r)e[t]=r[t];return e},ue=e=>(180+e)/360,de=e=>(180-180/Math.PI*Math.log(Math.tan(Math.PI/4+e*Math.PI/360)))/360;class fe{constructor(e,r,n){this.bounds=t.LngLatBounds.convert(this.validateBounds(e)),this.minzoom=r||0,this.maxzoom=n||24}validateBounds(e){return Array.isArray(e)&&4===e.length?[Math.max(-180,e[0]),Math.max(-90,e[1]),Math.min(180,e[2]),Math.min(90,e[3])]:[-180,-90,180,90]}contains(e){const t=Math.pow(2,e.z),r=Math.floor(ue(this.bounds.getWest())*t),n=Math.floor(de(this.bounds.getNorth())*t),i=Math.ceil(ue(this.bounds.getEast())*t),o=Math.ceil(de(this.bounds.getSouth())*t);return e.x>=r&&e.x<i&&e.y>=n&&e.y<o}}class ge{constructor(e,t={}){he(this,t),this.type=e}}class me extends ge{constructor(e,t={}){super("error",he({error:e},t))}}const pe=class extends le{constructor(e,t,r,n){super(e,t,r,n),this.scheme="xyz",this.roundZoom=!0,this.type="vector",this.dispatcher=void 0,this.reparseOverscaled=!0,this._loaded=!1,this._dataType="vector",this.id=e,this._dataType="vector",this.dispatcher=r,this._implementation=t,this._implementation||this.fire(new me(new Error(`Missing options for ${this.id} ${ce} source`)));const{url:i}=t;this.reparseOverscaled=!0,this.scheme="xyz",this.tileSize=512,this._loaded=!1,this.type="vector",this._protocol=new J,this.tiles=[`pmtiles://${i}/{z}/{x}/{y}`];const o=new ae(i);this._protocol.add(o),this._instance=o}static async getMetadata(e){return new ae(e).getMetadata()}static async getHeader(e){return new ae(e).getHeader()}getExtent(){if(!this.header)return[[-180,-90],[180,90]];const{minZoom:e,maxZoom:t,minLon:r,minLat:n,maxLon:i,maxLat:o,centerZoom:s,centerLon:a,centerLat:l}=this.header;return[r,n,i,o]}hasTile(e){return!this.tileBounds||this.tileBounds.contains(e.canonical)}async load(e){return this._loaded=!1,this.fire(new ge("dataloading",{dataType:"source"})),Promise.all([this._instance.getHeader(),this._instance.getMetadata()]).then((([e,t])=>{he(this,t),this.header=e;const{specVersion:r,clustered:n,tileType:i,minZoom:o,maxZoom:s,minLon:a,minLat:l,maxLon:c,maxLat:h,centerZoom:u,centerLon:d,centerLat:f}=e,g=[o,s,a,l,c,h];switch(g.includes(void 0)||g.includes(null)||(this.tileBounds=new fe([a,l,c,h],o,s),this.minzoom=o,this.maxzoom=s),null==this.maxzoom&&console.warn("The maxzoom parameter is not defined in the source json. This can cause memory leak. So make sure to define maxzoom in the layer"),this.minzoom=Number.parseInt(this.minzoom.toString())||0,this.maxzoom=Number.parseInt(this.maxzoom.toString())||0,this._loaded=!0,this.tileType=i,i){case X.Png:this.contentType="image/png";break;case X.Jpeg:this.contentType="image/jpeg";break;case X.Webp:this.contentType="image/webp";break;case X.Avif:this.contentType="image/avif";break;case X.Mvt:this.contentType="application/vnd.mapbox-vector-tile"}[X.Jpeg,X.Png].includes(this.tileType)?(this.loadTile=this.loadRasterTile,this.type="raster"):this.tileType===X.Mvt?(this.loadTile=this.loadVectorTile,this.type="vector"):this.fire(new me(new Error("Unsupported Tile Type"))),this.fire(new ge("data",{dataType:"source",sourceDataType:"metadata"})),this.fire(new ge("data",{dataType:"source",sourceDataType:"content"}))})).catch((t=>{this.fire(new me(t)),e&&e(t)}))}loaded(){return this._loaded}loadVectorTile(e,t){var r,n,i;const o=(r,n)=>{var i,o;return delete e.request,e.aborted?t(null):r&&404!==r.status?t(r):(n&&n.resourceTiming&&(e.resourceTiming=n.resourceTiming),(null==(i=this.map)?void 0:i._refreshExpiredTiles)&&n&&e.setExpiryData(n),e.loadVectorData(n,null==(o=this.map)?void 0:o.painter),t(null),void(e.reloadCallback&&(this.loadVectorTile(e,e.reloadCallback),e.reloadCallback=null)))},s=null==(r=this.map)?void 0:r._requestManager.normalizeTileURL(e.tileID.canonical.url(this.tiles,this.scheme)),a=null==(n=this.map)?void 0:n._requestManager.transformRequest(s,"Tile"),l={request:a,data:{},uid:e.uid,tileID:e.tileID,tileZoom:e.tileZoom,zoom:e.tileID.overscaledZ,tileSize:this.tileSize*e.tileID.overscaleFactor(),type:"vector",source:this.id,scope:this.scope,showCollisionBoxes:null==(i=this.map)?void 0:i.showCollisionBoxes,promoteId:this.promoteId,isSymbolTile:e.isSymbolTile,extraShadowCaster:e.isExtraShadowCaster},c=(t,r,n,i)=>{!t&&r?(l.data={cacheControl:n,expires:i,rawData:r},this.map._refreshExpiredTiles&&e.setExpiryData({cacheControl:n,expires:i}),e.actor&&e.actor.send("loadTile",l,o.bind(this),void 0,!0)):o.call(this,t)};e.actor&&"expired"!==e.state?"loading"===e.state?e.reloadCallback=t:e.request=this._protocol.tile({...e,url:s},c):(e.actor=this._tileWorkers[s]=this._tileWorkers[s]||this.dispatcher.getActor(),e.request=this._protocol.tile({...a},c))}loadRasterTileData(e,t){e.setTexture(t,this.map.painter)}loadRasterTile(e,t){var r,n;const i=null==(r=this.map)?void 0:r._requestManager.normalizeTileURL(e.tileID.canonical.url(this.tiles,this.scheme)),o=null==(n=this.map)?void 0:n._requestManager.transformRequest(i,"Tile"),s=new AbortController;e.request={cancel:()=>s.abort()},this._protocol.tile(o,s).then((({data:r,cacheControl:n,expires:i})=>{if(delete e.request,e.aborted)return t(null);if(null==r){const r={width:this.tileSize,height:this.tileSize,data:null};return this.loadRasterTileData(e,r),e.state="loaded",t(null)}r&&r.resourceTiming&&(e.resourceTiming=r.resourceTiming),this.map._refreshExpiredTiles&&e.setExpiryData({cacheControl:n,expires:i});const o=new window.Blob([new Uint8Array(r)],{type:"image/png"});window.createImageBitmap(o).then((r=>{this.loadRasterTileData(e,r),e.state="loaded",t(null)})).catch((r=>(e.state="errored",t(new Error(`Can't infer data type for ${this.id}, only raster data supported at the moment. ${r}`)))))}).bind(this)).catch((r=>{20!==r.code&&(e.state="errored",t(r))}))}};pe.SOURCE_TYPE=ce;let ye=pe;return e.PmTilesSource=ye,e.SOURCE_TYPE=ce,e.default=ye,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),e}({},mapboxgl);

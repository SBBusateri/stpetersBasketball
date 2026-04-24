globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { H as HTTPError, d as defineHandler, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/assets/PageShell-BJQYUL3G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ddf-JmDrl8cDjtZ6K01EthjWtcU2vok"',
    "mtime": "2026-04-24T13:53:32.868Z",
    "size": 7647,
    "path": "../public/assets/PageShell-BJQYUL3G.js"
  },
  "/assets/HomeScreenBar-DWMYG-8S.png": {
    "type": "image/png",
    "etag": '"1549b-iYM8nIPFsPV36bztGMgAB9AwV+Q"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 87195,
    "path": "../public/assets/HomeScreenBar-DWMYG-8S.png"
  },
  "/assets/chevron-down-Bhxutgzl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"85-MtoQM919oaT3gzkaz78ztt8IV3g"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 133,
    "path": "../public/assets/chevron-down-Bhxutgzl.js"
  },
  "/assets/arrow-right-BjSHXPrc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-dx+2NvM7LBBd3DLoleRW7rUT2Hc"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 170,
    "path": "../public/assets/arrow-right-BjSHXPrc.js"
  },
  "/assets/contact-Ce2tbviG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"649-1AQFtpj9th/r4ue+R+piqF7aGUM"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 1609,
    "path": "../public/assets/contact-Ce2tbviG.js"
  },
  "/assets/formatters-CXrX8S-B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17b-ju7mj34Z2DzEtSEUHmX7h0vL29c"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 379,
    "path": "../public/assets/formatters-CXrX8S-B.js"
  },
  "/assets/coaches-ClCGZ45d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"929-4Be5IycUDQT/sTFte03FTsLM3Sw"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 2345,
    "path": "../public/assets/coaches-ClCGZ45d.js"
  },
  "/assets/admin-Crz5nsOH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e648-EJxxb6HLBBFAm8e7ZAqZh3FWl30"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 58952,
    "path": "../public/assets/admin-Crz5nsOH.js"
  },
  "/assets/client-DhOOs9-c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2f813-sQpr4havmWHSFAB/XheQH7HH9hU"',
    "mtime": "2026-04-24T13:53:32.868Z",
    "size": 194579,
    "path": "../public/assets/client-DhOOs9-c.js"
  },
  "/assets/index-DhB_mpzL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"50253-rBF/IPInTR7kptzkPrpbe8UHZiE"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 328275,
    "path": "../public/assets/index-DhB_mpzL.js"
  },
  "/assets/index-YCCFA_Af.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32cf-h6zPATNLhGedAJXQAVEk82E1nKU"',
    "mtime": "2026-04-24T13:53:32.868Z",
    "size": 13007,
    "path": "../public/assets/index-YCCFA_Af.js"
  },
  "/assets/loader-circle-DXN3zyGP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"90-PcLbUWCQoH5MzzvA0wecBJcM218"',
    "mtime": "2026-04-24T13:53:32.868Z",
    "size": 144,
    "path": "../public/assets/loader-circle-DXN3zyGP.js"
  },
  "/assets/schedule-DbAEO8Vi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1316-1I8XaXPZURqLMz+6cv8RsTeAg9s"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 4886,
    "path": "../public/assets/schedule-DbAEO8Vi.js"
  },
  "/assets/stats-By547yUc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"dec-pZNFrv5/53fftcJzENGNHHJdk/w"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 3564,
    "path": "../public/assets/stats-By547yUc.js"
  },
  "/assets/recruits-DZ9sKaxZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"afe-rSQT0RKDcSxBJl57oJbcmjbIPMU"',
    "mtime": "2026-04-24T13:53:32.868Z",
    "size": 2814,
    "path": "../public/assets/recruits-DZ9sKaxZ.js"
  },
  "/assets/summer-academy-C8ffIMez.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"28f4-ocF3shrrnxTTMWwMz66yfjJ8e2A"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 10484,
    "path": "../public/assets/summer-academy-C8ffIMez.js"
  },
  "/assets/summertrain-DcGlM00X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"36-z/z1JjkxciyQFFdLbSXIFykHoLg"',
    "mtime": "2026-04-24T13:53:32.868Z",
    "size": 54,
    "path": "../public/assets/summertrain-DcGlM00X.js"
  },
  "/assets/team-x9x7BKjl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11e4-byYOnZmDNCeUC2MCG+kByciTs0A"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 4580,
    "path": "../public/assets/team-x9x7BKjl.js"
  },
  "/assets/styles-ByMokD_t.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1542b-ptUqdP3TdIfyUys0hLeDFwrF6PI"',
    "mtime": "2026-04-24T13:53:32.867Z",
    "size": 87083,
    "path": "../public/assets/styles-ByMokD_t.css"
  },
  "/assets/SPBALogoNoBackground-CDq66jUq.png": {
    "type": "image/png",
    "etag": '"a873e-fGO3amWi4Uarj5s5N5vZtoGsyAQ"',
    "mtime": "2026-04-24T13:53:32.868Z",
    "size": 689982,
    "path": "../public/assets/SPBALogoNoBackground-CDq66jUq.png"
  },
  "/assets/homebackground-DSz1Ibus.png": {
    "type": "image/png",
    "etag": '"23d2ad-OyPR4/mSsTpbuDv0FjTeh9pHwGI"',
    "mtime": "2026-04-24T13:53:32.869Z",
    "size": 2347693,
    "path": "../public/assets/homebackground-DSz1Ibus.png"
  },
  "/assets/summertrain-BD6s9k03.png": {
    "type": "image/png",
    "etag": '"2a021b-oOFyvtc2e2FVECtV4JU25PCZr4M"',
    "mtime": "2026-04-24T13:53:32.869Z",
    "size": 2753051,
    "path": "../public/assets/summertrain-BD6s9k03.png"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _a1rITC = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_IIpXZe = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_IIpXZe };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_a1rITC)
].filter(Boolean);
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};

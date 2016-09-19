'use strict';

const join = require('url').resolve;
import iconv from 'iconv-lite';
import coRequest from'co-request';
function ignoreQuery(url) {
  return url ? url.split('?')[0] : null;
}
function resolve(path, options) {
  var url = options.url;
  if (url) {
    if (!/^http/.test(url)) {
      url = options.host ? join(options.host, url) : null;
    }
    return ignoreQuery(url);
  }
  let coPath = path;
  if (typeof options.map === 'object') {
    if (options.map && options.map[path]) {
      coPath = ignoreQuery(options.map[path]);
    }
  } else if (typeof options.map === 'function') {
    coPath = options.map(path);
  }

  return options.host ? join(options.host, coPath) : null;
}

function getParsedBody(ctx) {
  var body = ctx.request.body;
  if (body === undefined || body === null) {
    return undefined;
  }
  var contentType = ctx.request.header['content-type'];
  if (!Buffer.isBuffer(body) && typeof body !== 'string') {
    if (contentType && contentType.indexOf('json') !== -1) {
      body = JSON.stringify(body);
    } else {
      body = body + '';
    }
  }
  return body;
}

function pipeRequest(readable, requestThunk) {
  return (cb)=> {
    readable.pipe(requestThunk(cb));
  };
}

export default function koaProxy(options = {}) {
  var request = coRequest.defaults({jar: typeof options.jar === 'undefined' ? true : options.jar});

  if (!(options.host || options.map || options.url)) {
    throw new Error('miss options');
  }

  return function* proxy(next) {
    var url = resolve(this.path, options);

    // don't match
    if (!url) {
      return yield* next;
    }

    if (options.match) {
      if (options.match.some(reg=>reg.test(this.path))) {
        return yield* next;
      }
    }

    var parsedBody = getParsedBody(this);

    var opt = {
      url: url + '?' + this.querystring,
      headers: this.header,
      encoding: null,
      method: this.method,
      body: parsedBody
    };
    // set 'Host' header to options.host (without protocol prefix), strip trailing slash
    if (options.host) opt.headers.host = options.host.slice(options.host.indexOf('://') + 3).replace(/\/$/, '');

    if (options.requestOptions) {
      Object.keys(options.requestOptions).forEach((option)=> {
        opt[option] = options.requestOptions[option];
      });
    }

    var requestThunk = request(opt);
    let res;
    if (parsedBody) {
      res = yield requestThunk;
    } else {
      // Is there a better way?
      // https://github.com/leukhin/co-request/issues/11
      res = yield pipeRequest(this.req, requestThunk);
    }

    this.status = res.statusCode;
    for (var name in res.headers) {
      // http://stackoverflow.com/questions/35525715/http-get-parse-error-code-hpe-unexpected-content-length
      if (name === 'transfer-encoding') {
        continue;
      }
      this.set(name, res.headers[name]);
    }

    if (options.encoding === 'gbk') {
      this.body = iconv.decode(res.body, 'gbk');
      return 0;
    }

    this.body = res.body;
  };
}



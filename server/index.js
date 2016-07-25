'use strict'

var ms = require('ms')
var polyfill = require('polyfill-service')

/**
 * Creates a middleware that will serve out pollyfills with polyfill-service.
 */
module.exports = function (options) {
  options = options || {}
  var features = 'features' in options ? options.features : { default: {} }
  var minify = 'minify' in options ? options.minify : true
  var unknown = 'unknown' in options ? options.unknown : true
  var maxage = options.maxage || '1 year'
  var excludes = options.excludes || []

  unknown = unknown ? 'polyfill' : 'ignore'
  if (typeof maxage === 'string') maxage = Math.round(ms(maxage) / 1000)

  return function polyfillMiddleware (ctx) {
    var req = ctx.req
    var res = ctx.res
    res.set('Cache-Control', 'public, max-age=' + maxage)
    res.set('Vary', 'User-Agent')
    res.set('Content-Type', 'application/javascript')

    return polyfill.getPolyfillString({
      minify: minify,
      features: features,
      unknown: unknown,
      excludes: excludes,
      uaString: req.get('User-Agent')
    }).then(function (javascript) {
      res.body = javascript
    })
  }
}

'use strict'

var test = require('tape')
var agent = require('supertest').agent
var rill = require('rill')
var polyfill = require('../server')
var MAC_CHROME_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'

test('Get polyfills from chrome', function (t) {
  t.plan(3)

  var request = agent(rill()
    .get('/polyfill.js', polyfill({ minify: false }))
    .get('/polyfill.js.min', polyfill({ minify: true }))
    .listen().unref())

  request
    .get('/polyfill.js')
    .set('User-Agent', MAC_CHROME_UA)
    .expect(200)
    .then(function (resNormal) {
      t.equals(resNormal.headers['content-type'], 'application/javascript', 'polyfill normal')

      request
        .get('/polyfill.js.min')
        .set('User-Agent', MAC_CHROME_UA)
        .expect(200)
        .then(function (resMin) {
          t.equals(resMin.headers['content-type'], 'application/javascript', 'polyfill minified')
          t.ok(resNormal.text.length > resMin.text.length, 'should be shorter')
        }, t.fail)
    }, t.fail)
})

'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tape')
var agent = require('supertest').agent
var rill = require('rill')
var polyfill = require('../server')
var MAC_CHROME_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
var NORMAL_EXAMPLE = fs.readFileSync(path.join(__dirname, 'normal.polyfill.js'), 'utf8')
var MINIFIED_EXAMPLE = fs.readFileSync(path.join(__dirname, 'minified.polyfill.js'), 'utf8')

test('Get polyfills from chrome', function (t) {
  t.plan(2)

  var request = agent(rill()
    .get('/polyfill.js', polyfill({ minify: false }))
    .get('/polyfill.js.min', polyfill({ minify: true }))
    .listen().unref())

  request
    .get('/polyfill.js')
    .set('User-Agent', MAC_CHROME_UA)
    .expect(200)
    .then(function (res) {
      t.equals(res.text, NORMAL_EXAMPLE.trim(), 'polyfill normal')
    }, t.fail)

  request
    .get('/polyfill.js.min')
    .set('User-Agent', MAC_CHROME_UA)
    .expect(200)
    .then(function (res) {
      t.equals(res.text, MINIFIED_EXAMPLE.trim(), 'polyfill minified')
    }, t.fail)
})

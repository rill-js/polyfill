<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/polyfill
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/@rill/polyfill">
    <img src="https://img.shields.io/npm/v/@rill/polyfill.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@rill/polyfill">
    <img src="https://img.shields.io/npm/dm/@rill/polyfill.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/rill-js/rill">
    <img src="https://img.shields.io/gitter/room/rill-js/rill.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

A small wrapper around [polyfill-service](https://github.com/Financial-Times/polyfill-service) which allows automatic user-agent based polyfills to be sent with Rill.

# Installation

```console
npm install @rill/polyfill
```

# Example

```js
const app = require('rill')()
const polyfill = require('@rill/polyfill')

// Setup route to send the polyfill.
app.get('/polyfill.js.min', polyfill({ minify: true }))
```

#### In the browser

```html
<script src="/polyfill.js.min"></script>
```

# API Options/Defaults

```js
{
	// The cache time for the polyfill file (string or number of seconds).
	maxage: '1 year',
	// Enable or disable minification.
	minify: true,
	// Enable or disable polyfilling unknown user agents.
	unknown: true,
	// Array of excluded features.
	excludes: undefined,
	// Object containing the features to pollyfill (defaults to all).
	features: undefined
}
```

**For a list of polyfills and more documentation [click here](https://github.com/Financial-Times/polyfill-service/tree/master/polyfills)**

---

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!

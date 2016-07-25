[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Chat about Rill at https://gitter.im/rill-js/rill](https://badges.gitter.im/rill-js/rill.svg)](https://gitter.im/rill-js/rill?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Rill Polyfill
A small wrapper around [polyfill-service](https://github.com/Financial-Times/polyfill-service) which allows automatic user-agent based polyfills to be sent with Rill.

# Installation

#### Npm
```console
npm install @rill/polyfill
```

# Example

```js
const app = rill()
const polyfill = require("@rill/polyfill")

// Setup route to send the polyfill.
app.get('/polyfill.js.min', polyfill({ minify: true }))
```

#### In the browser

```js
<script src="/polyfill.js.min"></script>
```

# API Options/Defaults

```
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

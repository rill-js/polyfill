/* Polyfill service DEVELOPMENT MODE - for live use set NODE_ENV to 'production'
 * For detailed credits and licence information see http://github.com/financial-times/polyfill-service.
 * 
 * UA detected: chrome/51.0.0
 * Features requested: default
 * 
 * - _mutation, License: CC0 (required by "Element.prototype.after", "Element.prototype.append", "Element.prototype.before", "Element.prototype.prepend", "Element.prototype.replaceWith", "default")
 * - Element.prototype.after, License: CC0 (required by "default")
 * - Element.prototype.append, License: CC0 (required by "default")
 * - Element.prototype.before, License: CC0 (required by "default")
 * - Element.prototype.prepend, License: CC0 (required by "default")
 * - Element.prototype.replaceWith, License: CC0 (required by "default") */

(function(undefined) {

// _mutation
// http://dom.spec.whatwg.org/#mutation-method-macro
function _mutation(nodes) {
	if (!nodes.length) {
		throw new Error('DOM Exception 8');
	} else if (nodes.length === 1) {
		return typeof nodes[0] === 'string' ? document.createTextNode(nodes[0]) : nodes[0];
	} else {
		var
		fragment = document.createDocumentFragment(),
		length = nodes.length,
		index = -1,
		node;

		while (++index < length) {
			node = nodes[index];

			fragment.appendChild(typeof node === 'string' ? document.createTextNode(node) : node);
		}

		return fragment;
	}
}

// Element.prototype.after
Document.prototype.after = Element.prototype.after = function after() {
	if (this.parentNode) {
		this.parentNode.insertBefore(_mutation(arguments), this.nextSibling);
	}
};

// Not all UAs support the Text constructor.  Polyfill on the Text constructor only where it exists
// TODO: Add a polyfill for the Text constructor, and make it a dependency of this polyfill.
if ("Text" in this) {
	Text.prototype.after = Element.prototype.after;
}

// Element.prototype.append
Document.prototype.append = Element.prototype.append = function append() {
	this.appendChild(_mutation(arguments));
};

// Element.prototype.before
Document.prototype.before = Element.prototype.before = function before() {
	if (this.parentNode) {
		this.parentNode.insertBefore(_mutation(arguments), this);
	}
};

// Not all UAs support the Text constructor.  Polyfill on the Text constructor only where it exists
// TODO: Add a polyfill for the Text constructor, and make it a dependency of this polyfill.
if ("Text" in this) {
	Text.prototype.before = Element.prototype.before;
}

// Element.prototype.prepend
Document.prototype.prepend = Element.prototype.prepend = function prepend() {
	this.insertBefore(_mutation(arguments), this.firstChild);
};

// Element.prototype.replaceWith
Document.prototype.replaceWith = Element.prototype.replaceWith = function replaceWith() {
	if (this.parentNode) {
		this.parentNode.replaceChild(_mutation(arguments), this);
	}
};

// Not all UAs support the Text constructor.  Polyfill on the Text constructor only where it exists
// TODO: Add a polyfill for the Text constructor, and make it a dependency of this polyfill.
if ('Text' in this) {
	Text.prototype.replaceWith = Element.prototype.replaceWith;
}

})
.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
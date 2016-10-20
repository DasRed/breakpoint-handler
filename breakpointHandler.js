'use strict';

(function (root, factory) {
    // AMD (Register as an anonymous module)
    if (typeof define === 'function' && define.amd) {
        define(['resizeHandler'], factory);
    }
    // Browser globals
    else {
        root.BreakpointHandler = factory(root.ResizeHandler);
    }
}(this, function (ResizeHandler) {
    // no operations function
    var noop = function () {
    };

    // array find polyfill
    if (!Array.prototype.find) {
        /**
         *
         * @param {Function} predicate
         * @return {*|undefined}
         */
        Array.prototype.find = function (predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list    = Object(this);
            var length  = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }

    /**
     *
     * @param {String} name
     * @param {String} mediaQuery
     * @constructor
     */
    function Rule(name, mediaQuery) {
        this.name       = name;
        this.mediaQuery = mediaQuery;
    }

    // proto
    Rule.prototype = Object.create(Object.prototype, {
        /**
         * @var {String}
         */
        mediaQuery: {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        },

        /**
         * @var {String}
         */
        name: {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        },

        /**
         * validate the rule
         *
         * @returns {Boolean}
         */
        valid: {
            get: function () {
                return window.matchMedia(this.mediaQuery).matches;
            },
            enumerable: false,
            configurable: false
        }
    });

    /**
     *
     * @param {Rule} rule
     * @param {Function} [success]
     * @param {Function} [failed]
     * @constructor
     */
    function Listener(rule, success, failed) {
        this.rule = rule;
        this.success(success).failed(failed);
    }

    // proto
    Listener.prototype = Object.create(Object.prototype, {
        /**
         * @var {Function}
         */
        failedCallback: {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        },

        /**
         * @var {Rule}
         */
        rule: {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        },

        /**
         * @var {Function}
         */
        successCallback: {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        }
    });

    /**
     * executes the listener
     *
     * @returns {Boolean}
     */
    Listener.prototype.execute = function () {
        if (this.rule.valid === true) {
            this.successCallback();
        }
        else {
            this.failedCallback();
        }
    };

    /**
     * sets a new failed function
     *
     * @param {Function} [failed]
     * @returns {Listener}
     */
    Listener.prototype.failed = function (failed) {
        if ((failed instanceof Function) === false) {
            failed = noop;
        }

        this.failedCallback = failed;

        return this;
    };

    /**
     * sets a new success function
     *
     * @param {Function} [success]
     * @returns {Listener}
     */
    Listener.prototype.success = function (success) {
        if ((success instanceof Function) === false) {
            success = noop;
        }

        this.successCallback = success;

        return this;
    };

    /**
     * @constructor
     */
    function BreakpointHandler() {
        this.rules     = [];
        this.listeners = [];

        ResizeHandler.register(this.handle.bind(this));
    }

    // proto
    BreakpointHandler.prototype = Object.create(Object.prototype, {

        /**
         * @var {Array.<Listener>=}
         */
        listeners: {
            value: null,
            enumerable: false,
            configurable: false,
            writable: true
        },

        /**
         * @var {Array.<Rule>=}
         */
        rules: {
            value: null,
            enumerable: false,
            configurable: false,
            writable: true
        }
    });


    /**
     * appends a new rule
     *
     * @param {String} name
     * @param {String} mediaQuery
     * @returns {BreakpointHandler}
     */
    BreakpointHandler.prototype.appendRule = function (name, mediaQuery) {
        if (this.rules.some(function (rule) {
                return rule.name === name;
            }) === true) {
            throw new Error('A rule with name "' + name + '" is already defined.');
        }

        this.rules.push(new Rule(name, mediaQuery));

        return this;
    };

    /**
     * handle all listeners
     *
     * @returns {BreakpointHandler}
     */
    BreakpointHandler.prototype.handle = function () {
        this.listeners.forEach(function (listener) {
            listener.execute();
        });

        return this;
    };
    /**
     * creates a new listener with rule name
     *
     * @param {String} ruleName
     * @returns {Listener}
     */
    BreakpointHandler.prototype.listener = function (ruleName) {
        var rule = this.rules.find(function (rule) {
            return rule.name === ruleName;
        });

        if ((rule instanceof Rule) === false) {
            throw new Error('Rule with name "' + ruleName + '" can not be found.');
        }

        var listener = new Listener(rule, noop, noop);

        this.listeners.push(listener);

        return listener;
    };


    /**
     * @param {String} ruleName
     * @param {Function} [success]
     * @param {Function} [failed]
     * @returns {BreakpointHandler}
     */
    BreakpointHandler.prototype.register = function (ruleName, success, failed) {
        this.listener(ruleName).success(success).failed(failed);

        return this;
    };


    /**
     * removes a rule
     *
     * @param {String} name
     * @returns {BreakpointHandler}
     */
    BreakpointHandler.prototype.removeRule = function (name) {
        this.rules = this.rules.filter(function (rule) {
            return rule.name !== name;
        });

        this.listeners = this.listeners.filter(function (listener) {
            return listener.rule.name !== name;
        });

        return this;
    };

    /**
     * @param {String} ruleName
     * @param {Function} [success]
     * @param {Function} [failed]
     * @returns {BreakpointHandler}
     */
    BreakpointHandler.prototype.unregister = function (ruleName, success, failed) {
        success = success || noop;
        failed  = failed || noop;

        this.listeners = this.listeners.filter(function (listener) {
            return listener.rule.name !== ruleName && listener.successCallback !== success && listener.failedCallback !== failed;
        });

        return this;
    };


    return new BreakpointHandler();
}));

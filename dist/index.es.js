var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BRACE_REGEXP = /[{]\s*([^{}|]+)(?:\s*[|]\s*)?(?:[`]([^`]*)[`])?\s*[}]/g;

var i18n = function () {
  function i18n(obj) {
    _classCallCheck(this, i18n);

    this.transText = obj;
  }

  i18n.prototype.translate = function translate(key, options) {
    options = options || {};
    var str;
    if (key.indexOf('.') > -1) {
      var keyItem = key.split('.');
      var temp = this.transText;
      for (var i = 0; i < keyItem.length; i++) {
        if (temp[keyItem[i]] && temp[keyItem[i]] instanceof Object) {
          temp = temp[keyItem[i]];
        } else {
          str = temp[keyItem[i]];
          break;
        }
      }
    } else {
      str = this.transText[key];
    }
    return this.matcher(str, options);
  };

  i18n.prototype.matcher = function matcher(str) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof str !== 'string' && typeof str !== 'number') {
      console.error('Template should be string or number, but ' + str + ' got ' + (typeof str === 'undefined' ? 'undefined' : _typeof(str)));
      return '';
    } else {
      if (typeof str === 'string') {
        return str.replace(BRACE_REGEXP, function (_, indicator, defaultValue) {
          if (options[indicator] !== null && options[indicator] !== undefined) {
            return options[indicator];
          } else if (defaultValue != null && defaultValue != undefined) {
            return defaultValue;
          } else {
            if (options[indicator] == undefined) console.error('Got indicator ' + indicator + (typeof indicator === 'undefined' ? 'undefined' : _typeof(indicator)));
            return '';
          }
        });
      } else {
        return str;
      }
    }
  };

  return i18n;
}();

function getUALang() {
  return navigator.systemLanguage || navigator.language;
}

function isArray(item) {
  return {}.toString.call(item) === '[object Array]';
}

function objectAssign(base, objects) {
  for (var i = 0; i < objects.length; i++) {
    for (var key in objects[i]) {
      if (objects[i].hasOwnProperty(key)) base[key] = objects[i][key];
    }
  }
  return base;
}

var localStore = {
  get: function get(key) {
    if (!key) return null;
    if (window && window.localStorage) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return false;
      }
    }
  },
  set: function set(key, value) {
    if (!key) return null;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }
};

var cookieStore = {
  get: function get(key) {
    if (!key) return null;
    var value = "; " + document.cookie;
    var parts = value.split("; " + key + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  },
  set: function set(key, value) {
    if (!key) return null;
    try {
      document.cookie = key + "=" + encodeURIComponent(value);
      return true;
    } catch (e) {
      return false;
    }
  }
};

var getItem = function getItem(key) {
  return localStore.get(key) || cookieStore.get(key);
};

var setItem = function setItem(key, value) {
  return localStore.set(key, value) || cookieStore.set(key, value);
};

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  @class
 *  @name Switcher
 */

var Switcher = function () {

  /**
   *  @typedef {function} getTransFile
   *  @param {object} lang
   *  @param {string} lang.systemLang - system language
   *  @param {string} lang.selectedLang - stored language
   *  @param {function} resolve
   *  @returns {string} format result
   *  @returns {string} selected language
   */
  /**
   *  @constructs Switcher
   *  @param {object} config
   *  @param {string} config.storageKey - key for persistent current language
   *  @param {object|function} config.translateText
   *  @param {object} config.formatters
   *  @param {getTransFile} config.translateFile - method for translate files
   *  @param {readyCallback} callback - fires when translation asserts are ready
   */
  function Switcher(config, callback) {
    _classCallCheck$1(this, Switcher);

    this.formatters = config.formatters || {};
    this.storageKey = config.storageKey || 'locale';

    var currentLanguage = getItem(this.storageKey);
    var translateText = {};

    if (config.translateText) {
      if (typeof config.translateText === "function") {
        translateText = config.translateText({
          systemLang: getUALang(),
          selectedLang: currentLanguage
        });
      } else {
        translateText = config.translateText;
      }
    }

    this.T = this.$T.bind(this);
    this.F = this.$F.bind(this);
    this.setLang = this.$L.bind(this);
    this.getLang = this.$G.bind(this);

    this.translateFile = config.translateFile;

    this.getCallBack = function () {
      callback(this);
    };
    this.setLanguage(currentLanguage, translateText);
  }

  Switcher.prototype.setLanguage = function setLanguage(language, transPatch) {
    var _this = this;

    var resolve = function resolve(transAssert, currentLanguage) {
      var translate = objectAssign({}, [transAssert, transPatch]);
      _this.currentLanguage = currentLanguage || language;
      _this.i18n = new i18n(translate);
      _this.getCallBack();
    };

    this.currentLanguage = language;
    if (this.translateFile) {
      this.translateFile({
        systemLang: getUALang(),
        selectedLang: language
      }, resolve);
    } else {
      resolve();
    }
  };
  /**
   *  Get current language
   *  @function getLang
   */


  Switcher.prototype.$G = function $G() {
    return this.currentLanguage || getUALang() || '';
  };

  /**
   *  @typedef {function} fmtFunction
   *  @param {string|number} content - content to be formatted
   *  @param {string} lang - locale string
   *  @returns {string} format result
   */
  /**
   *  Register formatters
   *  @param {string} fmtName - formatter name
   *  @param {fmtFunction} func  - formatter function
   */


  Switcher.prototype.register = function register(fmtName, func) {
    if (typeof func !== 'function') {
      throw new TypeError('Formatter should be function, but got ' + (typeof func === 'undefined' ? 'undefined' : _typeof$1(func)));
    }
    this.formatters[fmtName] = func;
  };

  /**
   *  Set current language
   *  @function L
   *  @param {string} lang - locale string
   *  @param {function} error  - call when setting failed
   *  @param {function} [success=reload] - call when setting success
   */


  Switcher.prototype.$L = function $L(lang, error) {
    var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
      location.reload();
    };

    if (!setItem(this.storageKey, lang)) {
      if (typeof error === 'function') return error();
      return;
    }
    this.currentLanguage = lang;
    if (typeof success === 'function') return success();
  };

  /**
   *  Translate given string
   *  @function T
   *  @param {string|string[]} item - string or array to be translated
   *  @param {object} interpolations - interpolations of placeholders in template
   *  @returns {string|string[]}
   */


  Switcher.prototype.$T = function $T(item, interpolations) {
    var _this2 = this;

    if (typeof item === 'string') {
      return this.i18n.translate(item, interpolations);
    } else if (isArray(item)) {
      return item.map(function (key) {
        return _this2.i18n.translate(key, interpolations);
      });
    } else {
      throw new TypeError('Translate item should be string or array, but got ' + (typeof item === 'undefined' ? 'undefined' : _typeof$1(item)));
    }
  };

  /**
   *  Format given item
   *  @function F
   *  @param {string|number|string[]|number[]} item - string, number or array to be translated
   *  @param {string} fmtName - name of formatter
   *  @returns {string|string[]}
   */


  Switcher.prototype.$F = function $F(fmtName, item) {
    for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      params[_key - 2] = arguments[_key];
    }

    var _this3 = this;

    var formatter = this.formatters[fmtName];
    if (!formatter) return console.error("Unregistered formatter:", fmtName);
    if (typeof item === 'string' || typeof item === 'number') {
      return formatter.apply(undefined, [item, this.currentLanguage].concat(params));
    } else if (isArray(item)) {
      return item.map(function (str) {
        return formatter.apply(undefined, [str, _this3.currentLanguage].concat(params));
      });
    } else {
      throw new TypeError('Format item should be number, string or array, but got ' + (typeof item === 'undefined' ? 'undefined' : _typeof$1(item)));
    }
  };

  return Switcher;
}();

export default Switcher;

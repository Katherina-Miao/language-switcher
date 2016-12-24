import i18n from './i18n.js'
import { isArray, getUALang, objectAssign } from './utils.js'
import { getItem, setItem } from './store.js'

const DEFAULT_LANGUAGE = 'zh-CN'

/**
 *  @class
 *  @name Lul
 */
export default class Lul {

  /**
   *  @constructs Lul
   *  @param {object} config
   *  @param {boolean} config.useSystemLanguage
   *  @param {string} config.defaultLanguage
   *  @param {string} config.storageKey - key for persistent current language
   *  @param {object} config.fileMap - map of translate files
   *  @param {object} config.translateText
   *  @param {object} config.formatters
   *  @param {readyCallback} callback - fires when translation asserts are ready
   */
  constructor (config, callback) {
    this.formatters = config.formatters || {}
    this.storageKey = config.storageKey || 'locale'
    if (config.fileMap) this.fileMap = config.fileMap

    let currentLanguage = DEFAULT_LANGUAGE
    let translateText = {}

    if (config.useSystemLanguage) {
      currentLanguage = getUALang()
    } else {
      currentLanguage =
        getItem(this.storageKey) || config.defaultLanguage || DEFAULT_LANGUAGE
    }
    if (config.translateText) translateText = config.translateText

    this.T = this.$T.bind(this)
    this.F = this.$F.bind(this)
    this.L = this.$L.bind(this)

    this.getCallBack = function () { callback(this) }
    this.setLanguage(currentLanguage, translateText)
  }

  setLanguage (language, transPatch) {
    const resolve = transAssert => {
      var translate = objectAssign({}, [transAssert, transPatch])
      i18n.setTexts(translate)
      localStorage.setItem(this.storageKey,this.currentLanguage)
      this.getCallBack()
    }

    this.currentLanguage = language
    if (this.fileMap[language]) {
      this.fileMap[language](resolve)
    } else {
      this.fileMap[DEFAULT_LANGUAGE](resolve)
    }
  }

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
  register (fmtName, func) {
    if (typeof func !== 'function') {
      throw new TypeError('Formatter should be function, but got ' +
        typeof func)
    }
    this.formatters[fmtName] = func
  }

  /**
   *  Set current language
   *  @function L
   *  @param {string} lang - locale string
   *  @param {function} error  - call when setting failed
   *  @param {function} [success=reload] - call when setting success
   */
  $L (lang, error, success = () => { location.reload() }) {
    if (!setItem(this.storageKey, lang)) {
      if (typeof error === 'function') return error()
      return
    }
    if (typeof success === 'function') return success()
  }

  /**
   *  Translate given string
   *  @function T
   *  @param {string|string[]} item - string or array to be translated
   *  @param {object} interpolations - interpolations of placeholders in template
   *  @returns {string|string[]}
   */
  $T (item, interpolations) {
    if (typeof item === 'string') {
      return i18n.translate(item, interpolations)
    } else if (isArray(item)){
      return item.map(key => i18n.translate(key, interpolations))
    } else {
      throw new TypeError('Translate item should be string or array, but got ' +
        typeof item)
    }
  }

  /**
   *  Format given item
   *  @function F
   *  @param {string|number|string[]|number[]} item - string, number or array to be translated
   *  @param {string} fmtName - name of formatter
   *  @returns {string|string[]}
   */
  $F (item, fmtName) {
    let formatter = this.formatters[fmtName]
    if (!formatter) return console.error("Unregistered formatter:", fmtName)
    if (typeof item === 'string' || typeof item === 'number') {
      return formatter(item, this.currentLanguage)
    } else if (isArray(item)) {
      return item.map(str => formatter(str, this.currentLanguage))
    } else {
      throw new TypeError('Format item should be number, string or array, but got ' +
        typeof item)
    }
  }
}
/**
 * @callback readyCallback
 * @param {object} lul - the created instance
 */

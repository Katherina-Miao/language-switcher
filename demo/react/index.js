import Switcher from '../../src'
import getFile from '../intl_files'
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import DemoPage from './DemoPage.js'
import formatters from '../formatters'

var switcher = new Switcher({
  formatters: formatters,
  storageKey: 'front_language',
  translateFile: getFile
}, function (funs) {
  Component.prototype.setLang = funs.setLang
  Component.prototype.T = funs.T
  Component.prototype.F = funs.F
  ReactDom.render(<DemoPage title={"Hello, React demo is here."}/>, document.getElementById('reactApp'))
})

switcher.register('addOne',function(a){
  return ++a
})

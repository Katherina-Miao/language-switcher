import Lul from '../src'
import fileMap from './intl_files'
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import DemoPage from './DemoPage.js'
import formatters from './formatters'

var lul = new Lul({
  useSystemLanguage: false,
  fileMap: fileMap,
  formatters: formatters,
  storageKey: 'lul_language'
}, function (lul) {
  ReactDom.render(<DemoPage title="hello"/>, document.getElementById('app'))
})
window.L = lul.L
Component.prototype.T = lul.T
Component.prototype.F = lul.F

lul.register('addOne',function(a){
  return ++a
})

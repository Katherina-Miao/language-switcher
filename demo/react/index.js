import Lul from '../../src'
import getFile from '../intl_files'
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import DemoPage from './DemoPage.js'
import formatters from '../formatters'

var lul = new Lul({
  formatters: formatters,
  storageKey: 'lul_language',
  translateFile: getFile
}, function (lul) {
  ReactDom.render(<DemoPage title={"Hello, React demo is here."}/>, document.getElementById('reactApp'))
})

Component.prototype.setLang = lul.setLang
Component.prototype.T = lul.T
Component.prototype.F = lul.F

lul.register('addOne',function(a){
  return ++a
})

import Lul from './lul'
import fileMap from './intl_files'
import React from 'react'
import ReactDom from 'react-dom'
import DemoPage from './DemoPage.js'

new lul = new Lul({
  useSystemLanguage: false,
  fileMap: fileMap,
}, function (lul) {
  ReactDom.render((
    ReactDom.render(<DemoPage title="hello"/>, document.getElementById('app'))
  ), document.getElementById('app'))
})

Component.prototype.T = lul.T
Component.prototype.F = lul.F

lul.register('addOne',function(a){
  return ++a
})

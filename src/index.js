import Lul from './lul'
import fileMap from './intl_files'
import React from 'react'
import ReactDom from 'react-dom'
import DemoPage from './DemoPage.js'

var lul = new Lul({
  useSystemLanguage: false,
  fileMap: fileMap,
}, function() {
  ReactDom.render(<DemoPage title="hello"/>, document.getElementById('app'))
})

React.Component.prototype.T = lul.T.bind(lul)
React.Component.prototype.F = lul.F.bind(lul)

lul.register('addOne',function(a){
  return ++a
})

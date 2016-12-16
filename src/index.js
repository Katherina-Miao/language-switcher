import Lul from './lul'
import fileMap from './intl_files'
import React from 'react'
import DemoPage from './DemoPage.js'

var lul = new Lul({
  useSystemLanguage: true,
  fileMap: fileMap,
  root: <DemoPage title="hello"/>,
  el: document.getElementById('app')
})
lul.register('addOne',function(a){
  return ++a
})

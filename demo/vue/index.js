import Lul from '../../src'
import Vue from 'vue'
import getFile from '../intl_files'
import DemoPage from './DemoPage.vue'
import formatters from '../formatters'

var lul = new Lul({
  formatters: formatters,
  storageKey: 'lul_language',
  translateFile: getFile
}, function (lul) {
  Vue.prototype.T = lul.T
  Vue.prototype.F = lul.F
  Vue.prototype.setLang = lul.setLang
  new Vue({
    el: '#vueApp',
    render: (h) => { 
      return h(DemoPage, { props: { title: 'Hello, Vue demo is here.' } }) 
    }
  })

})

lul.register('addOne',function(a){
  return ++a
})

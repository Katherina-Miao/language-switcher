import Switcher from '../../src'
import Vue from 'vue'
import getFile from '../intl_files'
import DemoPage from './DemoPage.vue'
import formatters from '../formatters'

var switcher = new Switcher({
  formatters: formatters,
  storageKey: 'front_language',
  translateFile: getFile
}, function (funs) {
  Vue.prototype.T = funs.T
  Vue.prototype.F = funs.F
  Vue.prototype.setLang = funs.setLang
  new Vue({
    el: '#vueApp',
    render: (h) => { 
      return h(DemoPage, { props: { title: 'Hello, Vue demo is here.' } }) 
    }
  })

})

switcher.register('addOne',function(a){
  return ++a
})

import Lul from '../src/index.js'
import { expect } from 'chai'
import { JSDOM } from 'jsdom'
import formatters from '../demo/formatters'

var lul;
describe('默认配置', function() {
  before(function (){
    const dom = new JSDOM('<!doctype html><html><body></body></html>',{
      url: "http://localhost:8080/webpack-dev-server/"
    }
    );
    global.window = dom.window;
    global.document = window.document;
    global.navigator = window.navigator;
    global.localStorage = window.localStorage;
    global.location = window.location;

    function initLUL () {
      lul = new Lul({
        formatters: formatters,
        translateText: (language) => {
          let lang = language.selectedLang || language.systemLang
          if (lang === 'cn-ZH') {
            return {name:'Kathy',age:24}
          } else {
            return {name:'Visper',age:26}
          }
        },
        translateFile: (language, resolve) => {
          let lang = language.selectedLang || language.systemLang
          if (lang === 'cn-ZH') {
            resolve(require('../demo/intl_files/cn.json'))
          } else {
            resolve(require('../demo/intl_files/en.json'))
          }
        }
      }, function (lul) {

      })
    }
    initLUL();
    location.reload = function () {
      location.hash = localStorage.getItem('locale');
      initLUL()
    }
  })
  it('语言切换测试', function() {
    expect(lul.getLang()).to.be.equal('en-US')
    lul.setLang('cn-ZH')
    expect(lul.getLang()).to.be.equal('cn-ZH')
  })

  it('语言切换失败测试', function() {
    expect(lul.getLang()).to.be.equal('cn-ZH')
    localStorage = null
    document = null

    let switchError = function () {
      return lul.setLang('en-US',function () {
        return false
      })
    }
    expect(switchError()).to.be.equal(false)
    expect(lul.setLang('en-US')).to.be.an('undefined')
    expect(lul.getLang()).to.be.not.equal('en-US')
  })

  it('字符串翻译测试', function() {
    expect(lul.T('greeting')).to.be.equal('你好世界,我是,今年岁。')
    var tempVal = {name: lul.T('name'),age: lul.T('age')}
    expect(lul.T('greeting', tempVal)).to.be.equal('你好世界,我是Kathy,今年24岁。')
    expect(lul.T(['oneMonth', 'threeMonths', 'oneYear'])).to.deep.equal(["一个月", "三个月", "一年"])
    expect(() => lul.T(123)).to.throw(TypeError)
  })

  it('格式化方法使用', function() {
    expect(lul.F('friendlyDate', 1400000000)).to.have.string('前')
    expect(lul.F()).to.be.an('undefined')
    expect(lul.F('plusOne')).to.be.an('undefined')
  })
})

describe('简单配置', function() {
  before(function (){
    const dom = new JSDOM('<!doctype html><html><body></body></html>',{
      url: "http://localhost:8080/webpack-dev-server/"
    }
    );
    global.window = dom.window;
    global.document = window.document;
    global.navigator = window.navigator;
    global.localStorage = window.localStorage;
    global.location = window.location;

    function initLUL () {
      lul = new Lul({
        translateText: {name:'Kathy',age:24}
      }, function (lul) {

      })
    }
    initLUL();
    location.reload = function () {
      location.hash = localStorage.getItem('locale');
      initLUL()
    }
  })

  it('字符串翻译测试', function() {
    expect(lul.T('greeting')).to.be.equal('')
    expect(lul.T('name')).to.be.equal('Kathy')
  })

  it('格式化方法注册', function() {
    lul.register('addOne',function(a){
      return ++a
    })
    lul.register('minus',function(a, lang, b){
      return a-b
    })
    expect(() => lul.register()).to.throw(TypeError)
  })

  it('格式化方法使用', function() {
    expect(lul.F('addOne', 4)).to.be.equal(5)
    expect(lul.F('addOne', [1,2,3])).to.deep.equal([2,3,4])
    expect(lul.F('minus', 2, 1)).to.be.equal(1)
    expect(() => lul.F('addOne')).to.throw(TypeError)
  })
})

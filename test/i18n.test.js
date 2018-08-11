import i18n from '../src/i18n.js'
import { expect } from 'chai'

describe('翻译实例创建测试', function() {
  it('无翻译文本', function() {
    let i18nLang = new i18n()
    expect(i18nLang).to.be.instanceOf(i18n)
    let trans = function () {
      i18nLang.translate('greeting')
    }
    expect(trans).to.throw(TypeError)
  })
  it('传入翻译文本', function() {
    let i18nLang = new i18n({greeting:'你好世界,我是Kathy'})
    expect(i18nLang).to.be.instanceOf(i18n)
    expect(i18nLang.translate('greeting')).to.be.equal('你好世界,我是Kathy')
    expect(i18nLang.translate('test')).to.be.equal('')
  })
  it('传入翻译对象文本', function() {
    let i18nLang = new i18n({
      "fruits": {
        "banana": "香蕉",
        "mandarin": {
          "orange": "橙子",
        }
      }
    })
    expect(i18nLang).to.be.instanceOf(i18n)
    expect(i18nLang.translate('fruits.banana')).to.be.equal('香蕉')
    expect(i18nLang.translate('fruits.mandarin.orange')).to.be.equal('橙子')
  })
})

describe('模板测试', function() {
  it('单变量模板', function() {
    let i18nLang = new i18n({greeting:'你好世界,我是{name}'})
    expect(i18nLang.translate('greeting',{ name:'Kathy' }))
      .to.be.equal('你好世界,我是Kathy')
  })
  it('多变量模板', function() {
    let i18nLang = new i18n({greeting:'你好世界,我是{name},今年{age}岁。'})
    expect(i18nLang.translate('greeting',{ name:'Kathy', age:'24' }))
      .to.be.equal('你好世界,我是Kathy,今年24岁。')
  })
  it('错误模板变量', function() {
    let i18nLang = new i18n({greeting:'你好世界,我是{name}'})
    expect(i18nLang.translate('greeting')).to.be.equal('你好世界,我是')
    expect(i18nLang.translate('greeting',{ name:undefined }))
      .to.be.equal('你好世界,我是')
    expect(i18nLang.translate('greeting',{ name:null }))
      .to.be.equal('你好世界,我是')
  })
  it('模板默认值', function() {
    let i18nLang = new i18n({greeting:'你好世界,我是{name|`Kathy`}'})
    expect(i18nLang.translate('greeting')).to.be.equal('你好世界,我是Kathy')
    expect(i18nLang.translate('greeting',{ name:undefined }))
      .to.be.equal('你好世界,我是Kathy')
    expect(i18nLang.translate('greeting',{ name:null }))
      .to.be.equal('你好世界,我是Kathy')
  })
  it('错误模板默认值', function() {
    let i18nLang = new i18n({greeting:'你好世界,我是{name|``}'})
    expect(i18nLang.translate('greeting')).to.be.equal('你好世界,我是')
    let i18nLang1 = new i18n({greeting:'你好世界,我是{name|}'})
    expect(i18nLang1.translate('greeting')).to.be.equal('你好世界,我是')
  })
})

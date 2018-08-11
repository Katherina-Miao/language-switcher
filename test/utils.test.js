import { isArray, getUALang, objectAssign } from '../src/utils.js'
import { expect } from 'chai'
import { JSDOM } from 'jsdom'

describe('公共方法测试', function() {
  before(function (){
    const dom = new JSDOM('<!doctype html><html><body></body></html>',{
      url: "http://localhost:8080/webpack-dev-server/"
    }
    );
    global.window = dom.window
    global.navigator = window.navigator;
  })

  it('获取系统语言', function() {
    expect(getUALang()).to.be.equal('en-US')
  })
  it('数组判断', function() {
    expect(isArray([1,2,3])).to.be.equal(true)
    expect(isArray({0:1,1:2,2:3,length:3})).to.be.equal(false)
  })
  it('对象合并', function() {
    let base = {
      a: 1
    }
    function sup () {}
    sup.prototype.e = 5
    let sub = new sup()
    sub.f = 6
    objectAssign(base, [{ b: 2}])
    expect(base.b).to.be.equal(2)

    objectAssign(base, [{ c: 3 }, { d: 4 }])
    expect(base.c).to.be.equal(3)
    expect(base.d).to.be.equal(4)

    objectAssign(base, [sub])
    expect(base).to.not.have.property('e')
    expect(base.f).to.be.equal(6)
  })
})

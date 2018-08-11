import {getItem,setItem} from '../src/store.js'
import { expect } from 'chai'
import { JSDOM } from 'jsdom'

describe('Component:store',function(){
  before(function (){
    const dom = new JSDOM('<!doctype html><html><body></body></html>',{
      url: "http://localhost:8080/webpack-dev-server/"
    }
    );
    global.window = dom.window
    global.document = window.document;
  })

  it('setItem with localStorage',function(){
    global.localStorage = global.window.localStorage;
    expect(setItem()).to.be.null
    setItem('name','Kathy');
    expect(localStorage.getItem('name')).to.be.equal('Kathy')
  })


  it('getItem with localStorage',function(){
    global.localStorage = global.window.localStorage;
    expect(getItem()).to.be.null
    localStorage.setItem('name', 'Visper')
    expect(getItem('name')).to.equal('Visper')
  })


  it('setItem with cookie',function(){
    global.localStorage = null;
    expect(setItem()).to.be.null
    setItem('name','Kathy');
    expect(document.cookie.indexOf('name')).to.not.equal(-1)
  })

  it('getItem with cookie',function(){
    global.localStorage = null;
    expect(getItem()).to.be.null
    document.cookie = "name=Visper"
    expect(getItem('name')).to.equal('Visper')
  })

});

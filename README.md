# language-switcher

### 简介 Introduction

实现了页面多语言切换，可以与主流前端框架结合使用。具体可见 Demo。

Multi-language switching is implemented in web pages, which can be used with the mainstream front-end framework. See Demo.

### 使用方法 Usage

#### 引入 Installation

```html
<!--  script 标签引入 / script tag include -->
<script src="../vendor/static/language-switche.js"></script>
```

```javascript
// ES 模块引入 / ES module include
import Switcher from 'language-switcher'
```

```javascript
// 初始化 / Initialize
var switcher = new Switcher(options, function (funs) {
  // 回调函数 / Callback function
})
```

##### 选项 Options

Name | Type | Description
:- | :-: | -:
storageKey | String | Key name for saving the current language
formatters | Object | Formatting methods
translateText | [Object, Function] | Translate text<br>The method receives language information
translateFile | Function | Asynchronous request method for translation files<br>The method receives language information and request handler

##### 接口 Interface

Name | Description | Parameter | Return
:- |:-:| :- | -:
T | Translation method |( item: String, interpolations: Object )<br>( list: Array[String], interpolations: Object ) | String<br>Array
F | Formatting method |( formatter: String, item: [String, Number], param1... )<br>( formatter: String, list: Array[String, Number], param1... ) | Any<br>Array[Any]
setLang | Set the current language | ( lang: String, error: Function, success: Function ) | --
getLang | Get the current language | -- | String
register | Register formatting method | ( formatter: String, func: Function ) | --

For more details, see SEE MORE: https://katherina-miao.github.io/language-switcher/index.html

详情请见 SEE MORE: https://katherina-miao.github.io/language-switcher/index.html

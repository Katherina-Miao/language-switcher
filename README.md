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

#### API

##### 选项 Options

Name | Type | Description
- | :-: | -:
storageKey | String | 保存当前语言的键名
formatters | Object | 格式化方法
translateText | [Object, Function] | 翻译文本<br>方法会传入语言信息
translateFile | Function | 异步请求翻译文件方法<br>方法会传入语言信息及请求处理函数

##### 接口 Interface

创建实例的方法会返回一系列方法

Name | Description | Parameter | Return
- |:-:| :- | -:
$T | 翻译方法 |( item: String, interpolations: Object )<br>( list: Array[String], interpolations: Object ) | String<br>Array
$F | 格式化方法 |( formatter: String, item: [String, Number], param1... )<br>( formatter: String, list: Array, param1... ) | Any





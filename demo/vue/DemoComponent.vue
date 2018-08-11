<template>
<div>
  <h1>
    {{this.greeting}}
  </h1>
  <h3>
    {{this.howAreYou}}
  </h3>
  <p>
    {{this.F('friendlyDate',717561000)}}
  </p>
  <p>
    {{navigator.language}}
  </p>
  <demo-list :list="T(['oneMonth', 'threeMonths', 'oneYear'])"/>
  Favourate:
  <ol>
    <li>
      {{this.T('fruits.apple')}}
    </li>
    <li>
      {{this.T('fruits.banana')}}
    </li>
    <ul>
      <li>
        {{this.T('fruits.mandarin.orange')}}
      </li>
      <li>
        {{this.T('fruits.mandarin.lemon')}}
      </li>
    </ul>
  </ol>
  <img :src="this.imgSrc"/>
</div>
</template>

<script>
import DemoList from './DemoList.vue'

export default {
  props: {
    greeting: {
      type: String,
      default: '你好我是xx'
    },
    howAreYou: {
      type: String,
      default: '你好嘛？'
    },
    imgSrc: {
      type: String,
      default: 'http://img4q.duitang.com/uploads/item/201501/21/20150121093402_iVzwx.jpeg'
    }
  },
  computed: {
    navigator: function (){
      return navigator
    }
  },
  components: { DemoList }
}
</script>

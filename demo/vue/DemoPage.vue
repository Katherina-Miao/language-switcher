<template>
  <div>
    <header>{{this.title}}</header>
    <demo-component :greeting="this.T('greeting', {name:'Kathy',age:26})" :how-are-you="this.T('howAreYou')" :img-src="this.T('imgSrc')"/>
    <button @click="setLang('en-US')"> en-US </button>
    <button @click="setLang('zh-CN')"> zh-CN </button>
  </div>
</template>

<script>
import DemoComponent from './DemoComponent.vue'

export default {
  props: {
    title: {
      type: String,
      default: 'TITLE'
    }
  },
  components: { DemoComponent }
}
</script>

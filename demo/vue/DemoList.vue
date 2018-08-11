<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">{{item}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return ['list1', 'list2']
      }
    },
  }
}
</script>
<template lang="pug">
  div.pageTwo
   v-form(ref="form" v-model="formValid" data-test-id="form")

    v-layout(row wrap)
      div.button-group(data-test-id="controlButtons")
        v-btn.ma-0.mr-4.mb-1(flat @click="back()") Back
        v-btn(depressed color="info" @click="submit()") Submit
</template>

<script>
import store from '@/store';


export default {
  name: 'Page2',
  data: () => ({
    formValid: false,
    formData: store.select('pageTwo')
  }),

  methods: {
    back() {
      store.updatePageTwoData(this.formData, false);
      this.$router.push('page1');
    }
  }
};
</script>

<template lang="pug">
  div.pageOne
    v-form(ref="form" v-model="formValid" data-test-id="form")

    v-layout(row wrap)
      div.button-group(data-test-id="controlButtons")
        v-btn(
          :disabled="!formValid"
          depressed
          @click="next()"
        ) Next
</template>

<script>
import store from '@/store';
import Stepper from '@/components/Stepper';

export default {
  name: 'Page1',
  components: {
    Stepper
  },
  data: () => ({
    formValid: false,
    formData: store.select('pageOne')
  }),
  methods: {
    next() {
      this.$router.push('page2');
    }
  }
};
</script>

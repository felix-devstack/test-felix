<template>
  <div>
    <v-stepper
      :value="value"
      data-test-id="stepper"
      vertical
    >
      <template v-for="([title, subtitle, component], index) in availableSteps">
        <v-stepper-step
          :complete="value > index+1"
          :key="'step'+ (index+1)"
          :step="index+1"
        >
          {{ title }}
          <!--<small>{{ subtitle }}</small>-->
        </v-stepper-step>

        <v-stepper-content
          :key="index+1"
          :step="index+1"
        >
          <component
            :is="component"
            :key="value"
          />
        </v-stepper-content>
      </template>
    </v-stepper>
  </div>
</template>

<script>
import Page1 from '@/views/Page1';
import Page2 from '@/views/Page2';
const ALL_STEPS = [
  // [step's title, sub-title, component]
  ['Step 1', 'Client Details', Page1],
  ['Step 2', 'Client Details', Page2]
];

export default {
  name: 'Stepper',
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    steps: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // represent which step should be displayed
    availableSteps() {
      return ALL_STEPS.filter((_, index) => this.steps.includes(index+1));
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~vuetify/src/stylus/settings/_colors'

.v-stepper
  box-shadow: none

  .v-stepper__step
    &--inactive
      .ta-subheading
        color: $grey.lighten-1

    &--active
      .ta-subheading
        color: $blue.base
</style>

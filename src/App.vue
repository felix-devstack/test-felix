<template lang="pug">
  div#app
    v-app(light)
      v-container(grid-list-md text-xs-left)
        v-layout(row wrap)
          v-flex(xs12 offset-lg2 lg-8)
            v-container.main-content.pa-1.pt-2(fluid fill-height)
              v-layout
                v-flex
                  h1.ml-4.mb-3.grey--text.text--darken-2(style={"font-family": "Montserrat"}) App Template
                  stepper(
                    :value="state.shared.step"
                    :steps="state.shared.steps"
                  )
</template>

<script>
import store from '@/store';
import Stepper from '@/components/Stepper';

export default {
  name: 'App',
  components: {
    Stepper
  },

  data() {
    return {
      state: store.state
    };
  },

  mounted() {
    try {
      let token = this.$route.query.token;

      // in local dev environment, use predefined token
      const isDev = process.env.NODE_ENV === 'development';
      if (isDev) {
        token = process.env.VUE_APP_LG_APP_SESSION_TOKEN;
      }

      store.updateUserSessionData({ token });
    } catch (err) {
      console.error(`Error while mouting the app: ${err.message}`);
      // TODO: we may need to notify users that the app won't function properly if this happens
    }
  }
};
</script>


<style scoped lang="scss">
#app {
  background: rgb(240, 242,243);
}

// fix UX issue on iOS where page content keeps scrolling to the top when select something
// https://stackoverflow.com/questions/34766636/ios-browser-iframe-jumps-to-top-when-changing-css-or-content-using-javascript
html, body {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.main-content {
  background: white;
  border-radius: 5px;
}
</style>

import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#5E72E4',
        secondary: '#F7FAFC',
        accent: '#172B4D',
        error: '#F5365C',
        info: '#11CDEF',
        success: '#2DCE89',
        warning: '#FB6340',
      },
    },
  },
  icons: {
    iconfont: "mdi"
  }
});
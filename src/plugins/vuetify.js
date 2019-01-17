import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#9c27b0',
    secondary: '#ffc107',
    accent: '#607d8b',
    error: '#f44336',
    warning: '#ff5722',
    info: '#ff9800',
    success: '#4caf50',
  },
});

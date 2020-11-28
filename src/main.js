import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Web3 from 'web3';

import IpfsHttpClient from "ipfs-http-client";

Vue.config.productionTip = false

let ipfsConfig = {
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https'
};

Vue.prototype.$web3 = Vue.web3 = new Web3('http://127.0.0.1:8545');
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

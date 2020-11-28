import PhotoAlbumContract from '../../build/contracts/PhotoAlbum.json';
import Vue from 'vue';

export default class PhotoAlbum {
  constructor(address) {
    this.address = address;
    this.instance = new Vue.web3.eth.Contract(PhotoAlbumContract.abi, address);
  }

  addPhoto(name, picture) {
    return new Promise((resolve, reject) => {
      this.instance.methods.photosLength().call()
        .then((size) => Number(size))
        .then(id => this.send(this.instance.methods.publishPhoto(id, name, picture)))
        .then(resolve)
        .catch(reject);
    });
  }

  getPhotos() {
    return new Promise((resolve, reject) => {
      this.instance.methods.photosLength().call()
        .then((size) => Number(size))
        .then(size => Array.from(Array(size).keys()))
        .then(ids => ids.map(id => this.getPhoto(id)))
        .then(promises => Promise.all(promises))
        .then((pets) => {
          console.log(pets);
          resolve(pets);
        })
        .catch(reject);
    });
  }

  getPhoto(id) {
    return new Promise((resolve, reject) => {
      this.instance.methods.getPhoto(id)
        .call()
        .then(({ name, picture }) => resolve({ name, picture }))
        .catch(reject);
    });
  }

  send(signature) {
    return new Promise((resolve, reject) => {
      let from;
      Vue.web3.eth.getAccounts()
        .then(accounts => {
          from = accounts[0];
          return signature.estimateGas({from});
        })
        .then(gas => signature.send({from, gas}))
        .then(resolve)
        .catch(reject);
    });
  }

}
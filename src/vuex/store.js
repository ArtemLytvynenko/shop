import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cart: [],
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
        },
        DELETE_ELEM_CART: (state, index) => {
            let cart = getLocalStorage('cart');
            cart.splice(index, 1)
            setLocalStorage('cart', cart);
        }
    },
    actions: {
        GET_PRODUCTS_FORM_API({commit}) {
            let url = "https://60080933309f8b0017ee530e.mockapi.io/products";
            return axios(url, {
                method: "GET"
            })
                .then((products) => {
                    commit("SET_PRODUCTS_TO_STATE", products.data);

                    return products;
                })
                .catch((error) => {
                    console.log(error);

                    return error;
                })
        },
    },
    getters: {
        PRODUCTS(state) {
            return state.products;
        },
    },

});

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export default store;

<template>
    <div class = "v-cart">
        <div class = "container">
            <h1>Cart</h1>
            <p v-if = "!cartFromLocalStorage.length">Cart is empty</p>
            <transition-group name = "cart"
                              tag = "div"
                              v-on:before-enter = "beforeEnter"
                              v-on:enter = "enter"
                              v-on:leave = "leave">
                <v-cart-item v-for = "(product, index) in cartFromLocalStorage"
                             :key = "product.id"
                             :product-data = "product"
                             :index = "index"
                             :data-index = "index"
                             :numberWithSpaces = "numberWithSpaces"
                             @deleteFromCart = "deleteFromCart(index)"/>
            </transition-group>
            <div class = "v-cart__total-price"
                 v-if = "cartFromLocalStorage.length">
                {{numberWithSpaces(cartTotalCost)}}
                <span class = "v-cart-item-price__currency">&nbsp;€</span>
            </div>
            <router-link :to = "{name: 'Shipping', params: {price: cartTotalCost}}">
                <button class = "btn"
                        v-if = "cartFromLocalStorage.length">
                    Buy
                </button>
            </router-link>
        </div>
    </div>
</template>
<script>
    import vCartItem from "./v-cart-item"
    import {mapActions} from "vuex"

    export default {
        name: "v-cart",
        components: {
            vCartItem
        },
        props: {},
        data() {
            return {}
        },
        computed: {
            cartTotalCost() {
                let result = [0];

                for (let item of this.localStorage.cart) {
                    result.push(item.price * item.quantity);
                }

                return result.reduce(function (sum, val) {
                    return sum + val;
                }).toFixed(2);
            },
            cartFromLocalStorage() {
                return this.localStorage.cart;
            }
        },
        methods: {
            beforeEnter(el) {
                el.style.opacity = 0;
                el.style.height = 0;
            },
            enter(el, done) {
                let delay = el.dataset.index * 1000;
                setTimeout(function () {
                    el.style.opacity = 1;
                    el.style.height = "auto";
                    done();
                }, delay)
            },
            leave(el, done) {
                console.log(el.dataset.index);
                let delay = el.dataset.index * 1000;
                setTimeout(function () {
                    el.style.opacity = 0;
                    el.style.height = 0;
                    done();
                }, delay)
            },
            ...mapActions([
                "DELETE_FROM_CART",
            ]),
            deleteFromCart(index) {
                let cart = this.localStorage.cart;
                cart.splice(index, 1);
                this.localStorage.cart = cart;
            },
            numberWithSpaces(x) {
                let parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return parts.join(".");
            },
        },
    }
</script>
<style lang = "scss">
    .v-cart__total-price {
        text-align: right;
        font-size: 2.5em;
        color: $colorTextMain;
        font-weight: 600;
        margin-top: $margin*3;
    }

    .btn {
        padding: 5px 20px;
        background-color: #e6e6e6;
        border-radius: 2px;
        color: #777777;
        border: 1px solid #525252;
        font-weight: 600;
        font-size: 1.5em;
        text-transform: uppercase;
        display: block;
        margin-top: 20px;
        margin-left: auto;
        width: 120px;
    }
</style>

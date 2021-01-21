<template>
    <div class = "v-catalog">
        <div class = "container">
            <h1>Catalog</h1>
            <router-link :to = "{name: 'Cart', params: {cartData: CART}}">
                <div class = "v-catalog__link_to_cart">Cart: {{CART.length}}</div>
            </router-link>
            <transition-group name = "catalog"
                              tag = "div"
                              v-on:before-enter = "beforeEnter"
                              v-on:enter = "enter"
                              v-on:leave = "leave">
                <v-catalog-item
                        v-for = "(product, index) in PRODUCTS"
                        :key = "product.id"
                        :data-index = "index"
                        v-bind:product-data = "product"
                        @add-to-cart = "addToCart" />
            </transition-group>
        </div>
    </div>
</template>
<script>
    import vCatalogItem from './v-catalog-item'
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: "v-catalog",
        components: {
            vCatalogItem
        },
        props: {},
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                "PRODUCTS",
                "CART"
            ])
        },
        methods: {
            beforeEnter(el) {
                el.style.opacity = 0;
                el.style.height = 0;
            },
            enter(el, done) {
                let delay = el.dataset.index * 300;
                setTimeout(function () {
                    el.style.opacity = 1;
                    el.style.height = "auto";
                    done();
                }, delay)
            },
            leave(el, done) {
                let delay = el.dataset.index * 300;
                setTimeout(function () {
                    el.style.opacity = 0;
                    el.style.height = 0;
                    done();
                }, delay)
            },
            ...mapActions([
                "GET_PRODUCTS_FORM_API",
                "ADD_TO_CART"
            ]),
            addToCart(data) {
                this.ADD_TO_CART(data);
            }
        },
        mounted() {
            this.GET_PRODUCTS_FORM_API();
        }
    }
</script>
<style>
    .v-catalog__link_to_cart {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px;
        border: 1px solid red;
        cursor: pointer;
    }
</style>

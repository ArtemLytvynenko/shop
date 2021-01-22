<template>
    <div class = "v-catalog">
        <div class = "container">
            <h1>Catalog</h1>
            <router-link :to = "{name: 'Cart'}" class = "v-catalog__link_to_cart">
                <img :src = "require('../assets/images/shopping_cart.png')" alt = "">
                <span v-if = "localStorage.cart.length">{{localStorage.cart.length}}</span>
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
                        :product-data = "product"/>
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
            ]),
        },
        mounted() {
            this.GET_PRODUCTS_FORM_API();
        }
    }
</script>
<style lang = "scss">
    .v-catalog__link_to_cart {
        position: fixed;
        z-index: 2;
        background-color: #fff;
        max-width: 55px;
        top: 20px;
        right: 20px;
        cursor: pointer;

        img {
            width: 100%;
        }

        span {
            position: absolute;
            top: 50%;
            left: 50%;
            right: 0;
            bottom: 0;
            transform: translate(-50%, -81%);
            display: block;
            border-radius: 50%;
            background: #000;
            color: #fff;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2em;
            height: 2em;
            font-weight: 600;
        }
    }
</style>

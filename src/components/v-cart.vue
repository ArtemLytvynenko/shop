<template>
    <div class = "v-cart">
        <div class = "container">
            <h1>Cart</h1>
            <p v-if = "!cartData.length">Cart is empty</p>
            <router-link :to = "{name: 'Catalog'}">
                <div class = "v-catalog__link_to_cart">
                    Back to catalog
                </div>
            </router-link>
            <v-cart-item v-for = "(product, index) in cartData"
                         :key = "product.id"
                         :product-data = "product"
                         :numberWithSpaces = "numberWithSpaces"
                         @deleteFromCart = "deleteFromCart(index)"/>
            <div class = "v-cart__total-price"
                 v-if = "cartData.length">
                {{numberWithSpaces(cartTotalCost.toFixed(2))}}
                <span class = "v-cart-item-price__currency">&nbsp;€</span>
            </div>
            <router-link to="/shipping">
                <button class="btn">
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
        props: {
            cartData: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {}
        },
        computed: {
            cartTotalCost() {
                let result = [];

                for (let item of this.cartData) {
                    result.push(item.price * item.quantity);
                }

                return result.reduce(function (sum, val) {
                    return sum + val;
                })
            }
        },
        methods: {
            ...mapActions([
                "DELETE_FROM_CART"
            ]),
            deleteFromCart(index) {
                this.DELETE_FROM_CART(index)
            },
            numberWithSpaces(x) {
                let parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return parts.join(".");
            }
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
    .btn{
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

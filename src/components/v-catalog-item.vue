<template>
    <div class = "v-catalog-item">
        <div class = "v-catalog-item__info">
            <div class = "v-catalog-item__image">
                <img v-bind:src = " productData.image "
                     alt = "">
            </div>
            <div class = "v-catalog-item__description">
                <h2>{{productData.title}}</h2>
                <p>{{productData.description}}</p>
            </div>
        </div>
        <div class = "v-catalog-item__control">
            <button @click = "addToCart(productData)" class = "add-to-cart">
                Add to Cart
            </button>
            <div class = "v-catalog-item-price v-catalog-item-price-font-style">
                <span class = "v-catalog-item-price_amount">{{productData.price}}
                    <span class = "v-catalog-item-price__currency">&nbsp;€</span>
                </span>&nbsp;
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions} from "vuex"

    export default {
        name: "v-catalog-item",
        props: {
            productData: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {}
        },
        computed: {},
        methods: {
            ...mapActions([
                'ADD_TO_CART'
            ]),
            addToCart(productData) {
                let cart = this.localStorage.cart;
                if (cart.length) {
                    let isProductExist = false;

                    cart.map(function (item) {
                        if (item.id === productData.id) {
                            isProductExist = true;
                            item.quantity++;
                            console.log(item)
                        }
                    });

                    if (!isProductExist) {
                        cart.push(productData);
                        this.localStorage.cart = cart;
                    }
                    console.log(cart);
                } else {
                    cart.push(productData);
                    this.localStorage.cart = cart;
                    console.log('else quantity++')
                }
            }
        },
        mounted() {
            this.$set(this.productData, "quantity", 1);
        }
    }
</script>
<style lang = "scss">
    .v-catalog-item {
        border-bottom: 1px solid #c4c4c4;
        padding: 30px 20px 30px;
        display: flex;
        justify-content: space-between;
        position: relative;

        @media (max-width: 991px) {
            flex-direction: column;
        }

        &__info {
            display: flex;
            width: 70%;
            @media (max-width: 991px) {
                width: 100%;
                margin-bottom: 30px;
            }
            @media (max-width: 767px) {
                flex-direction: column;
                margin-bottom: 10px;
            }
        }

        &__image {
            height: 200px;
            width: 200px;
            flex-shrink: 0;
            border-radius: 10px;
            box-shadow: 5px 5px 10px 5px #eaeaea;
            position: relative;
            @media (max-width: 767px) {
                margin: 0 auto 20px;
            }
            @media (max-width: 480px) {
                width: 100%;
                height: auto;
            }

            img {
                max-width: calc(100% - 20px);
                max-height: calc(100% - 20px);
                border-radius: 10px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                @media (max-width: 480px) {
                    width: auto;
                    height: auto;
                    position: relative;
                    padding: 10px;
                }
            }
        }

        &__description {
            text-align: left;
            padding: 0 30px;
            @media (max-width: 991px) {
                padding-right: 0;
            }
            @media (max-width: 767px) {
                padding-left: 0;
            }

            h2 {
                margin-top: 0;
            }

            p {
                text-overflow: ellipsis;
                overflow: hidden;
                color: #c4c4c4;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                line-height: 1.5;
                max-height: $lineHeight*$numberLines;
            }
        }

        &__control {
            border-left: 1px solid #c4c4c4;
            padding-left: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            flex-grow: 1;
            @media (min-width: 992px) and (max-width: 1199px) {
                flex-direction: column;
                justify-content: center;
            }
            @media (max-width: 991px) {
                padding: 0;
                border: none;
            }

            @media (max-width: 480px) {
                flex-direction: column;
                justify-content: center;
            }
        }

        .add-to-cart {
            padding: 10px;
            background-color: #e6e6e6;
            border-radius: 2px;
            color: #777777;
            border: 1px solid #525252;
            font-weight: 600;
            text-transform: uppercase;

            &:focus {
                outline: none;
            }

            @media (min-width: 992px) and (max-width: 1199px), (max-width: 480px) {
                order: 2;
            }

        }

        .v-catalog-item-price-font-style {
            font-size: 1.5em;
            color: #000;
            font-weight: 600;
        }

        .v-catalog-item-price {
            @media (min-width: 992px) and (max-width: 1199px), (max-width: 480px) {
                order: 1;
                margin-bottom: 15px;
            }
        }

        .v-catalog-item-remove {
            position: absolute;
            top: 0;
            right: 0;
            @media (min-width: 481px) and (max-width: 991px) {
                position: relative;
            }

            &:hover svg {
                fill: #000;
                transition: .3s ease-in-out;
                cursor: pointer;
            }

            svg {
                transition: .3s ease-in-out;
                width: 25px;
                fill: #c4c4c4;
            }
        }
    }
</style>

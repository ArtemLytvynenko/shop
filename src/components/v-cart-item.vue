<template>
    <div class = "v-cart-item">
        <div class = "v-cart-item__info">
            <div class = "v-cart-item__image">
                <img v-bind:src = " productData.image "
                     alt = "">
            </div>
            <div class = "v-cart-item__description">
                <h2>{{productData.title}}</h2>
                <p>{{productData.description}}</p>
            </div>
        </div>
        <div class = "v-cart-item__control">
            <div class = "v-cart-item-counter">
                <button class = "v-cart-item-counter__button"
                        title = "Delete one item"
                        :disabled = "isIncrementDisable"
                        @click = "decrementQuantity">
                    <svg viewBox = "0 0 24 24" id = "icon-minus">
                        <path clip-rule = "evenodd"
                              d = "m3 12c0-.5523.44772-1 1-1h16c.5523 0 1 .4477 1 1s-.4477 1-1 1h-16c-.55228 0-1-.4477-1-1z"
                              fill-rule = "evenodd"></path>
                    </svg>
                </button>
                <input
                        class = "v-cart-item-counter__input"
                        type = "number"
                        :value = "productData.quantity"
                        readonly>
                <button class = "v-cart-item-counter__button"
                        title = "Add one item"
                        :disabled = "isDecrementDisable"
                        @click = "incrementQuantity">
                    <svg viewBox = "0 0 24 24" id = "icon-plus">
                        <path d = "m13 4c0-.55228-.4477-1-1-1s-1 .44772-1 1v7h-7c-.55228 0-1 .4477-1 1s.44772 1 1 1h7v7c0 .5523.4477 1 1 1s1-.4477 1-1v-7h7c.5523 0 1-.4477 1-1s-.4477-1-1-1h-7z"></path>
                    </svg>
                </button>
            </div>
            <div class = "v-cart-item-price v-cart-item-price-font-style">
                {{numberWithSpaces(price)}}
                <span class = "v-cart-item-price__currency">&nbsp;€</span>
            </div>
            <div class = "v-cart-item-remove" @click = "deleteFromCart">
                <svg version = "1.1" id = "Capa_1" xmlns = "http://www.w3.org/2000/svg" x = "0px" y = "0px"
                     viewBox = "0 0 477.867 477.867" style = "enable-background:new 0 0 477.867 477.867;"
                     xml:space = "preserve"
                >
	<g>
		<g>
			<path d = "M443.733,68.267H324.267V51.2c0-28.277-22.923-51.2-51.2-51.2H204.8c-28.277,0-51.2,22.923-51.2,51.2v17.067H34.133
			c-9.426,0-17.067,7.641-17.067,17.067S24.708,102.4,34.133,102.4h18.551l32.649,359.953c0.805,8.814,8.216,15.55,17.067,15.514
			h273.067c8.851,0.037,16.261-6.699,17.067-15.514L425.182,102.4h18.552c9.426,0,17.067-7.641,17.067-17.067
			S453.159,68.267,443.733,68.267z M187.733,51.2c0-9.426,7.641-17.067,17.067-17.067h68.267c9.426,0,17.067,7.641,17.067,17.067
			v17.067h-102.4V51.2z M359.885,443.733H117.982L87.04,102.4h83.627h220.245L359.885,443.733z"
            />
		</g>
	</g>
                    <g>
		<g>
			<path d = "M187.738,391.392c-0.002-0.023-0.003-0.047-0.005-0.07l-17.067-238.933c-0.669-9.426-8.853-16.524-18.278-15.855
			c-9.426,0.669-16.524,8.853-15.855,18.278L153.6,393.745c0.637,8.949,8.095,15.878,17.067,15.855h1.229
			C181.299,408.947,188.392,400.795,187.738,391.392z"
            />
		</g>
	</g>
                    <g>
		<g>
			<path d = "M238.933,136.533c-9.426,0-17.067,7.641-17.067,17.067v238.933c0,9.426,7.641,17.067,17.067,17.067
			S256,401.959,256,392.533V153.6C256,144.174,248.359,136.533,238.933,136.533z"
            />
		</g>
	</g>
                    <g>
		<g>
			<path d = "M325.478,136.533c-9.426-0.669-17.609,6.429-18.278,15.855l-17.067,238.933c-0.691,9.4,6.369,17.581,15.769,18.272
			c0.029,0.002,0.057,0.004,0.086,0.006h1.212c8.972,0.023,16.43-6.906,17.067-15.855l17.067-238.933
			C342.003,145.386,334.904,137.203,325.478,136.533z"
            />
		</g>
	</g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
</svg>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "v-cart-item",
        props: {
            productData: {
                type: Object,
                default() {
                    return {}
                }
            },
            numberWithSpaces: {
                type: Function,
                default(val) {
                    return val;
                }
            }
        },
        data() {
            return {
                price: this.productData.price,
            }
        },
        computed: {
            isIncrementDisable() {
                return this.productData.quantity == 1 ? true : false;
            },
            isDecrementDisable() {
                return this.productData.quantity == 50 ? true : false;
            },
        },
        methods: {
            deleteFromCart() {
                this.$emit("deleteFromCart");
            },
            decrementQuantity() {
                if (this.productData.quantity > 1) {
                    this.productData.quantity--;
                    this.price = (this.productData.quantity * this.productData.price).toFixed(2);
                }
            },
            incrementQuantity() {
                if (this.productData.quantity < 50) {
                    this.productData.quantity++;
                    this.price = (this.productData.quantity * this.productData.price).toFixed(2);
                }
            },
        },
        mounted() {
            this.$set(this.productData, "quantity", 1);
        }
    }
</script>
<style lang = "scss">
    .v-cart-item {
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

        .v-cart-item-counter {
            display: flex;
            align-items: center;
            flex-direction: row;
            flex-wrap: nowrap;
            @media (min-width: 992px) and (max-width: 1199px) {
                order: 2;
            }
            @media (min-width: 768px) and (max-width: 991px) {
                width: 200px;
                justify-content: space-between;
            }

            @media (max-width: 480px) {
                order: 2;
            }


            &__button {
                width: 40px;
                height: 40px;
                padding: 0;
                background-color: transparent;
                border: 1px solid #000;
                border-radius: 1px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: .3s ease-in-out;

                &:focus {
                    outline: none;
                }

                &[disabled] {
                    border: 1px solid #c4c4c4;
                }

                &:hover:not([disabled]) svg {
                    fill: #000;
                    transition: .3s ease-in-out;
                }

                svg {
                    fill: #c4c4c4;
                    width: 25px;
                    transition: .3s ease-in-out;
                }
            }

            &__input {
                border: none;
                max-width: 80px;
                font-size: 1.3em;
                color: #525252;
                text-align: center;
                -moz-appearance: textfield;

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    display: none;
                    margin: 0;
                }

                &:focus {
                    outline: none;
                }
            }
        }

        .v-cart-item-price-font-style {
            font-size: 1.5em;
            color: #000;
            font-weight: 600;
        }

        .v-cart-item-price {
            @media (min-width: 992px) and (max-width: 1199px), (max-width: 480px) {
                order: 1;
                margin-bottom: 15px;
            }
        }

        .v-cart-item-remove {
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

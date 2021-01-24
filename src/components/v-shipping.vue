<template>
    <div class = "v-shipping">
        <div class = "container">
            <h1>Shipping</h1>
            <div class = "pop-up-success" v-if = "popup">
                Congratulations on your purchase !!
            </div>
            <form class = "form-shipping" @submit.prevent = "submitForm">
                <transition name = "error-board">
                    <p v-if = "error.length">
                        <b>Please correct the indicated errors: </b>{{ error }}
                    </p>
                </transition>
                <label>
                    Name*
                    <input v-model = "form.name.value"
                           :class = "form.name.class"
                           type = "text"
                           @focusout = "checkName"
                           placeholder = "John Kowalsky">
                </label>
                <label>
                    Address*
                    <input v-model = "form.address.value"
                           :class = "form.address.class"
                           type = "text"
                           @focusout = "checkAddress"
                           placeholder = "438 Dark Spurt, San Francisco, CA 94528, USA">
                </label>
                <label>
                    Phone
                    <input v-model = "form.phone.value"
                           :class = "form.phone.class"
                           type = "tel"
                           @focusout = "checkPhone"
                           placeholder = "+48 51 6538">
                </label>
                <label>
                    Email
                    <input v-model = "form.email.value"
                           :class = "form.email.class"
                           type = "email"
                           @focusout = "checkEmail"
                           placeholder = "moneySwagg@hot.com">
                </label>
                <label>
                    Shipping Options
                    <select v-model = "selected">
                        <option v-for = "(shippingOption, index) in shippingOptions"
                                :key = "index"
                                :value = "shippingOption">
                            {{shippingOption}}
                        </option>
                    </select>
                </label>
                <button :disabled = "isDisabledBtnForm">
                    PAY
                </button>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        name: "v-shipping",
        props: [
            "price"
        ],
        data() {
            return {
                form: {
                    name: {
                        value: null,
                        class: null,
                        error: true,
                        errorMessage: ''
                    },
                    address: {
                        value: null,
                        class: null,
                        error: true,
                        errorMessage: ''
                    },
                    email: {
                        value: null,
                        class: null,
                        error: true,
                        errorMessage: ''
                    },
                    phone: {
                        value: null,
                        class: null,
                        error: true,
                        errorMessage: ''
                    },
                },
                shippingOptions: [
                    "Free shipping",
                    "Express shipping",
                    "Courier shipping"
                ],
                selected: "Free shipping",
                error: '',
                popup: false
            }
        },
        computed: {
            isDisabledBtnForm() {
                let res = this.checkErrorInput();
                if (res.error) {
                    return res.error;
                }

                return res;
            }
        },
        methods: {
            checkErrorInput() {
                if (this.form.name.error) {
                    return this.form.name;
                }
                if (this.form.address.error) {
                    return this.form.address;
                }
                if (this.form.email.error) {
                    return this.form.email;
                }
                if (this.form.phone.error) {
                    return this.form.phone;
                }

                return false;

            },
            viewError(input) {
                if (input.error) {
                    this.error = input.errorMessage;
                } else {
                    this.error = '';
                }
            },
            checkName() {
                if (!this.form.name.value) {
                    this.form.name.error = true;
                    this.form.name.errorMessage = 'Please enter a name.';
                    this.form.name.class = "error";
                } else {
                    this.form.name.error = false;
                    this.form.name.class = "";
                }

                this.viewError(this.form.name);
            },
            checkAddress() {
                if (!this.form.address.value) {
                    this.form.address.error = true;
                    this.form.address.errorMessage = 'Please provide an address.';
                    this.form.address.class = 'error';
                } else {
                    this.form.address.error = false;
                    this.form.address.class = '';
                }

                this.viewError(this.form.address);
            },
            checkPhone() {
                if (!this.form.phone.value) {
                    this.form.phone.errorMessage = 'Please enter your phone number.';
                    this.form.phone.error = true;
                    this.form.phone.class = "error";
                } else if (!this.validPhone(this.form.phone.value)) {
                    this.form.phone.errorMessage = 'Please enter a valid phone';
                    this.form.phone.error = true;
                    this.form.phone.class = "error";
                } else {
                    this.form.phone.error = false;
                    this.form.phone.class = "";
                }

                this.viewError(this.form.phone);
            },
            checkEmail() {
                if (!this.form.email.value) {
                    this.form.email.errorMessage = 'Enter your email.';
                    this.form.email.error = true;
                    this.form.email.class = "error";
                } else if (!this.validEmail(this.form.email.value)) {
                    this.form.email.errorMessage = 'Please enter a valid email address.';
                    this.form.email.error = true;
                    this.form.email.class = "error";
                } else {
                    this.form.email.error = false;
                    this.form.email.class = "";
                }

                this.viewError(this.form.email);
            },
            validEmail: function (email) {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            validPhone: function (phone) {
                // eslint-disable-next-line no-useless-escape
                let re = /^\+??[\d\(\)\-]{4,14}\d$/;
                return re.test(phone);
            },
            submitForm: function () {
                this.popup = true;
            }
        },
        mounted() {
            if (this.price > 300) {
                this.shippingOptions.push("Free express shipping");
                this.selected = "Free express shipping";
            }
        }
    }
</script>
<style lang = "scss">
    .pop-up-success {
        font-size: 2em;
        margin-bottom: 30px;
    }

    .error-board-enter-active, .error-board-leave-active {
        transition: all .5s;
    }

    .error-board-enter, .error-board-leave-to {
        opacity: 0;
    }

    .form-shipping {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 100%;
        max-width: 500px;

        p {
            color: #bf0000;

            ul {
                text-align: left;
                list-style: none;
                padding: 0;
            }
        }

        label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            @media screen and (max-width: 480px) {
                flex-direction: column;
                align-items: end;
            }

            input, select {
                max-width: 300px;
                width: 100%;
                @media screen and (max-width: 480px) {
                    margin-top: 10px;
                    max-width: 100%;
                }
            }

            input.error {
                border: 1px solid #bf0000;
            }
        }

        button {
            width: 120px;
            padding: 10px;
            font-weight: 600;
            margin-left: auto;
            display: block;

            &[disabled] {
                color: #c9c9c9;
            }
        }
    }
</style>

<template>
    <div class = "v-shipping">
        <h1>Shipping</h1>
        <form class = "form-shipping">
            <label>
                Name*
                <input v-model = "name" type = "text">
            </label>
            <label>
                Address*
                <input v-model = "address" type = "text">
            </label>
            <label>
                Phone
                <input v-model = "phone" type = "tel">
            </label>
            <label>
                Email
                <input v-model = "email" type = "email">
            </label>
            <label>
                Shipping Options
                <select v-model = "selectedShipping">
                    <option v-for = "(shippingOption, index) in shippingOptions"
                            :key = "index"
                            :value = "shippingOption">
                        {{shippingOption}}
                    </option>
                </select>
            </label>

        </form>
    </div>
</template>
<script>
    export default {
        name: "v-shipping",
        props: {},
        data() {
            return {
                name: '',
                address: '',
                email: '',
                phone: '',
                shippingOptions: [
                    "Free shipping",
                    "Express shipping",
                    "Courier shipping"
                ],
                selectedShipping: "Free shipping",

            }
        },
        computed: {},
        methods: {},
    }
</script>
<style lang = "scss">
    .form-shipping {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        max-width: 500px;

        label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            input, select {
                width: 70%;
            }
        }
    }
</style>

<template>
    <div class = "v-main-wrapper">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
    import {mapGetters} from "vuex"

    export default {
        name: 'v-main-wrapper',
        props: {},
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'CART'
            ]),
        },
        methods: {},
        watch: {},
        mounted() {
        },


    }
</script>
<style lang = "scss">
    .v-main-wrapper {
        margin-bottom: 20px;
    }
</style>

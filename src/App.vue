<template>
    <div id = "app">
        <v-main-wrapper/>
    </div>
</template>
<script>
    import vMainWrapper from './components/v-main-wrapper'

    export default {
        name: 'App',
        components: {
            vMainWrapper,
        }
    }
</script>
<style lang = "scss">
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        font-size: 16px;
        font-family: 'Open Sans', sans-serif;
        color: #000;

        @media only screen and (max-width: 374px) {
            font-size: 14px;
        }
    }
</style>

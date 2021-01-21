import Vue from "vue"
import Router from "vue-router"
import vCatalog from "../components/v-catalog"
import vCart from "../components/v-cart"
import vShipping from "../components/v-shipping"

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: "/",
            name: "Catalog",
            component: vCatalog
        },
        {
            path: "/cart",
            name: "Cart",
            component: vCart,
            props: true,
        },
        {
            path: "/shipping",
            name: "Shipping",
            component: vShipping
        }
    ]
});

export default router;

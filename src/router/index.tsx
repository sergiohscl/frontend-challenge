
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router"

import { HomePage } from "@/pages/HomePage/HomePage"
import { NFTDetailsPage } from "@/pages/NFTDetailsPage/NFTDetailsPage";
import { CartPage } from "@/pages/CartPage/CartPage"
import { CheckoutPage } from "@/pages/CheckoutPage/CheckoutPage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
})

const nftDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nft/$id",
  component: NFTDetailsPage,
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
})

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  nftDetailsRoute,
  cartRoute,
  checkoutRoute
])

export const router = createRouter({
  routeTree,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

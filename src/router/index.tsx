import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() =>
    import("@/pages/HomePage/HomePage").then((module) => ({
      default: module.HomePage,
    })),
  ),
});

const nftDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nft/$id",
  component: lazyRouteComponent(() =>
    import("@/pages/NFTDetailsPage/NFTDetailsPage").then((module) => ({
      default: module.NFTDetailsPage,
    })),
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: lazyRouteComponent(() =>
    import("@/pages/CartPage/CartPage").then((module) => ({
      default: module.CartPage,
    })),
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: lazyRouteComponent(() =>
    import("@/pages/CheckoutPage/CheckoutPage").then((module) => ({
      default: module.CheckoutPage,
    })),
  ),
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: lazyRouteComponent(() =>
    import("@/pages/AuthPage/AuthPage").then((module) => ({
      default: module.AuthPage,
    })),
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: lazyRouteComponent(() =>
    import("@/pages/ProfilePage/ProfilePage").then((module) => ({
      default: module.ProfilePage,
    })),
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  nftDetailsRoute,
  cartRoute,
  checkoutRoute,
  authRoute,
  profileRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: false,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

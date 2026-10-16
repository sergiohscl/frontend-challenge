
import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
} from "@tanstack/react-router";

import { ProtectedLayout } from "@/components/Auth/ProtectedLayout";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",

  validateSearch: (
    search: Record<string, unknown>,
  ): { auth?: "login" | "register" } => {
    const auth = search.auth;

    return {
      auth:
        auth === "login" || auth === "register"
          ? auth
          : undefined,
    };
  },

  component: lazyRouteComponent(() =>
    import("@/pages/HomePage/HomePage").then((module) => ({
      default: module.HomePage,
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

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedLayout,
});

const nftDetailsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/nft/$id",
  component: lazyRouteComponent(() =>
    import("@/pages/NFTDetailsPage/NFTDetailsPage").then((module) => ({
      default: module.NFTDetailsPage,
    })),
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/cart",
  component: lazyRouteComponent(() =>
    import("@/pages/CartPage/CartPage").then((module) => ({
      default: module.CartPage,
    })),
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/checkout",
  component: lazyRouteComponent(() =>
    import("@/pages/CheckoutPage/CheckoutPage").then((module) => ({
      default: module.CheckoutPage,
    })),
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: lazyRouteComponent(() =>
    import("@/pages/ProfilePage/ProfilePage").then((module) => ({
      default: module.ProfilePage,
    })),
  ),
});

const walletsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile/wallets",
  component: lazyRouteComponent(() =>
    import("@/pages/ProfilePage/WalletsPage").then((module) => ({
      default: module.WalletsPage,
    })),
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute,

  protectedRoute.addChildren([
    nftDetailsRoute,
    cartRoute,
    checkoutRoute,
    profileRoute,
    walletsRoute,
  ]),
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

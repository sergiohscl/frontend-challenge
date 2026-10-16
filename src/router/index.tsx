import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
} from "@tanstack/react-router";

// Rota principal
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Home
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() =>
    import("@/pages/HomePage/HomePage").then((module) => ({
      default: module.HomePage,
    })),
  ),
});

// Detalhes do NFT
const nftDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nft/$id",
  component: lazyRouteComponent(() =>
    import("@/pages/NFTDetailsPage/NFTDetailsPage").then((module) => ({
      default: module.NFTDetailsPage,
    })),
  ),
});

// Carrinho
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: lazyRouteComponent(() =>
    import("@/pages/CartPage/CartPage").then((module) => ({
      default: module.CartPage,
    })),
  ),
});

// Checkout
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: lazyRouteComponent(() =>
    import("@/pages/CheckoutPage/CheckoutPage").then((module) => ({
      default: module.CheckoutPage,
    })),
  ),
});

// Autenticação - Login e Cadastro
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: lazyRouteComponent(() =>
    import("@/pages/AuthPage/AuthPage").then((module) => ({
      default: module.AuthPage,
    })),
  ),
});

// Árvore de rotas
const routeTree = rootRoute.addChildren([
  homeRoute,
  nftDetailsRoute,
  cartRoute,
  checkoutRoute,
  authRoute,
]);

// Router
export const router = createRouter({
  routeTree,
  defaultPreload: false,
});

// Tipagem do TanStack Router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

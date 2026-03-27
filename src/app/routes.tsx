import { createBrowserRouter } from "react-router";
import { Root } from "./layout/Root";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { TrendsPage } from "./pages/TrendsPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AuthPage } from "./pages/AuthPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true,                Component: HomePage },
      { path: "san-pham",           Component: ProductsPage },
      { path: "san-pham/:id",       Component: ProductDetailPage },
      { path: "xu-huong",           Component: TrendsPage },
      { path: "ve-chung-toi",       Component: AboutUsPage },
      { path: "dang-nhap",          Component: AuthPage },
      { path: "dang-ky",            Component: AuthPage },
      { path: "*",                  Component: HomePage },
    ],
  },
]);

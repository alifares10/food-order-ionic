import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import AuthCallback from "./pages/AuthCallback";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import Products from "./pages/Products";
import Order from "./pages/Order";
import OrderStatus from "./pages/OrderStatus";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <Home />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout showHero={false}>
            <Products />
          </Layout>
        }
      />
      <Route
        path="/my-order"
        element={
          <Layout showHero={false}>
            <Order />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout showHero={false}>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
        <Route
          path="/order-status"
          element={
            <Layout showHero={false}>
              <OrderStatus />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

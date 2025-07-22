import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage/CatalogPage.jsx";
//import CarPage from "./pages/CarPage/CarPage.jsx";

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          {/*  <Route path="/catalog/:id" element={<CarPage />} /> */}
        </Routes>
      </Suspense>
    </Layout>
  );
}

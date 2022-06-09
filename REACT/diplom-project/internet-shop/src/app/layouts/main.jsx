import React from "react";
import ProductListPage from "../components/page/productListPage/productListPage";
import { CategoryProvider } from "../hooks/useCategories";
const Main = () => {
    return (
        <CategoryProvider>
            <ProductListPage />
        </CategoryProvider>
    );
};

export default Main;

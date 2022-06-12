import React from "react";
import ProductListPage from "../components/page/productListPage";
import { CategoryProvider } from "../hooks/useCategories";
import { ProductProvider } from "../hooks/useProduct";
const Main = () => {
    return (
        <CategoryProvider>
            <ProductProvider>
                <ProductListPage />
            </ProductProvider>
        </CategoryProvider>
    );
};

export default Main;

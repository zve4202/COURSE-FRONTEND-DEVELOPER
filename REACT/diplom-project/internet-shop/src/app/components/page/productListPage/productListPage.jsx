import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import ProductTable from "./table/productTable";
import { loadCategories } from "../../../store/categories";
import { loadProducts } from "../../../store/products";
import ProductSearch from "./seacher/productSearch";
import ProductLoader from "./productLoader";
import CategoryList from "./productCategory";
// import { updateSetting } from "../../../store/setting";
import WorkScreen from "../../common/wrappers/workScreen";
import PaginationWrapper from "../../common/pagination";
import { loadFormats } from "../../../store/formats";
import { loadLabels } from "../../../store/labels";
import { loadOrigins } from "../../../store/origin";
import { loadStyles } from "../../../store/style";

const ProductListPage = () => {
    const name = "product";
    const dispatch = useDispatch();

    const { docs, totalDocs } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(loadLabels());
        dispatch(loadProducts());
        dispatch(loadCategories());
        dispatch(loadFormats());
        dispatch(loadOrigins());
        dispatch(loadStyles());
    }, []);

    const addToBasket = (id) => {
        console.log(id);
    };

    const handleSort = () => {
        dispatch(loadProducts());
    };

    const onFilter = () => {
        dispatch(loadProducts());
    };

    const onFilterDebounced = debounce(onFilter, 500);
    const onSearch = () => {
        onFilterDebounced();
    };

    const onPageChangeDebounced = debounce(onFilter, 250);
    const onPageChange = () => {
        onPageChangeDebounced();
    };

    return (
        <WorkScreen>
            <CategoryList name={name} onItemSelect={onFilter} />
            <div className="content_wrapper card bg-light p-2">
                <ProductSearch onSearch={onSearch} name={name} />
                <div className="h-100">
                    <PaginationWrapper
                        name={name}
                        totalDocs={totalDocs}
                        onChange={onPageChange}
                    >
                        <ProductLoader>
                            <ProductTable
                                name={name}
                                products={docs}
                                onSort={handleSort}
                                onAdd={addToBasket}
                            />
                        </ProductLoader>
                    </PaginationWrapper>
                </div>
            </div>
        </WorkScreen>
    );
};

export default ProductListPage;

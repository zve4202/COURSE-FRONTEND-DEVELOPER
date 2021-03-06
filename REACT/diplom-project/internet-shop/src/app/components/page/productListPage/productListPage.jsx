import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import ProductTable from "./table/productTable";
import { loadCategories } from "../../../store/categories";
import { loadProducts } from "../../../store/products";
import ProductSearch from "./productSearch";
import ProductLoader from "./productLoader";
import CategoryList from "./productCategory";
import { updateSetting } from "../../../store/setting";
import WorkScreen from "../../common/wrappers/workScreen";
import PaginationWrapper from "../../common/pagination";

const ProductListPage = () => {
    const name = "product";
    const dispatch = useDispatch();

    const { docs, totalDocs } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(loadCategories());
        dispatch(loadProducts());
    }, []);

    const addToBasket = (id) => {
        console.log(id);
    };

    const clearFilter = () => {
        dispatch(
            updateSetting(name, {
                query: {
                    search: ""
                }
            })
        );

        dispatch(loadProducts());
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
                <div className="d-flex mb-3 align-text-bottom">
                    <div
                        className="btn btn-secondary me-2 text-nowrap"
                        onClick={clearFilter}
                    >
                        Очистить фильтр
                    </div>
                    <ProductSearch onSearch={onSearch} name={name} />
                </div>

                <div className="card-body d-flex align-content-center justify-content-between mb-3">
                    <span>Функции сортировки по стоимости</span>
                </div>
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

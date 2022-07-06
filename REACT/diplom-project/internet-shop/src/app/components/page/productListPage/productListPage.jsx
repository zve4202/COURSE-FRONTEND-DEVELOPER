import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { pageSize } from "../../../config.json";

import ProductTable from "../../ui/products";
import Pagination from "../../common/pagination/pagination";
import { paginate } from "../../../utils/paginate";
import { getCategories, loadCategories } from "../../../store/categories";
import {
    clearSeachParams,
    getProducts,
    loadProducts
} from "../../../store/products";
import ProductSearch from "./productSearch";
import ProductLoader from "./productLoader";
import CategoryList from "./productCategory";
import WorkScreenWithSearch from "../../ui/workScreenWithSearch";

const ProductListPage = () => {
    const dispatch = useDispatch();

    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());

    useEffect(() => {
        dispatch(loadCategories());
        dispatch(loadProducts());
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({
        path: "title.artist.name",
        order: "asc"
    });

    const handleDelete = (productId) => {
        console.log(productId);
    };

    const clearFilter = () => {
        dispatch(clearSeachParams());
        dispatch(loadProducts());
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const onFilter = () => {
        dispatch(loadProducts());
    };

    const onFilterDebounced = debounce(onFilter, 500);

    const onSearch = () => {
        onFilterDebounced();
    };

    const count = products.length;
    // const sortedUsers = _.orderBy(
    //     filteredProduct,
    //     [sortBy.path],
    //     [sortBy.order]
    // );
    // const productCrop = paginate(sortedUsers, currentPage, pageSize);
    const productCrop = paginate(products, currentPage, pageSize);

    return (
        <WorkScreenWithSearch
            seacher={<ProductSearch onSearch={onSearch} />}
            clearFilter={clearFilter}
        >
            <div className="mt-2">
                <div className="d-flex">
                    {categories && (
                        <div className="bg-light flex-column flex-shrink-0 me-3 h-100">
                            <CategoryList onItemSelect={onFilter} />
                        </div>
                    )}
                    <ProductLoader>
                        <div className="card mb-3">
                            <div className="card-body d-flex align-content-center justify-content-between">
                                <span>Функции сортировки по стоимости</span>
                            </div>
                        </div>
                        <div className="h-100">
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                    name="product"
                                />
                            </div>
                            <ProductTable
                                products={productCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onAdd={handleDelete}
                            />
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                    name="product"
                                />
                            </div>
                        </div>
                    </ProductLoader>
                </div>
            </div>
        </WorkScreenWithSearch>
    );
};

export default ProductListPage;

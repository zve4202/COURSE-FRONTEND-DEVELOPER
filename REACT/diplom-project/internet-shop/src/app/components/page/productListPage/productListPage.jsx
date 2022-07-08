import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import ProductTable from "../../ui/products";
import Pagination from "../../common/pagination/pagination";
import { loadCategories } from "../../../store/categories";
import { loadProducts } from "../../../store/products";
import ProductSearch from "./productSearch";
import ProductLoader from "./productLoader";
import CategoryList from "./productCategory";
import WorkScreenWithSearch from "../../ui/workScreenWithSearch";
import { updateSetting } from "../../../store/setting";

const ProductListPage = () => {
    const name = "product";
    const dispatch = useDispatch();

    const { docs, totalDocs } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(loadCategories());
        dispatch(loadProducts());
    }, []);

    const [sortBy, setSortBy] = useState({
        path: "title.artist.name",
        order: "asc"
    });

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
    const handleSort = (item) => {
        setSortBy(item);
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

    // const count = products.length;
    // const sortedUsers = _.orderBy(
    //     filteredProduct,
    //     [sortBy.path],
    //     [sortBy.order]
    // );
    // const productCrop = paginate(sortedUsers, currentPage, pageSize);
    // const productCrop = paginate(products, currentPage, pageSize);

    return (
        <WorkScreenWithSearch
            seacher={<ProductSearch onSearch={onSearch} name={name} />}
            clearFilter={clearFilter}
        >
            <div className="mt-2">
                <div className="d-flex">
                    <CategoryList name={name} onItemSelect={onFilter} />

                    <div className="card w-100 h-100 p-2">
                        <div className="card-body d-flex align-content-center justify-content-between mb-3">
                            <span>Функции сортировки по стоимости</span>
                        </div>
                        <div className="h-100">
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    totalDocs={totalDocs}
                                    onPageChange={onPageChange}
                                    name={name}
                                />
                            </div>
                            <hr />
                            <ProductLoader>
                                <ProductTable
                                    products={docs}
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                                    onAdd={addToBasket}
                                />
                            </ProductLoader>
                            <hr />
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    totalDocs={totalDocs}
                                    onPageChange={onPageChange}
                                    name={name}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WorkScreenWithSearch>
    );
};

export default ProductListPage;

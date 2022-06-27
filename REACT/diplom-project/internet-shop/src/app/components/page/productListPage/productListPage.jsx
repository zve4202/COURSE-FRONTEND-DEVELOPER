import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import GroupList from "../../common/groupList";
import ProductTable from "../../ui/products";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import WorkScreenWithSearch from "../../ui/workScreenWithSearch";
import { getCategories, loadCategories } from "../../../store/categories";
import { getProducts, loadProducts } from "../../../store/products";
import { slugify } from "../../../utils";

const ProductListPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getCategories());
    const products = useSelector(getProducts());
    useEffect(() => {
        dispatch(loadCategories());
        dispatch(loadProducts());
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({
        path: "title.artist.name",
        order: "asc"
    });
    const pageSize = 1000;

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCat, setSelectedCat] = useState();
    const handleDelete = (productId) => {
        console.log(productId);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCat, searchQuery]);
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };
    const handleCategorySelect = (item) => {
        setSelectedCat(item);
    };
    const clearFilter = () => {
        setSearchQuery("");
        setSelectedCat();
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    function matched(arr) {
        const alias = slugify(searchQuery);
        return arr.some((item) => item.indexOf(alias) !== -1);
    }

    let filteredProduct = selectedCat
        ? products.filter(
              (prod) => prod.title.format.category === selectedCat._id
          )
        : products;

    filteredProduct = searchQuery
        ? filteredProduct.filter((prod) =>
              matched([prod.title.artist.alias, prod.title.alias])
          )
        : filteredProduct;

    const count = filteredProduct.length;
    const sortedUsers = _.orderBy(
        filteredProduct,
        [sortBy.path],
        [sortBy.order]
    );
    const productCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
        <WorkScreenWithSearch
            searchValue={searchQuery}
            onSearch={handleSearchQuery}
            clearFilter={clearFilter}
        >
            <div className="mt-2">
                <div className="d-flex">
                    {categories && (
                        <div className="bg-light flex-column flex-shrink-0 me-3 h-100">
                            <GroupList
                                items={categories}
                                selectedItem={selectedCat}
                                onItemSelect={handleCategorySelect}
                            />
                        </div>
                    )}
                    <div className="d-flex flex-column w-100 h-100">
                        <div className="card mb-3">
                            <div className="card-body">
                                Функции сортировки по стоимости
                            </div>
                        </div>
                        <div className="h-100">
                            {count > 0 && (
                                // <div className="card-body">
                                <ProductTable
                                    products={productCrop}
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                                    onAdd={handleDelete}
                                />
                                // </div>
                            )}
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
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

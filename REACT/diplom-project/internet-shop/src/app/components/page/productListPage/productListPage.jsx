import React, { useEffect, useState } from "react";
import _ from "lodash";
import WorkScreenWithSearch from "../../ui/workScreenWithSearch";
import GroupList from "../../common/groupList";
import ProductTable from "../../ui/products";
import { useCategory } from "../../../hooks/useCategories";
import { useProduct } from "../../../hooks/useProduct";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";

const ProductListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({
        path: "catalog.artist",
        order: "asc"
    });
    const pageSize = 10;

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCat, setSelectedCat] = useState();
    const { categories } = useCategory();
    const { products } = useProduct();
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
        return arr.some(
            (item) =>
                item.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        );
    }

    let filteredProduct = selectedCat
        ? products.filter(
              (prod) => prod.catalog.format.category === selectedCat._id
          )
        : products;

    filteredProduct = searchQuery
        ? filteredProduct.filter((prod) =>
              matched([prod.catalog.artist, prod.catalog.title])
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
        >
            <div className="card mt-2 p-3">
                <div className="d-flex">
                    {categories && (
                        <div className="d-flex flex-column flex-shrink-0 me-3">
                            <button
                                className="btn btn-secondary mb-2"
                                onClick={clearFilter}
                            >
                                Очистить
                            </button>
                            <GroupList
                                items={categories}
                                selectedItem={selectedCat}
                                onItemSelect={handleCategorySelect}
                            />
                        </div>
                    )}
                    <div className="d-flex flex-column w-100">
                        <div className="card mb-3">
                            <div className="card-body">
                                Функции сортировки по стоимости
                            </div>
                        </div>
                        <div className="card h-100">
                            {count > 0 && (
                                <div className="card-body">
                                    <ProductTable
                                        products={productCrop}
                                        onSort={handleSort}
                                        selectedSort={sortBy}
                                        onAdd={handleDelete}
                                    />
                                </div>
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

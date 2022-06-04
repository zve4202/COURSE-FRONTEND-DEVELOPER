import React, { useState } from "react";
import MainScreen from "../../ui/mainScreen";
import categories from "../../../mockData/categories.json";
import GroupList from "../../common/groupList";

const ProductListPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCat, setSelectedCat] = useState();
    const handleSearchQuery = ({ target }) => {
        setSelectedCat(undefined);
        setSearchQuery(target.value);
    };
    const handleCategorySelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedCat(item);
    };
    const clearFilter = () => {
        setSelectedCat();
    };
    return (
        <MainScreen searchValue={searchQuery} onSearch={handleSearchQuery}>
            <div className="card mt-2 p-3">
                <div className="d-flex">
                    <div className="d-flex flex-column flex-shrink-0 me-3">
                        <GroupList
                            items={categories}
                            selectedItem={selectedCat}
                            onItemSelect={handleCategorySelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                    </div>
                    <div className="d-flex flex-column w-100">
                        <div className="card mb-3">
                            <div className="card-body">
                                Функции сортировки по стоимости
                            </div>
                        </div>
                        <div className="card h-100">
                            <div className="card-body">Список товара</div>
                        </div>
                    </div>
                </div>
            </div>
        </MainScreen>
    );
};

export default ProductListPage;

import React from "react"; // , { useEffect, useState }
import {
    useDispatch
    // , useSelector
} from "react-redux";
import { filterProducts } from "../../../store/products";
import debounce from "lodash.debounce";

const ProductSearch = () => {
    // const searchQuery = useSelector((state) => state.products.search.search);
    const dispatch = useDispatch();
    // const [searchChanged, setSearchChanged] = useState(false);
    // const [searchQuery, setSearchQuery] = useState("");
    const dispatchFilter = async (text) => {
        const search = {
            text
        };
        dispatch(filterProducts(search));
    };
    // useEffect(async () => {
    //     if (searchChanged) {
    //         setSearchChanged(false);
    //         await dispatchFilter();
    //     }
    // }, [searchChanged]);
    const handleSearchQuery = async ({ target }) => {
        console.log("handleSearchQuery");
        dispatchFilter(target.value);
        // setSearchQuery(target.value);
        // setSearchChanged(true);
    };

    const handleInputChangeDebounced = debounce(handleSearchQuery, 500);
    return (
        <div>
            <input
                type="search"
                name="searchQuery"
                placeholder="Поиск по названию..."
                className="form-control"
                onChange={handleInputChangeDebounced}
                // value={searchQuery}
            />
        </div>
    );
};

export default ProductSearch;

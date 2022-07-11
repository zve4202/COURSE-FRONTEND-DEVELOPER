import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import WorkScreen from "../../ui/workScreen";
import BasketLoader from "./basketLoader";
import BasketSidebar from "./basketSidebar";
import BasketTable from "./basketTable";
import { loadBasketEx } from "../../../store/basket";

const BasketPage = () => {
    const name = "basket";
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBasketEx());
    }, []);

    const { isLoading, error, basket } = useSelector((state) => state.basket);
    const { products, docs } = basket;

    const entities =
        isLoading || !products
            ? []
            : docs.map((doc) => {
                  const prod = products.find((prod) => prod._id === doc.id);
                  if (prod) return { ...prod, qty: doc.qty, price: doc.price };
                  return doc;
              });

    console.log("products", entities);
    const handleSort = () => {};
    const handleReload = () => {
        // dispatch(loadBasketEx());
    };

    return (
        <WorkScreen>
            <div className="d-flex">
                <BasketSidebar />
                <div className="content_wrapper card bg-light p-2">
                    <div className="h-100">
                        <BasketLoader
                            isLoading={isLoading}
                            error={error}
                            length={entities?.length}
                        >
                            <BasketTable
                                name={name}
                                products={entities}
                                onSort={handleSort}
                                onUpdate={handleReload}
                            />
                        </BasketLoader>
                    </div>
                </div>
            </div>
        </WorkScreen>
    );
};

export default BasketPage;

import React from "react";
import PropTypes from "prop-types";

import Table from "../../../common/table";
import ProductName from "./productName";
import ProductPicture from "../../../ui/productPicture";
// import AddButton from "./addButton";
import Barcode from "../../../ui/barcode";
import ProductPrice from "./productPrice";
import ProductQty from "./productQty";
// import ProductFormat from "./productFormat";

const ProductTable = ({ name, products, onSort, onAdd, ...rest }) => {
    const columns = {
        image: {
            class: "cover-small",
            component: (product) => (
                <ProductPicture size="small" picture={product.title.image} />
            )
        },
        add: {
            name: "Корзина",
            component: (product) => (
                <ProductQty
                    productId={product._id}
                    max={product.count}
                    price={product.price}
                />
            )
        },
        // add: {
        //     component: (product) => (
        //         <AddButton productId={product._id} onAdd={onAdd} />
        //     )
        // },
        price: {
            path: "price",
            name: "Цена",
            component: (product) => <ProductPrice price={product.price} />
        },
        name: {
            path: "name",
            name: "Наименоване",
            component: (product) => <ProductName data={product} />
        },
        format: {
            path: "format",
            name: "Формат",
            component: (product) => (
                <div className="small">{product.title.format.name}</div>
            )
        },
        barcode: {
            name: "Штрихкод",
            component: (product) => <Barcode barcode={product.title.barcode} />
        },
        label: {
            path: "label",
            name: "Лейбл",
            component: (product) => (
                <div className="small">{product.title.label.name}</div>
            )
        },
        origin: {
            path: "origin",
            name: "Страна",
            component: (product) => (
                <div className="small">{product.title.origin}</div>
            )
        },
        style: {
            path: "style",
            name: "Жанр",
            component: (product) => (
                <div className="small">{product.title.style}</div>
            )
        }
    };

    return (
        <Table name={name} onSort={onSort} columns={columns} data={products} />
    );
};

ProductTable.propTypes = {
    name: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};
export default ProductTable;

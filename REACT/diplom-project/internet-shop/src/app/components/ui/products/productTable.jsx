import React from "react";
import PropTypes from "prop-types";
import Table from "../../common/table";
import ProductName from "./productName";
import ProductPicture from "./productPicture";
import AddButton from "./addButton";
import Barcode from "./barcode";
// import ProductFormat from "./productFormat";

const ProductTable = ({ products, onSort, selectedSort, onAdd, ...rest }) => {
    const columns = {
        picture: {
            class: "cover-small",
            name: "Образ",
            component: (product) => (
                <ProductPicture size="small" picture={product.title.image} />
            )
        },
        name: {
            path: "title.artist.alias",
            name: "Наименоване",
            component: (product) => <ProductName data={product} />
        },
        format: {
            path: "title.format.name",
            name: "Формат",
            component: (product) => (
                <div className="small">{product.title.format.name}</div>
            )
        },
        barcode: {
            name: "Баркоде",
            component: (product) => <Barcode barcode={product.title.barcode} />
        },
        label: {
            path: "title.label.name",
            name: "Лейбл",
            component: (product) => (
                <div className="small">{product.title.label.name}</div>
            )
        },
        origin: {
            path: "title.origin",
            name: "Страна",
            component: (product) => (
                <div className="small">{product.title.origin}</div>
            )
        },
        price: {
            path: "price",
            name: "Цена",
            component: (product) => (
                <div className="text-nowrap">{product.price} руб.</div>
            )
        },
        add: {
            component: (product) => (
                <AddButton productId={product._id} onAdd={onAdd} />
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={products}
        />
    );
};

ProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired
};
export default ProductTable;

import React from "react";

const ProductTable = () => {
    return (
        <table className="table">
            <tbody>
                <tr className="d-flex">
                    <td className="p-1 cover-small">
                        <div className="media">
                            <div className="media-left">
                                <img
                                    className="media-object img-thumbnail cover-small"
                                    src="https://bridgenote.com/images/covers/41p6xPy8nAL._SL160_.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </td>
                    <td className="flex-grow-1">
                        <a className="text-muted" href="#">
                            AGNETTA FALTSKOG(ABBA)
                        </a>
                        <a href="#">10 AR MED AGNETHA</a>
                    </td>
                    <td className="p-1 text-right">
                        <span className="input-group-btn">
                            <button className="btn btn-sm btn-danger">
                                <span className="glyphicon glyphicon-shopping-cart" />
                                Купить
                            </button>
                        </span>
                    </td>
                </tr>
                <tr className="d-flex">
                    <td className="p-1 cover-small">
                        <div className="media">
                            <div className="media-left">
                                <img
                                    className="media-object img-thumbnail cover-small"
                                    src="https://bridgenote.com/images/covers/51MYZ14NW1L._SL160_.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </td>
                    <td className="flex-grow-1">Инфо</td>
                    <td className="p-1 text-right">
                        <span className="input-group-btn">
                            <button className="btn btn-sm btn-danger">
                                <span className="glyphicon glyphicon-shopping-cart" />
                                Купить
                            </button>
                        </span>
                    </td>
                </tr>
                <tr className="d-flex">
                    <td className="p-1 cover-small">
                        <div className="media">
                            <div className="media-left">
                                <img
                                    className="media-object img-thumbnail cover-small"
                                    src="https://bridgenote.com/images/covers/51%252BIiF6j6sL._SL160_.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </td>
                    <td className="flex-grow-1">Инфо</td>
                    <td className="p-1 text-right">
                        <span className="input-group-btn">
                            <button className="btn btn-sm btn-danger">
                                <span className="glyphicon glyphicon-shopping-cart" />
                                Купить
                            </button>
                        </span>
                    </td>
                </tr>
                <tr className="d-flex">
                    <td className="p-1 cover-small">
                        <div className="media">
                            <div className="media-left">
                                <img
                                    className="media-object img-thumbnail cover-small"
                                    src="https://bridgenote.com/images/covers/51m5UUOVrLL._SL160_.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </td>
                    <td className="flex-grow-1">Инфо</td>
                    <td className="p-1 text-right">
                        <span className="input-group-btn">
                            <button className="btn btn-sm btn-danger">
                                <span className="glyphicon glyphicon-shopping-cart" />
                                Купить
                            </button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ProductTable;

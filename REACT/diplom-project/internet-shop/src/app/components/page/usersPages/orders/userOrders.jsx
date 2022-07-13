import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../store/setting";

const UserOrders = () => {
    const dispatch = useDispatch();
    const name = "users";
    const menu = useSelector(
        (state) => state.setting.config[name].selectedMenu
    );

    const orderName = "orders";
    const selectedTab = useSelector(
        (state) => state.setting.config[orderName].selectedTab
    );

    const onItemSelect = (item) => {
        dispatch(
            updateSetting(orderName, {
                selectedTab: item
            })
        );
    };

    return (
        <div className="card">
            <div className="card-header">
                {menu && <i className={`bi ${menu.icon} me-2`}></i>}
                {menu && menu.name}
            </div>

            <div className="card-body">
                <div className="nav nav-tabs">
                    <div className="nav-item">
                        <span
                            className={classNames({
                                "nav-link": true,
                                active: selectedTab === "current"
                            })}
                            aria-current="page"
                            onClick={() => onItemSelect("current")}
                            role="button"
                        >
                            Текущие
                        </span>
                    </div>
                    <div className="nav-item">
                        <span
                            className={classNames({
                                "nav-link": true,
                                active: selectedTab === "archive"
                            })}
                            aria-current="page"
                            onClick={() => onItemSelect("archive")}
                            role="button"
                        >
                            Архив
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrders;

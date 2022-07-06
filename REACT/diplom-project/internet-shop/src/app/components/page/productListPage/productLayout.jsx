import React from "react";
import PropTypes from "prop-types";
import WorkScreen from "../../ui/workScreen";
import style from "./index.module.scss";

const ProductLayout = ({ seacher, catecoryPicker, clearFilter, children }) => {
    return (
        <WorkScreen>
            <div className={style.main_layout}>
                <div className={style.sidebar_wrapper}>
                    <a
                        className="btn btn-secondary btn-sm text-nowrap w-100"
                        onClick={clearFilter}
                    >
                        Очистить фильтр
                    </a>

                    <div className="w-100">{catecoryPicker}</div>
                </div>
                {/* <div className={style.sidebar_wrapper}>{catecoryPicker}</div> */}
                <div className={style.content_wrapper}>
                    <span className={style.header_wrapper}>{seacher}</span>
                    <section className={style.section_wrapper}>
                        {children}
                    </section>
                </div>
            </div>
        </WorkScreen>
    );
};

ProductLayout.propTypes = {
    seacher: PropTypes.node,
    catecoryPicker: PropTypes.node,
    clearFilter: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProductLayout;

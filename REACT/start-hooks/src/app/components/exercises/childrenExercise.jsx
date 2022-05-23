import React from "react";
import PropTypes from "prop-types";

import CollapseWrapper from "../common/collapse";
import NumWrapper from "./numWrapper";
const ChildrenExercise = () => {
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>
            <NumWrapper>
                <Component />
                <Component />
                <Component />
            </NumWrapper>
        </CollapseWrapper>
    );
};

const Component = ({ num }) => {
    const text = (num || "") + " Компонент списка";
    return <div>{text}</div>;
};
Component.propTypes = { num: PropTypes.number };

export default ChildrenExercise;

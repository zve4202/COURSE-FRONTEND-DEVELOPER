import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
function ProtectedRoute({ component: Component, children, ...rest }) {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                const { userId, edit } = props.match.params;
                if (edit && userId !== currentUser._id) {
                    return <Redirect to={`/users/${currentUser._id}/edit`} />;
                }

                return Component ? <Component {...props} /> : children;
            }}
        />
    );
}
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    match: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;

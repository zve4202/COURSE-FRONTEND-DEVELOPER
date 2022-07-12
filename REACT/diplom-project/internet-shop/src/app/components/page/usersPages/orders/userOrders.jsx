import { orderBy } from "lodash";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import OrdersList from ".";

const Comments = () => {
    // const { userId } = useParams();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        setOrders([]);
        // api.orders
        //     .fetchCommentsForUser(userId)
        //     .then((data) => setOrders(data));
    }, []);
    // const handleSubmit = (data) => {
    //     api.orders
    //         .add({ ...data, pageId: userId })
    //         .then((data) => setOrders([...orders, data]));
    // };
    const handleRemoveRoder = (id) => {
        console.log(id);
        // api.orders.remove(id).then((id) => {
        //     setOrders(orders.filter((x) => x._id !== id));
        // });
    };
    const sortedOrders = orderBy(orders, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <h2>Заказы покупателя</h2>
                </div>
            </div>
            {sortedOrders.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <OrdersList
                            orders={sortedOrders}
                            onRemove={handleRemoveRoder}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;

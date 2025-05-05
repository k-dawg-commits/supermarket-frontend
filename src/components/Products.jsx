import { useState, useEffect } from "react";
import Product from "./Product.jsx";
import useFetch from "../hooks/useFetch.js";
import Loader from "./Loader.jsx";

export default function Products() {
    const [products, setProducts] = useState([]);
    const { get, loading } = useFetch(
        "https://react-tutorial-demo.firebaseio.com/"
    );

    useEffect(() => {
        get("supermarket.json")
            .then((data) => {
                ["price_1RK1xsC6PucFJiQcsgMXqUYj", "price_1RK22pC6PucFJiQceWUohASF",
                    "price_1RK26BC6PucFJiQcHu5KLW7X", "price_1RK26uC6PucFJiQcHnmtgYEa"].forEach((priceId, i) => {
                    data[i].price_id = priceId;
                });
                console.log(data);
                setProducts(data);
            })
            .catch((error) => console.log("Could not load products", error));
    }, []);

    return (
        <div className="products-layout">
            <h1>Products</h1>
            <p>Take a look at our products</p>
            <div className="products-grid">
                {loading && <Loader />}
                {products.length !== 0 && products.map((product) => {
                    return (
                        <Product key={product.id} id={product.id} details={product} />
                    );
                })}
            </div>
        </div>
    );
}
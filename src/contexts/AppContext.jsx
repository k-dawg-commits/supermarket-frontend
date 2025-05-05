import {createContext, useEffect, useState} from "react"

const AppContext = createContext()

function AppProvider(props) {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart")
        return storedCart ? JSON.parse(storedCart) : []
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    function handleProductAdd(newProduct) {
        const existingProduct = cart.find((product) => product.id === newProduct.id);
        if (existingProduct) {
            const updatedCart = cart.map((product) => {
                if (product.id === newProduct.id) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    };
                }
                return product;
            });
            setCart(updatedCart);
        } else {
            setCart([...cart, {...newProduct, quantity: 1}]);
        }
    }

    function handleProductDelete(id) {
        const updatedCart = cart.filter((product) => product.id !== id);
        setCart(updatedCart);
    }

    function getCartCount() {
        return cart.reduce((total, product) => total + product.quantity, 0)
    }

    function getTotalPrice() {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    function getProductFromCart(id) {
        return cart.find((product) => product.id === id);
    }

    return <AppContext.Provider value={{cart, onProductAdd: handleProductAdd, onProductDelete: handleProductDelete, getCartCount, getTotalPrice, getProductFromCart}}>{props.children}</AppContext.Provider>
}

export {AppContext, AppProvider}
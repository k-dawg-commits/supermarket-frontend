import { useOutletContext } from "react-router-dom"
import Button from "./Button.jsx"
import { useContext } from "react"
import { AppContext } from "../contexts/AppContext.jsx"

export default function ProductDetailInfo() {
    const product = useOutletContext()
    const { onProductAdd } = useContext(AppContext)

    return (
        <>
            <p>
                {product.description} sold at <strong>${product.price}</strong> per piece.
            </p>
            <Button onClick={() => onProductAdd(product)}>${product.price}</Button>
        </>
    )
}
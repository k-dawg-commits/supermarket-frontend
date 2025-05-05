import {loadStripe} from "@stripe/stripe-js"
import Button from "./Button.jsx";
import {useContext} from "react";
import {AppContext} from "../contexts/AppContext.jsx";

export default function TestStripe() {
    const {cart} = useContext(AppContext)
    const stripeLoadedPromise = loadStripe(
        "pk_test_51RJz4yC6PucFJiQcYRrdZR1pxJhqEOBqN1QPBjrl4Fjnc2HQ4qgJBX1CSF8fNb5beWG8UyEvuv7Go3nsvpftAc09006odZRkKb")

    function handlePayButtonClick() {
        stripeLoadedPromise.then(stripe => {
            stripe.redirectToCheckout({
                lineItems: cart.map(product => ({price: product.price_id, quantity: product.quantity})),
                mode: "payment",
                successUrl: "http://localhost:5173/about",
                cancelUrl: "http://localhost:3000/"
            }).then(response => console.log(response.error))
                .catch(error => console.log(error))
        })
    }

    return <Button onClick={handlePayButtonClick}>Checkout</Button>
}
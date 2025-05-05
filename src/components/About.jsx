import ContactSection from "./ContactSection.jsx";
import {useEffect, useState} from "react";

export default function About() {
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetch("https://grocery-shop-be-wd22.onrender.com/test")
            .then(res => res.json())
            .then(data => console.log(data))
    }, [])
    return (
        <>
            <div className="about-layout">
                <div>
                    <h1>About Us</h1>
                    <p>
                        We started operations in 2020. We guarantee fresh produce.<br />
                        Save time by shopping on our app and we'll deliver the products right to your home. <br />
                        <em>We use Stripe to process your payment.</em>
                    </p>
                </div>
                <img src="https://res.cloudinary.com/dbfn5lnvx/image/upload/q_auto,w_550/v1607770215/react-tutorial/supermarket/about.jpg" height="275" width="183" className="rounded" alt="" />
            </div>
            <div className="contact-layout">
                <ContactSection message={message} onMessageChanged={setMessage} />
            </div>
        </>
    )
}

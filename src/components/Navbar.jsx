import { NavLink } from "react-router-dom";
import {useContext, useEffect, useState} from "react"
import {AppContext} from "../contexts/AppContext.jsx"
import Button from "./Button.jsx";

export default function Navbar() {
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const {getCartCount} = useContext(AppContext)
    const cartCount = getCartCount()

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches)
            setIsDarkTheme(true)
    }, []);

    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }, [isDarkTheme]);

    function handleThemeClick() {
        setIsDarkTheme(!isDarkTheme)
    }

    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-brand">
                SuperM
            </NavLink>
            <ul>
                <li className="nav-item">
                    <Button onClick={handleThemeClick} className="theme-switcher">{isDarkTheme ? "Light" : "Dark"}</Button>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "active" : ""} to="/">
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "active" : ""} to="/about">
                        About us
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "active" : ""} to="/products">
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
                        Cart ({cartCount})
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
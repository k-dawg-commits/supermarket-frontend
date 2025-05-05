// import {useContext} from "react"
// import {AppContext} from "../contexts/AppContext.jsx"
// import TestStripe from "./TestStripe.jsx";
//
// export default function Cart() {
//     const {cart, getTotalPrice} = useContext(AppContext)
//     const totalPrice = getTotalPrice()
//     console.log(cart)
//
//     return (
//         <div className="cart-layout">
//             <div>
//                 <h1>Your Cart</h1>
//                 {cart.length === 0 && (
//                     <p>You have not added any product to your cart yet.</p>
//                 )}
//                 {cart.length > 0 && (
//                     <>
//                         <table className="table table-cart">
//                             <thead>
//                             <tr>
//                                 <th width="25%" className="th-product">
//                                     Product
//                                 </th>
//                                 <th width="20%">Unit price</th>
//                                 <th width="10%">Quantity</th>
//                                 <th width="25%">Total</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {cart.map((product) => {
//                                 return (
//                                     <tr key={product.id}>
//                                         <td>
//                                             <img
//                                                 src={product.image}
//                                                 width="30"
//                                                 height="30"
//                                                 alt=""
//                                             />{" "}
//                                             {product.name}
//                                         </td>
//                                         <td>${product.price}</td>
//                                         <td>{product.quantity}</td>
//                                         <td>
//                                             <strong>${product.price * product.quantity}</strong>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                             </tbody>
//                             <tfoot>
//                             <tr>
//                                 <th colSpan="1"></th>
//                                 <th className="cart-highlight">
//                                     <TestStripe />
//                                 </th>
//                                 <th className="cart-highlight">Total</th>
//                                 <th className="cart-highlight">${totalPrice}</th>
//                             </tr>
//                             </tfoot>
//                         </table>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

import { useContext, useState } from "react"
import { AppContext } from "../contexts/AppContext.jsx"
import TestStripe from "./TestStripe.jsx"
import { Modal, Box, Typography, TextField, Button, Tabs, Tab, Paper, IconButton } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"

export default function Cart() {
    const { cart, getTotalPrice } = useContext(AppContext)
    const totalPrice = getTotalPrice()
    const [open, setOpen] = useState(false)
    const [tabValue, setTabValue] = useState(0)

    // Function to handle modal open
    const handleOpenModal = () => {
        setOpen(true)
    }

    // Function to handle modal close
    const handleCloseModal = () => {
        setOpen(false)
    }

    // Function to handle tab change
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    // Function to handle login form submission
    const handleLogin = (event) => {
        event.preventDefault()
        // Add login logic here
        console.log("Login submitted")
        handleCloseModal()
    }

    // Function to handle registration form submission
    const handleRegister = (event) => {
        event.preventDefault()
        // Add registration logic here
        console.log("Registration submitted")
        handleCloseModal()
    }

    return (
        <div className="cart-layout">
            <div>
                <h1>Your Cart</h1>
                {cart.length === 0 && <p>You have not added any product to your cart yet.</p>}
                {cart.length > 0 && (
                    <>
                        <table className="table table-cart">
                            <thead>
                            <tr>
                                <th width="25%" className="th-product">
                                    Product
                                </th>
                                <th width="20%">Unit price</th>
                                <th width="10%">Quantity</th>
                                <th width="25%">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart.map((product) => {
                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <img src={product.image || "/placeholder.svg"} width="30" height="30" alt="" /> {product.name}
                                        </td>
                                        <td>${product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <strong>${product.price * product.quantity}</strong>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                            <tfoot>
                            <tr>
                                <th colSpan="1"></th>
                                <th className="cart-highlight">
                                    <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mr: 2 }}>
                                        Checkout
                                    </Button>
                                    <TestStripe />
                                </th>
                                <th className="cart-highlight">Total</th>
                                <th className="cart-highlight">${totalPrice}</th>
                            </tr>
                            </tfoot>
                        </table>
                    </>
                )}
            </div>

            {/* Authentication Modal */}
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="authentication-modal"
                aria-describedby="authentication-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" component="h2">
                            {tabValue === 0 ? "Login" : "Register"}
                        </Typography>
                        <IconButton onClick={handleCloseModal} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Paper sx={{ mb: 2 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Login" />
                            <Tab label="Register" />
                        </Tabs>
                    </Paper>

                    {tabValue === 0 ? (
                        // Login Form
                        <form onSubmit={handleLogin}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                        </form>
                    ) : (
                        // Registration Form
                        <form onSubmit={handleRegister}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Register
                            </Button>
                        </form>
                    )}
                </Box>
            </Modal>
        </div>
    )
}
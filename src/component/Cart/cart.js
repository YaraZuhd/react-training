import NavigationBar from "../NavigationBar/NavigationBar";
//import jwt_decode from 'jwt-decode';
import { useEffect, useState, useCallback } from 'react';
import "./cart.css"
import Navbar from "../NavResponsive/Navbar";
const Cart = () => {

    const [cart, setCart] = useState({});
    const [userData, setUserData] = useState({});


    let token = "";
    //let decoded;
    if(localStorage.getItem('token') != null){
      token = localStorage.getItem('token');
      //decoded = jwt_decode(token);
    }

    const fetchCart =  useCallback(async () => {
        try {
            const requestOptions = {
                headers: { 'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
                },
            };
            const response = await fetch(`http://localhost:3000/carts/me`, requestOptions)
            if(response.status === 200 && response.ok){
                const data = await response.json();
                setCart(data);
            }
            else {
                throw new Error("No Cart Found")
            }
         } catch(error) {
            console.log(error.message);
        }
    }, [token]);

    useEffect(()=>{
        setUserData(JSON.parse(localStorage.getItem('user')));
        fetchCart();
    },[]);


   return(
    <div>
        <Navbar/>
        <div className="cart">
            <div className="side-div"></div>
            <figure className="cart-info">
                <p className="title"><span className="username">{userData.firstname}</span> Cart</p>
                <figcaption className='desription'>Total Quentity : {cart.quentity}</figcaption>
                <figcaption className='price'>Total Price  : {cart.price}</figcaption>
                <figcaption className='status'>Cart Status : {cart.status}</figcaption>
            </figure>
        </div>
    </div>
   )
}

export default Cart;
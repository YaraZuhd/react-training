import NavigationBar from "../NavigationBar/NavigationBar";
//import jwt_decode from 'jwt-decode';
import { useEffect, useState, useCallback } from 'react';

const Cart = () => {

    const [cart, setCart] = useState({});
    const [userData, setUserData] = useState({});


    let token = "";
    //et decoded;
    if(localStorage.getItem('token') != null){
      token = localStorage.getItem('token');
      //decoded = jwt_decode(token);
    }

    const fetchUser =  useCallback(async () => {
        try {
            const requestOptions = {
                headers: { 'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
                },
            };
            const response = await fetch(`http://localhost:3000/users/me`, requestOptions)
            if(response.status === 200 && response.ok){
                const data = await response.json();
                setUserData(data);
            }
            else {
                throw new Error("Email or Password is invalid")
            }
         } catch(error) {
            console.log(error.message);
        }
    }, [token]);

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
        fetchCart();
        fetchUser();
    },[]);

    console.log(localStorage.getItem('user'));

   return(
    <div>
        <NavigationBar/>
        <div className="cart">
            <figure className="product">
                <p>{userData.firstname} Cart</p>
                <figcaption className='desription'>Quentity : {cart.quentity}</figcaption>
                <figcaption className='desription'>Price : {cart.price}</figcaption>
                <figcaption className='desription'>Status : {cart.status}</figcaption>
            </figure>
        </div>
    </div>
   )
}

export default Cart;
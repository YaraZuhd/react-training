import React from 'react'
import {useLocation} from 'react-router-dom';
import "./HighlightedProduct.css"
import { useEffect, useState, useCallback } from 'react';
import Navbar from '../NavResponsive/Navbar';


const HighlightedProduct = (props) =>{

    const location = useLocation();

    const [product, setProducts] = useState({});

    let token = "";

    if(localStorage.getItem('token') != null){
      token = localStorage.getItem('token');
    }

    const fetchProducts =  useCallback(async () => {
        try {
            const requestOptions = {
                headers: { 'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
                },
            };
            const response = await fetch(`http://localhost:3000/products/product/${location.state.id}`, requestOptions)
            if(response.status === 200 && response.ok){
                const data = await response.json();
                setProducts(data);
            }
            else {
                throw new Error("No Product Found")
            }
         } catch(error) {
            console.log(error.message);
        }
    }, [token,location.state.id]);

    useEffect(()=>{
        fetchProducts();
    },[fetchProducts]);

    return (
        <div>
            <Navbar/>
            {(product === {}) && <p>Loadding ... </p>}
            {product!== {} && <div>
                <figure className="product">
                    <p>{product.name}</p>
                    <figcaption className='desription'>{product.desription}</figcaption>
                    <figcaption className='price'>{product.price}</figcaption>
                    </figure>
            </div> }
        </div>
      );
};

export default HighlightedProduct;
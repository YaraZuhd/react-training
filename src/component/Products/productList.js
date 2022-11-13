import NavigationBar from "../NavigationBar/NavigationBar";
import { useEffect, useState, useCallback } from 'react';
import './productList.css'
import Product from "./Product";


const ProductList = () => {
    let token = "";
    const [productsData, setProductsData] = useState([]);
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
           const response = await fetch(`http://localhost:3000/products`, requestOptions)
           if(response.status === 200 && response.ok){
               const data = await response.json();
               setProductsData(data);
           }
           else {
               throw new Error("No Product Found")
           }
        } catch(error) {
           console.log(error.message);
       }
   },[token]);
 
    useEffect(()=>{
        fetchProducts();
    },[fetchProducts]);
    return(
        <div>
            <NavigationBar/>
            <ul className="list">
                {productsData.map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        desription = {product.desription}
                    ></Product>
                ))}
            </ul>
        </div>
    )
}

export default ProductList;
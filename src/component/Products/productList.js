import NavigationBar from "../NavigationBar/NavigationBar";
import { useEffect, useState, useCallback } from 'react';
import './productList.css'
import Product from "./Product";


// https://www.youtube.com/watch?v=mtQV5a-JEHo

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
            {/* <div>
                {productsData.map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        desription = {product.desription}
                    ></Product>
                ))}
            </div> */}
            <div className="div-container">
                <h2>Avalibale Products</h2>
                <div className="row row-cols-2">
                    {productsData.map((product) =>
                        <div className="col">
                            <Product
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                desription = {product.desription}
                            />
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default ProductList;
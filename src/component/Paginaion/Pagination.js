import React from "react";
import { Link } from "react-router-dom";

const PaginationProducts = ({totalProducts,productPerPage, paginateFunction})=>{
    console.log(totalProducts,productPerPage)
    const pageNumbers = [];
    for(let i = 1; i < Math.ceil(totalProducts/productPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        <nav style={{'backgroundColor' : 'transparent', 'height' : '100px', 'justifyContent':'center'}}>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <Link to={`/products`} className="page-link" onClick={()=> paginateFunction(number)}>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default PaginationProducts;
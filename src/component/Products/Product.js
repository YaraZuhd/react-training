import "./Product.css";
import { useNavigate } from 'react-router-dom';
import { FaCartPlus, FaEye  } from 'react-icons/fa';
import logo from '../../photo1.jpg';
// import 'bootstrap/dist/css/bootstrap.css'



const Product = (props) => {
  
  const navigate = useNavigate();

  const NavigateTo = () =>{
    navigate(`/products/${props.id}`,{state:{id:`${props.id}`}});
  }
    return (
          <div style={{width : "100%"}}>
                <div className="product-top column">
                  <img src={logo} alt="logo"/>
                  <div className="overlay">
                    <button type="button" className="btn btn-secondary view" title="View Detailes">
                      <FaEye onClick={NavigateTo}></FaEye>
                    </button>
                    <button type="button" className="btn btn-secondary add" title="Add To Cart">
                      <FaCartPlus></FaCartPlus>
                    </button>
                  </div>
                </div>
                <div className="product-bottom text-center row">
                  <h3 className="column">Name : {props.name}</h3>
                  <h5>Price : ${props.price}</h5>
            </div>
          </div>
        //   {/* <figure>
        //     <blockquote>
        //       <p>{props.name}</p>
        //     </blockquote>
        //     <figcaption>${props.price}</figcaption>
        //   </figure> */}
        //   {/* <a className='btn' onClick={NavigateTo} href="">View Fullscreen</a> */}
        // {/* </li> */}
      );
}

export default Product
import "./Product.css";
import { useNavigate } from 'react-router-dom';
import { FaCartPlus, FaEye  } from 'react-icons/fa';
import logo from '../../photo1.jpg';

// import 'bootstrap/dist/css/bootstrap.css';
// https://blog.logrocket.com/create-responsive-navbar-react-css/
// https://codesandbox.io/s/react-responsive-nav-3n3lu?file=/src/components/Navbar.js
// https://www.aleksandrhovhannisyan.com/blog/responsive-navbar-tutorial/
// https://stackoverflow.com/questions/47524680/css-single-column-media-query



const Product = (props) => {
  
  const navigate = useNavigate();

  const NavigateTo = () =>{
    navigate(`/products/${props.id}`,{state:{id:`${props.id}`}});
  }
    return (
          <div className="container" style={{display : 'flex'}}>
                <div className="product-top">
                  <img src={logo} alt="logo"/>
                  <div className="overlay">
                    <button type="button" className="btn btn-secondary" title="View Detailes">
                      <FaEye></FaEye>
                    </button>
                    <button type="button" className="btn btn-secondary" title="Add To Cart">
                      <FaCartPlus></FaCartPlus>
                    </button>
                  </div>
                </div>
                <div className="product-bottom text-center">
                  <h3>{props.name}</h3>
                  <h5>${props.price}</h5>
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
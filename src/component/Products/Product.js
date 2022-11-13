import "./Product.css"
import { useNavigate } from 'react-router-dom';

const Product = (props) => {
  
  const navigate = useNavigate();

  const NavigateTo = () =>{
    navigate(`/products/${props.id}`,{state:{id:`${props.id}`}});
  }
    return (
        <li className="item">
          <figure>
            <blockquote>
              <p>{props.name}</p>
            </blockquote>
            <figcaption>${props.price}</figcaption>
          </figure>
          <a className='btn' onClick={NavigateTo} href="">View Fullscreen</a>
          {/* <Link className='btn' to={{pathname :`/products/${props.id}`,state:`${props.id}`}}>View Fullscreen</Link> */}
        </li>
      );
}

export default Product
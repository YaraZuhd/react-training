import "./Product.css"
import { Link } from 'react-router-dom';

const Product = (props) => {
    return (
        <li className="item">
          <figure>
            <blockquote>
              <p>{props.name}</p>
            </blockquote>
            <figcaption>{props.desription}</figcaption>
          </figure>
          <Link className='btn' to={`/products/${props.id}`}>View Fullscreen</Link>
        </li>
      );
}

export default Product
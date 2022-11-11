import NavigationBar from "../NavigationBar/NavigationBar";
import "./HighlightedProduct.css"

const HighlightedProduct = (props) =>{
    console.log(props);
    return (
        <div>
            <NavigationBar/>
            <figure className="product">
            <p>{props.name}</p>
            <figcaption>{props.desription}</figcaption>
            </figure>
        </div>
      );
};

export default HighlightedProduct;
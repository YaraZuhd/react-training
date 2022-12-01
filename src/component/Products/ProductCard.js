import React, { useState } from 'react';
import './ProductCard.css';
import { Card, Image, Button, Icon, Input } from 'semantic-ui-react';

const ProductCard = (props) => {
    const [itemQuantity, setitemQuantity] = useState(1);

    const addProductToCart = async (productInfo, quantityNumber) => {
        try {
            const requestOptions = {
             method : 'PUT',
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({ items : [{id: productInfo.id, quantity: +quantityNumber, productName : productInfo.name}]}),
            };
            const response = await fetch(
              `http://localhost:3000/carts/add-product-to-cart`,
              requestOptions
            );
            if (response.status === 200 && response.ok) {
              const data = await response.json();
              console.log(data)
              localStorage.removeItem('cart');
              localStorage.setItem('cart', JSON.stringify(data));
            } else {
              throw new Error("No Found");
            }
          } catch (error) {
            console.log(error.message);
          }      
    }
    
    const handleButtonAddCart = e => {
        e.preventDefault();
        if(itemQuantity === 0 || itemQuantity < 0){
            alert('the quantity must be greater than 0');
        }else{
          addProductToCart(props.product, itemQuantity)
        }
    }
    return (
            <Card className='card'>
            <Image src='data:image/jpeg;base64,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' />
            <Card.Content>
                <Card.Header>{props.product.name}</Card.Header>
                <Card.Meta>$ {props.product.price}</Card.Meta>
                <Card.Description>{props.product.desription}</Card.Description>
                <div className='quanity-group'>
                    <Button
                        negative 
                        className='quan-buttons' 
                        onClick={() => {
                            setitemQuantity(itemQuantity -1)
                        }}
                    > 
                        <Icon name='minus' /> 
                    </Button>
                    <Input 
                        className='input-quanity inputQ'
                        value={itemQuantity} 
                    />
                    <Button
                        positive 
                        className='quan-buttons'
                        onClick={() => {
                            setitemQuantity(itemQuantity+1)
                        }}
                    > 
                        <Icon name='plus' /> 
                    </Button>
                </div>
                <Button fluid className='add-button' onClick={handleButtonAddCart}>
                    Add to Cart
                    <Icon name='arrow right' />
                </Button>
            </Card.Content>
        </Card>
    );
};

export default ProductCard;
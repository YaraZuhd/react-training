import React, { useContext } from 'react';
import { Item, Header, Button, Icon, Input } from 'semantic-ui-react';


const CartItems = (props) => {

    console.log(props.item.price);
    return (
        <>
            <Item.Content verticalAlign='middle'>
                <Item.Header>{props.item.productName}</Item.Header>
                <div className='quanity-group'>
                    <Button
                        negative 
                        className='quan-buttons' 
                        onClick={() => {
                            let newQuanity = props.item.quantity - 1
                            //helpFnc.subtractQuanity(props.item.id, newQuanity)
                        }}
                    > 
                        <Icon name='minus' /> 
                    </Button>
                    <Input 
                        className='input-quanity'
                        value={props.item.quantity} 
                    />
                    <Button
                        positive 
                        className='quan-buttons'
                        onClick={() => {
                            let newQuanity = props.item.quantity + 1
                            //helpFnc.addQaunity(props.item.id, newQuanity)
                        }}
                    > 
                        <Icon name='plus' /> 
                    </Button>
                </div>
                <Item.Extra className='item-total'>
                    <Header floated='right'>${props.item.price}</Header>
                </Item.Extra>
            </Item.Content>
        </>
    );

};

export default CartItems;
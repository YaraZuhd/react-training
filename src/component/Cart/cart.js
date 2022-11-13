import NavigationBar from "../NavigationBar/NavigationBar";

const Cart = () => {
    console.log(localStorage.getItem('user'));
   return(
    <div>
        <NavigationBar/>
    </div>
   )
}

export default Cart;
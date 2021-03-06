import React, { Component } from 'react';
import formatCurrency from '../util.js';
import Fade from 'react-reveal/Fade';
import {connect} from "react-redux";
import {removeFromCart} from '../action/productAction';

class Cart extends Component {
    constructor(){
    super();
    this.state={showCheckout:false,name:"",address:"",email:""
    }
    }
    handleInput=(event)=>{
      this.setState({[event.target.name]:event.target.value})
     
    }
    createOrder=(e)=>{
        e.preventDefault();
        const order={
            name:this.state.name,
            address:this.state.address,
            email:this.state.email
        };
        this.props.create(order);  
        console.log(order.name);
    };
    render() {
        const {cartItem}=this.props;
        // console.log(cartItem);
        return (
            <div>
                {cartItem.length===0?(<div className="cart cart-header">Cart is Empty</div>)
                :(<div className="cart cart-header">You have {cartItem.length} type of item in the cart</div>)}
                <div>
                    <div className="cart">
                    <Fade left cascade>
                     <ul className="cart-items">
                         {cartItem.map((item)=>
                         <li key={item._id}> 
                             <div>
                                 <img src={item.image} alt={item.title}></img>     
                             </div>
                             <div>
                               <div>{item.title}</div>
                               <div className="right">
                                   {formatCurrency(item.price)}x{item.count}{"  "} 
                                 <button onClick={()=>this.props.removeFromCart(item)}>Remove</button>
                               </div>
                             </div>
                         </li>
                         )} 
                     </ul>
                     </Fade>
                    </div>
                    <div>
                    {cartItem.length!==0 &&(
                        <div className="cart">
                         <div className="total">
                             <div>
                                 Total:{" "}
                                 {formatCurrency(cartItem.reduce((a,c)=>a+(c.price*c.count),0))}
                             </div>
                             <button onClick={()=>{this.setState({showCheckout:true})}}
                             className="button primary">Proceed</button>
                         </div>
                        </div>
                    )}
                    {this.state.showCheckout &&(
                        <Fade right cascade>
                        <div className="cart">
                            <form onSubmit={this.createOrder}>
                                <ul className="form-container">
                                    <li>
                                        <label>Email</label>
                                        <input name="email" type="email" required onChange={this.handleInput} ></input>
                                    </li> 
                                    <li>
                                        <label>Name</label>
                                        <input name="name" type="text" required onChange={this.handleInput}></input>
                                    </li> 
                                    <li>
                                        <label>Address</label>
                                        <input name="address" type="text" required onChange={this.handleInput}></input>
                                    </li> 
                                    <li>
                                    <button type="submit">Checkout</button>
                                    </li>
                                </ul>
                                
                            </form>
                        </div>
                        </Fade>
                    )}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    console.log(state);
    return{cartItem:state.cart.cartItems}
};
export default connect(mapStateToProps,{removeFromCart})(Cart)
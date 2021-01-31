import React from 'react';
import Products from './Component/Product';
import Filter from './Component/Filter';
import Cart from './Component/Cart';
import store from './store';
import {Provider} from 'react-redux';

class App extends React.Component{
    constructor(){
        super();
        this.state={
           
            cartItem:localStorage.getItem("cartItem")?JSON.parse(localStorage.getItem("cartItem")):[],
            size:"",
            sort:"" 
        };
    }
    create=(order)=>{
        alert("you are checking with",+order.name);
    };
    removeFromCart=(product)=>{
        const cartItem=this.state.cartItem;
        this.setState({cartItem:cartItem.filter((x)=>x._id!==product._id)})
        localStorage.setItem("cartItem",JSON.stringify(cartItem.filter((x)=>x._id!==product._id)));
    }
    addToCart=(product)=>{
        const cartItem=this.state.cartItem.slice();
        let alreadyInCart=false;
        cartItem.forEach((item)=>{
            if(item._id===product._id){
                item.count++;
                alreadyInCart=true;
            }
        });
        if(!alreadyInCart)
        {
            cartItem.push({...product,count:1});
        }
        this.setState({cartItem})
        localStorage.setItem("cartItem",JSON.stringify(cartItem));
    }; 
    
    
    render(){
    return(
    <Provider store={store}>
        <div className="grid-container">
        <header>
            <a href="/">React Shopping</a>
        </header> 
        <main>
            <div className="content">
            <div className="main">
                <Filter/>
                <Products addToCart={this.addToCart}/></div>

                <div className="sidebar">
                    <Cart 
                cartItem={this.state.cartItem}
                 removeFromCart={this.removeFromCart}
                 create={this.create}/> 
                 </div>
            </div>
        </main>
        <footer>All rights reserved</footer>
         </div>
         </Provider>);
    }
}
export default App;

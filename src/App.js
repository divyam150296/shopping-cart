import React from 'react';
import data from './data.json';
import Products from './Component/Product';
import Filter from './Component/Filter';
import Cart from './Component/Cart';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            products:data.products,
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
    sortProducts=(event)=>{
        const sort=event.target.value;
        console.log(event);
        this.setState((state)=>({
         sort:sort,
         products:state.products.slice()
         .sort((a,b)=>
            sort==="lowest"
            ?a.price>b.price
             ?1:-1
             :sort==="highest"
             ?a.price<b.price
             ?1:-1
            :a._id>b._id
            ?1:-1 
            ),
        }));
    }
    filterProducts=(event)=>{
        console.log(event);
        if (event.target.value==="")
    {
              this.setState({size:"",products:data.products})
    }
    else{
        this.setState({
            size:event.target.value,
            products:data.products.filter(product=>product.availableSize.indexOf(event.target.value)>=0)
        })
    }
    }
    
    render(){
    return<div className="grid-container">
        <header>
            <a href="/">React Shopping</a>
        </header> 
        <main>
            <div className="content">
            <div className="main">
                <Filter 
                count={this.state.products.length}
                sort={this.state.sort}
                size={this.state.size }
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
                />
                <Products products={this.state.products} 
                          addToCart={this.addToCart}/></div>

                <div className="sidebar">
                    <Cart 
                cartItem={this.state.cartItem}
                 removeFromCart={this.removeFromCart}
                 create={this.create}/> 
                 </div>
            </div>
        </main>
        <footer>All rights reserved</footer>
         </div>;
    }
}
export default App;

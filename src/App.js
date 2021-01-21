//feature1

import React from 'react';
import data from './data.json';
import Products from './Component/Product';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            product:data.products,
            size:"",
            sort:"" 
        }
    }
    render(){
    return<div className="grid-container">
        <header>
            <a href="/">React Shopping</a>
        </header>
        <main>
            <div className="content">
                <div className="main"><Products products={this.state.product}></Products>  </div>
                <div className="sidebar">Cart Items</div>
            </div>
        </main>
        <footer>All rights reserved</footer>
         </div>;
    }
}
export default App;

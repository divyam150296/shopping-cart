import React from 'react';
import Products from './Component/Product';
import Filter from './Component/Filter';
import Cart from './Component/Cart';
import store from './store';
import {Provider} from 'react-redux';

class App extends React.Component{
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
                <Products/></div>
                <div className="sidebar">
                    <Cart/> 
                 </div>
            </div>
        </main>
        <footer>All rights reserved</footer>
         </div>
         </Provider>);
    }
}
export default App;

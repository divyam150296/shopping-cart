import React, { Component } from 'react'
import formatCurrency from '../util.js';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

export default class Products extends Component {
   constructor(){
     super();
     this.state={
       product:null
     }
   }
   openModal=(product)=>{
    this.setState({product:product})
   }
   closeModal=()=>{
     this.setState({product:null})
   }
    render() {  
      const {product}=this.state;
        return (
            <div>
              <Fade bottom cascade>
              <ul className="products">
               {this.props.products.map((product)=>(
                 <li key={product._id}>
                   <div className="product">
                       <a href={"#"+product._id} onClick={()=>this.openModal(product)}> 
                           <img src={product.image} alt={product.title}></img>
                           <p>{product.title}</p>
                        </a>
                        <div className="product-price">
                          <div> {formatCurrency(product.price)} </div>
                          <button onClick={()=>this.props.addToCart(product)} className="button primary">Add to Cart</button>
                        </div>
                        </div>  
                 </li>  
               ))}
              </ul>
              </Fade>
              {product &&(
              <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button className="close-modal" onClick={this.closeModal}>X</button>
                <div className="product-detail">
                <img src={product.image} alt={product.title}></img>
                <div className="product-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    {product.description}
                  </p>
                  <p>
                    Available Size:
                    {product.availableSize.map((x)=>
                    <span>{" "}
                    <button className="button">{" "}{x}</button></span>)}
                  </p>
                  </div>
                  <div className="product-price">{formatCurrency(product.price)}
                  <button className="button primary" onClick={()=>{
                    this.props.addToCart(product);
                    this.closeModal();
                  }}>
                    Add to Cart
                  </button>
                  </div>
                </div>
              </Zoom>
              </Modal>)}
            </div>
        );
    }
}

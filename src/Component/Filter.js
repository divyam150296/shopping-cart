import React, { Component } from 'react';
import {connect} from 'react-redux';
import {filterProducts,sortProducts} from '../action/productAction';
 
class Filter extends Component {
  
    render() {
       console.log(this.props.filtered)
        return !this.props.filtered?<div>Loading..</div>:(
            <div className="filter">
                <div className="filter-result">{this.props.filtered.length} Products</div>
                <div className="filter-sort">Order{" "}
                <select onChange={(e)=>this.props.sortProducts(this.props.filtered,e.target.value)}>
                    <option>Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                    </select></div>
                <div className="filter-size">Size{" "}
                <select value={this.props.size}  onChange={(e)=>this.props.filterProducts(this.props.products,e.target.value)}>
                    <option value="">ALL</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>    
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    </select></div>    
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    console.log(state);
    return{
      products:state.products.items,
      size:state.products.size,
      filtered:state.products.filteredItems,
      sorts:state.products.sorts,
      
    };
  }

  export default connect(mapStateToProps,{filterProducts,sortProducts})(Filter) 
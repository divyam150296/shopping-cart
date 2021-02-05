import {FETCH_PRODUCTS,FETCH_PRODUCTS_BY_SIZE,FETCH_PRODUCTS_BY_PRICE,ADD_TO_CART,REMOVE_FROM_CART} from '../type';

export const fetchProducts=()=>async(dispatch)=>{
    const res=await fetch("/api/products");
    const data=await res.json();
    dispatch({
        type:FETCH_PRODUCTS,
        payload:data,
    });
}; 
export const filterProducts=(product,size)=>(dispatch)=>{
   dispatch({
       type:FETCH_PRODUCTS_BY_SIZE,
       payload:{
           size:size,
           items:
             size===""?product:product.filter((i)=>i.availableSize.indexOf(size)>=0)
       }
   });
};
export const sortProducts=(filterProducts,sort)=>(dispatch)=>{
    const sortedProduct=filterProducts.slice();
    if(sort===""){
        sortedProduct.sort((a,b)=>(a._id>b._id?1:-1));
    }
    else{
        sortedProduct.sort((a,b)=>
        sort==="lowest"?a.price>b.price?1:-1
        :a.price>b.price?-1:1
        )
    }
    dispatch({
        type:FETCH_PRODUCTS_BY_PRICE,
        payload:{
            sort:sort,
            items:sortedProduct
        }
    });                 
}

export const addToCart=(product)=>(dispatch,getState)=>{
      const cartItems=getState().cart.cartItems.slice();
      let alreadyExists=false;
      cartItems.forEach((i)=>{ 
          if(i._id===product._id){ 
              alreadyExists=true;
              i.count++
          }
      })
      if(!alreadyExists){
          cartItems.push({...product,count:1})
      }
      dispatch({
          type:ADD_TO_CART,
          payload:{cartItems}
      })
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
}
export const removeFromCart=(product)=>(dispatch,getState)=>{
    const cartItems=getState().cart.cartItems.slice().filter((x)=>x._id!==product._id);
    dispatch({
        type:REMOVE_FROM_CART,
        payload:{cartItems}
    })
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
}
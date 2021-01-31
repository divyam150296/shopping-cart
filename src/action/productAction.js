import {FETCH_PRODUCTS,FETCH_PRODUCTS_BY_SIZE,FETCH_PRODUCTS_BY_PRICE} from '../type';

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
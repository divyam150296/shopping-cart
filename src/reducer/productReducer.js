import { FETCH_PRODUCTS,FETCH_PRODUCTS_BY_SIZE,FETCH_PRODUCTS_BY_PRICE} from "../type";

export const productReducer=(state={},action)=>{
switch(action.type){
    case FETCH_PRODUCTS_BY_SIZE:return{...state,size:action.payload.size,filteredItems:action.payload.items};
    case FETCH_PRODUCTS_BY_PRICE:return{...state,sort:action.payload.sort,filteredItems:action.payload.items};
    case FETCH_PRODUCTS:return{items:action.payload,filteredItems:action.payload};
    default:return state;
}
}   
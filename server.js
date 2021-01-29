const express =require("express");
const bodyParser =require("body-parser");
const mongoose =require("mongoose");
const shortid =require("shortid");

const app=express();
//converted to json so that reesponse comes and get treated ad json file
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/react-shopping-cart-db",
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});
/*Creating Database*/
const Product=mongoose.model("product",
new mongoose.Schema({
    _id:{type:String,default:shortid.generate},
    title:String,
    description:String,
    image:String,
    price:Number,
    availableSize:[String]
}));
//getting list from Database
app.get("/api/products",async(req,res)=>{
    const products=await Product.find({});
    res.send(products)
})
//creating list and sending to database
app.post("/api/products",async(req,res)=>{
    const newProduct=new Product(req.body);
    const savedProduct=await newProduct.save();
    res.send(savedProduct);
})
//for Deleting Post
app.delete("/api/products/:id",async(req,res)=>{
    const deleteProduct=await Product.findByIdAndDelete(req.params.id);
    res.send(deleteProduct);
})
//Listen to port and Launch Server
const port=process.env.PORT||5000;
app.listen(port,()=>console.log("serve at http://localhost:5000"));
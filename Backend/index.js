const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://rathore:rathore@cluster0.emtgbjp.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("connected"))

app.get("/", (req, res) => {
    res.send("Express App is runing");
})

// Image storage 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    avilable: {
        type: Boolean,
        default: true,
    },

})

//  creating API for addproduct

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved")
    res.json({
        success: true,
        name: req.body.name,
    })
})

// deleteing product

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name
    })
})

// creating api for getting all product

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched")
    res.send(products)
})

// Shema createing for user model

const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

// Creating Endpoint for registration

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with same id" })
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })

})

//creating user login

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if(user) {
        const passcompare = req.body.password === user.password;
        if (passcompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({success:false,errors:"wrong id"});
    }
})


// creating endpoint for newcollection data
app.get('/newcollection', async(req,res)=>{
    let product = await Product.find({});
    let newcollection = product.slice(1).slice(-8);
    console.log("newcollection fetched")
    res.send(newcollection);
})

// creating end point for popular in women
app.get('/popular', async(req,res)=>{
   let product = await Product.find({category: "women"});
   let popular = product.slice(0,4);
   console.log("Popular in women fetch ");
   res.send(popular);
})

// creating middleware to fetch user

const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})

    }
    else{
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
    }
}

// Creating endpoint for adding products in cartdata

app.post("/addtocart", fetchUser, async (req,res)=>{
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData: userData.cartData})
    res.send("Added")
})

// Creating endpoint for remove products in cartdata

app.post("/removefromcart", fetchUser, async (req,res)=>{
    console.log("Remove", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData: userData.cartData})
    res.send("Remove")
})


//creating endpoint to get 

app.post('/getcart', fetchUser, async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})



app.post('/payment', fetchUser, async (req, res) => {
    const { amount, currency, paymentMethodId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            confirm: true,
        });

        // Update user's cart or order status here
        // For example: set order as paid, clear cart, etc.

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Payment failed' });
    }
});





app.listen(port, (error) => {
    if (!error) {
        console.log(`Server Running on Port: ${port}`);
    }
    else {
        console.log(error);
    }
})

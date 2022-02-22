const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()

const cors = require('cors');
const ObjectId = require('mongodb').ObjectId


app.use(cors());//eta na dile cors e error dibe

app.use(express.json());
const { MongoClient } = require('mongodb');



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b1ws8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);


async function run() {
    try {
        await client.connect();
        console.log('connected successfully');
        const database = client.db('potteryDb');
        const productsCollection = database.collection('products');
        const purchaseCollection = database.collection('purchase');



        //product---------
        app.get('/product', async (req, res) => {
            const cursor = productsCollection.find({});
            const result = await cursor.toArray();
            res.json(result);
        })


        //product find by id
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting product', id);
            const query = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(query);
            res.json(product)
        })





    } finally {

        //   await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!sjfksjfhkjhfiuerf')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
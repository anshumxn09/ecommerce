require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const router = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
}));
app.use(cors());
// all the routes of the server.
app.use('/users', router);
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRoutes'));

// connection to our database.
// const URI = process.env.MONGODB_URL;
mongoose.connect('mongodb://localhost:27017/ECOMWEB', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify:false,
    // useCreateIndex:true,
}, error => {
    if(error) throw error;
    console.log('connected to our database.')
});

app.get('/', (req, res) =>{
    res.json({
        message: "Anshuman Sharma"
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('server is running on port ', PORT);
})
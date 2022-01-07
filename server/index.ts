import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan';

import dotenv from 'dotenv'
dotenv.config();

import API from './routes/api'

const app = express();

app.use(bodyParser.json({limit: '500mb'}))
app.use(bodyParser.urlencoded({limit: '500mb', extended:false}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(morgan('dev'))

import './config/database'

// app.use((req, res) => {
//     const error = new Error('API not found!');
//     console.log(error.message)
//     res.status(404).json({
//         message: error.message,
//         status: 0
//     });
// });

app.use('/api', API);

const port = process.env.PORT || 8008;
app.listen(port, ()=>{
    console.log(`Sever is runing on port: ${port}`)
})
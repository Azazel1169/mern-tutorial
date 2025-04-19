import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';



dotenv.config()
const app = express()


app.get('/', (req,res) => {
    res.send('Hello World from the backend!')
})


app.use('/api/auth', authRoutes)


app.listen(3000, () => {
    connectDB()
    console.log('\n---Server is running on http://localhost:3000---\n');
})



const express=require('express');
const app=express();
const dotenv=require('dotenv')
const connection=require('./connection/db')
const userRouter=require('./routes/userRouter')
// const dashboardRouter=require('./routes/dashboardRouter')
const cors=require('cors')
const cookieParser=require('cookie-parser')

dotenv.config()

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(cors({origin:'http://localhost:3001',credentials: true}))

app.use(cookieParser()) 

app.use('/api/v1/user',userRouter)
// app.use('/api/v1/dashboard',dashboardRouter)
connection();

app.listen(process.env.PORT,()=>{
    console.log('Running on port ',process.env.PORT)
})
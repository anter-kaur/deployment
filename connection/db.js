const mongoose=require('mongoose');

const connection=()=>{
mongoose.connect('mongodb://localhost:27017/2nd-db-for-jwt')
.then(()=>{console.log('database connected successfully')})
.catch(()=>{console.log('error while connecting to database')})
}

module.exports=connection
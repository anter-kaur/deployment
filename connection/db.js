const mongoose=require('mongoose');

const connection=()=>{
mongoose.connect(process.env.URI)
.then(()=>{console.log('database connected successfully')})
.catch(()=>{console.log('error while connecting to database')})
}

module.exports=connection
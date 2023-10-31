const express=require('express');
const cors=require('cors');
const port=3001;
const app=express();
const bodyParser=require('body-parser');
const userRouter=require('./routing/registration');

app.use(express.json());
app.use(cors());
app.use('/user',userRouter);





app.listen(port,()=>{
    console.log(`server live at ${port}`)
})
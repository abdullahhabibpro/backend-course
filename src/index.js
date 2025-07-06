// require('dotenv').config({path: './env'});

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
});





/*

;(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error)=>{
            console.log("Application is not able not talk with db");
            throw error;
            
        })
        app.listen(process.env.PORT, ()=> {
            console.log(`App is listing on ${process.env.PORT}`);
        })

        
    }
    catch(error){
        console.error("ERROR: ", error)
        throw error;

    }
})()
    */

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is runnihg at port http://localhost ${process.env.PORT}`)
    }) // thrervis an assigment to add some code in case of error

})
.catch((err)=>{
    console.log("MONOGDB CONNECTON FIALED",err);
})


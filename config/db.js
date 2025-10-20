import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect("mongodb+srv://princess:Adegoke0520@cluster0.z7y5itb.mongodb.net/princess");
   
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.
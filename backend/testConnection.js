const mongoose = require("mongoose");

const uri = "mongodb+srv://bhushankor123459:hUx6mh1f0BzHnjK5@hire360ai.i9z23.mongodb.net/Hire360AI?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Atlas connection successful!"))
.catch(err => console.log("❌ MongoDB connection error:", err));

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bquote";

console.log(MONGO_URI)
exports.connect = () => {
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("MongoDB Connected");
        })
        .catch((err) => {
            console.log("mongodb connection failed")
            console.error(err)
        });
};

exports.disconnect = () => {
    mongoose.disconnect().then(() => {
        console.log("MongoDB Disconnected");
    });
};

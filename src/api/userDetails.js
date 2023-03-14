const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
    {
        user: String,
        email: String,
        pwd: String
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsScehma);
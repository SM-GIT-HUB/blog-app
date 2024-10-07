import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    title: String,
    username: String,
    description: String
})

const blogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);


export default blogModel
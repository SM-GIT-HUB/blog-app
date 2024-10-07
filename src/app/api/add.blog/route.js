import dbConnect from "@/db"
import blogModel from "@/db/models/blog.model"
import Joi from "joi";
import { NextResponse } from "next/server"

const blog = Joi.object({
    title: Joi.string().required(),
    username: Joi.string().required(),
    description: Joi.string().required()
})

export async function POST(req, res)
{
    let response = "";
    let status = "";

    try {
        await dbConnect();

        const { title, username, description } = await req.json();

        const { error } = blog.validate({
            title,
            username,
            description
        })

        if (error) {
            response = { error: "Please provide valid details" };
            status = 400;
            return;
        }

        const newBlog = await blogModel.create({
            title,
            username,
            description
        })

        if (newBlog) {
            response = { message: "Blog created" };
            status = 201;
            return;
        }
    }
    catch(err) {
        console.log("error in get.blog", err.message);
        response = { error: "Something went wrong" };
        status = 500;
    }
    finally {
        return NextResponse.json( response, { status } );
    }
}
import dbConnect from "@/db"
import blogModel from "@/db/models/blog.model"
import Joi from "joi"
import { NextResponse } from "next/server"

const valid = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

export async function PUT(req)
{
    let response = "";
    let status = "";

    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        const { title, description } = await req.json();

        const blog = await blogModel.findById(id);

        if (!blog)
        {
            response = { error: "Blog not found" };
            status = 404;
            return;
        }

        const { error } = valid.validate({
            title,
            description
        })

        if (error)
        {
            response = { error: "Please provide valid details" };
            status = 400;
            return;
        }

        blog.title = title;
        blog.description = description;

        await blog.save();

        response = { message: "Blog updated" };
        status = 201;
    }
    catch(err) {
        console.log("error in update.blog", err.message);
        response = { error: "Something went wrong" };
        status = 500;
    }
    finally {
        return NextResponse.json( response, { status } );
    }
}
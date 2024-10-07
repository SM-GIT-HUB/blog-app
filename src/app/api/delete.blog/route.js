import dbConnect from "@/db"
import blogModel from "@/db/models/blog.model"
import { NextResponse } from "next/server"

export async function DELETE(req)
{
    let response = "";
    let status = "";

    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);

        const blogId = searchParams.get("id");

        const blog = await blogModel.findByIdAndDelete(blogId);

        if (!blog)
        {
            response = { error: "Blog not found" };
            status = 404;
            return;
        }

        response = { message: "Blog deleted" };
        status = 200;
    }
    catch(err) {
        console.log("error in delete.blog", err.message);
        response = { error: "Something went wrong" };
        status = 500;
    }
    finally {
        return NextResponse.json( response, { status } );
    }
}
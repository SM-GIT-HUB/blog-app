import dbConnect from "@/db"
import blogModel from "@/db/models/blog.model"
import { NextResponse } from "next/server"


export async function POST()
{
    let response = "";
    let status = "";

    try {
        await dbConnect();

        let blogs = await blogModel.find().sort({ _id: -1 });
        
        if (!blogs)
        {
            response = { error: "Couldn't find blogs" };
            status = 400;
            return;
        }

        response = { message: "Ok", blogs };
        status = 200;
    }
    catch(err) {
        console.log("error in get.blogs", err.message);
        response = { error: "Something went wrong" };
        status = 500;
    }
    finally {
        return NextResponse.json( response, { status } );
    }
}
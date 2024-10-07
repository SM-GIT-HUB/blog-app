'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

function Blog({ blog, blogs, setBlogs }) {
    const router = useRouter();

    const [openDialog, setOpenDialog] = useState(false);
    const [form, setForm] = useState({ title: blog?.title, description: blog?.description });
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        setForm({ title: blog.title, description: blog.description });
    }, [blog])

    async function deleteBlog(id)
    {
        try {
            await axios.delete(`/api/delete.blog?id=${id}`);

            const newBlogs = blogs.filter((it) => {
                return (it._id != blog._id);
            })

            setBlogs(newBlogs);
            
            console.log("blog deleted");
            router.refresh();
        }
        catch(err) {
            console.log(err.message);
        }
    }

    async function editBlog()
    {
        try {
            setLoading(true);
            const response = await axios.put(`/api/update.blog?id=${blog._id}`, form);
            const data = response.data;

            const currBlog = data.blog;

            const newBlogs = blogs.map((it) => {
                if (it._id != currBlog._id) {
                    return it;
                }
                else
                    return currBlog;
            })

            setBlogs(newBlogs);

            console.log("blog updated");

            router.refresh();
        }
        catch(err) {
            console.log(err.message);
        }
        finally {
            setOpenDialog(false);
            setLoading(false);
        }
    }

  return (
    <div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Blog</DialogTitle>
                    <DialogDescription>
                        Write your blog here. Click Update when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Title
                    </Label>
                    <Input
                        name="title"
                        id="title"
                        placeholder="title"
                        className="col-span-3"
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                    />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Description
                    </Label>
                    <Input
                        name="description"
                        id="description"
                        placeholder="description"
                        className="col-span-3"
                        value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                    />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={editBlog} type="button">
                        {
                            loading? "Saving..." :
                            "Update"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Card className='p-2'>
            <CardHeader>
                @{blog.username}
            </CardHeader>
            <CardContent>
                <CardTitle className='mb-2'>
                    {blog.title}
                </CardTitle>
                <CardDescription>
                    {blog.description}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <div className='flex items-center justify-around w-full'>
                    <Button className='w-[100px]' onClick={() => setOpenDialog(true)}>Edit</Button>
                    <Button className='w-[100px]' onClick={() => deleteBlog(blog._id)}>Delete</Button>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Blog
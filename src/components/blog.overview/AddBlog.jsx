'use client'

import { Button } from "../ui/button"
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
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

function AddBlog({ blogs, setBlogs }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const formData = { title: "", username: "", description: "" };
    const [form, setForm] = useState(formData);

    const router = useRouter();

    async function handleSubmit()
    {
        try {
            setLoading(true);

            const response = await axios.post('/api/add.blog', form);

            const data = response.data;
            const blog = data.blog;

            console.log("Blog created");
            setBlogs([blog, ...blogs]);
        }
        catch(err) {
            console.log(err);
            setForm(formData);
        }
        finally {
            setLoading(false);
            setOpenDialog(false);
            setForm(formData);
        }
    }

  return (
    <>
        <div>
            <Button onClick={() => setOpenDialog(true)}>Add New Blog</Button>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Blog</DialogTitle>
                    <DialogDescription>
                    Write your blog here. Click create when you're done.
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
                        Username
                    </Label>
                    <Input
                        name='username'
                        id="username"
                        placeholder="username"
                        className="col-span-3"
                        value={form.username}
                        onChange={(e) => setForm({...form, username: e.target.value})}
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
                    <Button onClick={handleSubmit} type="button">
                        {
                            loading? "Saving..." :
                            "Create"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default AddBlog
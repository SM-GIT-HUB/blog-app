'use client'

import { useState, useEffect } from "react"
import AddBlog from "./AddBlog"
import Blog from "./Blog"
import { useRouter } from "next/navigation"
import axios from "axios"

function BlogOverview() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  async function fetchBlogs()
  {
    try {
      const response = await axios.post(`/api/get.blogs`);

      const data = response.data;

      setBlogs(data.blogs);
    }
    catch(err) {
      console.log(err.message);
      setBlogs([]);
    }
  }
  
  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <div className='min-h-screen flex flex-col gap-10 p-6'>
      <AddBlog blogs={blogs} setBlogs={setBlogs}/>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
        {
          blogs?.length > 0?
          blogs?.map((item, idx) => (
            <Blog key={idx} blog={item} blogs={blogs} setBlogs={setBlogs}/>
          )) :
          <div className='bg-[#ffffff3b] rounded-lg flex items-center justify-center'>
            <h1 className='text-[30px] font-bold'>No blog found <br /> Add yours now!</h1>
          </div>
        }
      </div>
    </div>
  )
}

export default BlogOverview
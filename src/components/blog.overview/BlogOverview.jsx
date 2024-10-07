import axios from "axios"
import AddBlog from "./AddBlog"
import Blog from "./Blog"

async function fetchBlogs()
{
  try {
    const apiURL = process.env.API_URL || "http://localhost:3000";
    const response = await axios.get(`${apiURL}/api/get.blogs`);

    const data = response.data;

    return data.blogs;
  }
  catch(err) {
    console.log(err.message);
    return [];
  }
}

async function BlogOverview() {
  const blogs = await fetchBlogs();

  return (
    <div className='min-h-screen flex flex-col gap-10 p-6'>
      <AddBlog/>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
        {
          blogs.length > 0?
          blogs.map((item, idx) => (
            <Blog key={idx} blog={item}/>
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
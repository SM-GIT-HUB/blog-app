import BlogOverview from '@/components/blog.overview/BlogOverview'
import BackButton from '@/components/buttons/BackButton'
import React from 'react'

function Blogs() {
  return (
    <div className='bg-gradient-to-r from-indigo-500 to-blue-700'>
      <BackButton/>
      <BlogOverview/>
    </div>
  )
}

export default Blogs
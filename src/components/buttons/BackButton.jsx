'use client'

import { useRouter } from "next/navigation"

function BackButton() {
    const router = useRouter();

    function back()
    {
        router.back();
    }

  return (
    <div className='p-2'>
      <button onClick={back} className='text-white px-2 py-[4px] bg-[#0303a9] border border-blue-600 rounded-[4px] hover:bg-[#0606be] transition-all'>
          <h1>{`<<`}</h1>
      </button>
    </div>
  )
}

export default BackButton
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-700 font-[family-name:var(--font-geist-sans)]">
      <div className='container mx-auto flex flex-col items-center justify-center'>
        <h2 className='text-4xl text-white font-bold mb-4'>Browse blogs</h2>

        <Link href='/blogs' className='bg-white text-sm text-[#1f1fb0] font-semibold py-2 px-6 rounded hover:bg-gray-100 border hover:border-blue-400 hover:shadow-lg transition-all'>See blogs</Link>
      </div>
    </div>
  );
}

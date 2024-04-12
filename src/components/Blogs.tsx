import { Link } from 'wouter';

function Blogs() {
  return (
    <div className='flex flex-col gap-1'>
      <h1 className='font-extrabold text-4xl mb-6'>Blogs</h1>
      <Link
        className='font-medium text-xl text-blue-800 hover:underline'
        href='/blog/2024-04-10-hello-world'
      >
        Hello, world!
      </Link>
      <Link
        className='font-medium text-xl text-blue-800 hover:underline'
        href='/blog/2024-04-11-i-want-to-make-a-blog'
      >
        I want to make a blog.
      </Link>
    </div>
  );
}

export { Blogs };

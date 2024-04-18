import { Link } from 'wouter';

function Posts() {
  return (
    <div className='flex flex-col gap-1'>
      <h1 className='font-extrabold text-4xl mb-6'>Posts</h1>
      <Link
        className='font-medium text-xl text-blue-800 hover:underline'
        href='blog/2024-04-17-styling-active-nav-links-with-wouter-and-tailwind-css'
      >
        Styling Active Nav Links with Wouter and Tailwind CSS
      </Link>
      <Link
        className='font-medium text-xl text-blue-800 hover:underline'
        href='blog/2024-04-16-lightweight-client-side-routing-with-wouter'
      >
        Lightweight Client Side Routing with Wouter
      </Link>
      <Link
        className='font-medium text-xl text-blue-800 hover:underline'
        href='/blog/2024-04-11-i-want-to-make-a-blog'
      >
        I want to make a blog
      </Link>
      <Link
        className='font-medium text-xl text-blue-800 hover:underline'
        href='/blog/2024-04-10-hello-world'
      >
        Hello, world!
      </Link>
    </div>
  );
}

export { Posts };

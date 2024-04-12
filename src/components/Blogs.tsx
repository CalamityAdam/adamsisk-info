import { Link } from 'wouter';

function Blogs() {
  return (
    <div className='flex flex-col'>
      <h1 className='font-extrabold text-2xl'>Blogs</h1>
      <Link href='/blog/2024-04-10-hello-world'>Hello, world!</Link>
    </div>
  );
}

export { Blogs };

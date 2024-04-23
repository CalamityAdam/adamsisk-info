function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen px-4 sm:px-6 max-w-7xl mx-auto'>
      {children}
    </div>
  );
}

export { Layout };

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen px-6 sm:px-14 max-w-7xl mx-auto'>
      {children}
    </div>
  );
}

export { Layout };

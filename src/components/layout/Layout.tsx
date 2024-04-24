function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-7xl w-[calc(100vw-32px)] sm:-[calc(100vw-48px)] mx-auto flex flex-col h-screen'>
      {children}
    </div>
  );
}

export { Layout };

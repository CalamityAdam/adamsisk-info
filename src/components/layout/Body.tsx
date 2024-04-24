function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-1 flex w-full items-center justify-center'>
      {children}
    </div>
  );
}

export { Body };

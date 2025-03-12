export const SitePage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className='relative h-[-webkit-fill-available] overflow-auto'>
      {children}
    </div>
  );
};

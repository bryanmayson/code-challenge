import { TID_SITE } from "@/_tests/testIds";

export const SitePage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      data-testid={TID_SITE.PAGE}
      className='relative h-[-webkit-fill-available] overflow-auto'
    >
      {children}
    </div>
  );
};

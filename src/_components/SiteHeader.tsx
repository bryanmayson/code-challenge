import { cn } from "@/_lib/utils";

export const SiteHeader: React.FC = () => {
  return (
    <div className='bg-amber-50'>
      <div
        className={cn(
          "flex max-w-4xl mx-auto p-5",
          "text-lg uppercase font-semibold"
        )}
      >
        Broccoli & Co.
      </div>
    </div>
  );
};

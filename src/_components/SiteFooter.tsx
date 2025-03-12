import { cn } from "@/_lib/utils";
import { TID_SITE } from "@/_tests/testIds";

export const SiteFooter: React.FC = () => {
  return (
    <div data-testid={TID_SITE.FOOTER} className='bg-amber-50'>
      <div className={cn("max-w-4xl mx-auto p-5", "text-center space-y-2")}>
        <div className='italic text-sm'>Made with ♡ in Melbourne.</div>
        <div className='italic text-sm'>
          @ 2016 Broccoli & Co. All Rights reserved.
        </div>
      </div>
    </div>
  );
};

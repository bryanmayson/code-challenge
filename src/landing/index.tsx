import { cn } from "@/_lib/utils";
import { InviteButton } from "./_components/InviteModal/InviteButton";

const LandingPage: React.FC = () => {
  return (
    <div data-testid='landing-page' className='bg-red-200 min-h-full flex'>
      <div
        className={cn(
          "max-w-4xl mx-auto p-5 h-inherit",
          "flex flex-col items-center justify-center",
          "space-y-8"
        )}
      >
        <div data-testid='landing-page-title' className='text-7xl text-center'>
          A better way<br /> to enjoy every day.
        </div>
        <div data-testid='landing-page-desc'>
          Be the first to know when we launch.
        </div>
        <InviteButton />
      </div>
    </div>
  );
};

export default LandingPage;

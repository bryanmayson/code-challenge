import { ServerCrash } from "lucide-react";

export const ErrorBoundaryDisplay: React.FC = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center gap-2'>
      <ServerCrash />
      <div>Oh no! An unexpected error has crashed the app.</div>
    </div>
  );
};

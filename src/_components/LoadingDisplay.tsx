import { Loader2 } from "lucide-react";

export const LoadingDisplay: React.FC = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center gap-2 bg-amber-50'>
      <Loader2 className='animate-spin' />
      <div>Loading...</div>
    </div>
  );
};

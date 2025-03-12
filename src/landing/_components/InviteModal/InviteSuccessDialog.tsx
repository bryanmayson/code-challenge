import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/_components/shadcn-ui/dialog";
import { useInviteModalContext } from "./_context/InviteModalProvider";
import { InviteModalState } from "./types";
import { Button } from "@/_components/shadcn-ui/button";
import { cn } from "@/_lib/utils";

export const InviteSuccessDialog: React.FC = () => {
  const { modalState, setModalState } = useInviteModalContext();

  const showDialog = modalState === InviteModalState.SUCCESS;

  return (
    <Dialog open={showDialog} onOpenChange={() => setModalState(undefined)}>
      <DialogContent className='md:max-w-md p-10'>
        <DialogHeader>
          <DialogTitle className='text-center italic'>All Done</DialogTitle>
          <div className='border-b-1 w-14 mx-auto mt-2' />
        </DialogHeader>

        <div className='text-center max-w-xs mx-auto text'>
          You will one of the first to experience Broccoli & Co. when we launch.
        </div>
        <Button
          className={cn("w-full cursor-pointer p-6 mt-4", "md:p-4")}
          onClick={() => setModalState(undefined)}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

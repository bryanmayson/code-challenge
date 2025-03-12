import { Button } from "@/_components/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/shadcn-ui/dialog";
import { InviteForm } from "./InviteForm";

export const InviteButton: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='cursor-pointer text-lg px-8 py-6'>
          Request an Invite
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center italic'>
            Request an Invite
          </DialogTitle>
          <div className='border-b-1 w-14 mx-auto mt-2' />
        </DialogHeader>
        <InviteForm />
      </DialogContent>
    </Dialog>
  );
};

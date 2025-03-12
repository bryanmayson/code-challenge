import { Button } from "@/_components/shadcn-ui/button";
import { InviteFormDialog } from "./InviteFormDialog";
import {
  InviteModalProvider,
  useInviteModalContext,
} from "./_context/InviteModalProvider";
import { InviteModalState } from "./types";
import { InviteSuccessDialog } from "./InviteSuccessDialog";
import { TID_LANDING_PAGE } from "@/_tests/testIds";

const InviteButtonContent: React.FC = () => {
  const { setModalState } = useInviteModalContext();
  return (
    <>
      <Button
        data-testid={TID_LANDING_PAGE.INVITE_BUTTON}
        variant='outline'
        className='cursor-pointer text-lg px-8 py-6'
        onClick={() => setModalState(InviteModalState.FORM)}
      >
        Request an Invite
      </Button>
      <InviteFormDialog />
      <InviteSuccessDialog />
    </>
  );
};

export const InviteButton: React.FC = () => {
  return (
    <InviteModalProvider>
      <InviteButtonContent />
    </InviteModalProvider>
  );
};

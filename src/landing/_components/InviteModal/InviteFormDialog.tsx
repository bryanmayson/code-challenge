import { Button } from "@/_components/shadcn-ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/_components/shadcn-ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/_components/shadcn-ui/dialog";
import { Input } from "@/_components/shadcn-ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/_lib/utils";
import { useInviteModalContext } from "./_context/InviteModalProvider";
import { InviteModalState } from "./types";
import { usePostRequestInvite } from "@/landing/_api/usePostRequestInvite";
import { AxiosError } from "axios";
import { TID_LANDING_PAGE } from "@/_tests/testIds";

const InviteFormSchema = z
  .object({
    name: z.string().min(3, {
      message: "Full name must be at least 3 characters.",
    }),
    email: z
      .string()
      .min(1, {
        message: "You must give an email address.",
      })
      .email("This is not a valid email."),
    confirm_email: z
      .string()
      .min(1, {
        message: "You must give an email address.",
      })
      .email("This is not a valid email."),
  })
  .refine((data) => data.email === data.confirm_email, {
    message: "Email does not match.",
    path: ["confirm_email"],
  });

type FormState = z.infer<typeof InviteFormSchema>;

const InviteForm: React.FC = () => {
  const { setModalState } = useInviteModalContext();
  const { mutateAsync, isPending, error } = usePostRequestInvite();

  const form = useForm<FormState>({
    resolver: zodResolver(InviteFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      confirm_email: "",
    },
  });

  const onSubmit = async (values: FormState) => {
    await mutateAsync({
      name: values.name,
      email: values.email,
    }).then(() => {
      setModalState(InviteModalState.SUCCESS);
    }).catch(() => {})
  };

  const axiosError = error as AxiosError<{ errorMessage: string }>;
  const errorMessage = axiosError?.response?.data.errorMessage || "";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col space-y-2'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input id='name' placeholder='Full name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input id='email' placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirm_email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input id='email' placeholder='Confirm email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className={cn("w-full cursor-pointer p-6 mt-4", "md:p-4")}
          disabled={isPending}
        >
          {isPending ? "Sending, please wait..." : "Send"}
        </Button>

        {errorMessage && (
          <div
            data-testid={TID_LANDING_PAGE.INVITE_SERVER_ERR}
            className='text-sm text-destructive'
          >
            {errorMessage}
          </div>
        )}
      </form>
    </Form>
  );
};

export const InviteFormDialog: React.FC = () => {
  const { modalState, setModalState } = useInviteModalContext();

  const showDialog = modalState === InviteModalState.FORM;

  return (
    <Dialog open={showDialog} onOpenChange={() => setModalState(undefined)}>
      <DialogContent
        data-testid={TID_LANDING_PAGE.INVITE_FORM}
        className='sm:max-w-[425px] p-10'
      >
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

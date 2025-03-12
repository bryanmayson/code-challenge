import { Button } from "@/_components/shadcn-ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/_components/shadcn-ui/form";
import { Input } from "@/_components/shadcn-ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/_lib/utils";

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

export const InviteForm: React.FC = () => {
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
    console.log(values);
  };

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
          variant='outline'
          className={cn("w-full cursor-pointer p-6 mt-4", "md:p-4")}
        >
          Send
        </Button>
      </form>
    </Form>
  );
};

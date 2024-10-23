import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";

const registerFromSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(16, "Username must be at most 16 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters or more"),
    repeatPassword: z
      .string()
      .min(8, "Password must be at least 8 characters or more"),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password does not match",
        path: ["repeatPassword"],
      });
    }
  });

const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    resolver: zodResolver(registerFromSchema),
    reValidateMode: "onSubmit",
  });

  const handleRegister = async (values) => {
    try {
      const userResponse = await axiosInstance.get("/users", {
        params: {
          username: values.username,
        },
      });

      if (userResponse.data.length) {
        alert("Username already exists");
        return;
      }

      await axiosInstance.post("/users", {
        username: values.username,
        password: values.password,
      });

      alert("Account created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="px-4 mx-auto container py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="w-full max-w-[450px]"
        >
          <Card>
            <CardHeader>
              <CardTitle>Create Account!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Username must be at least 3 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      Make sure your password is at least 8 characters & match
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                <Button disabled={!form.formState.isValid} type="submit">
                  Register
                </Button>
                <Button variant="link" className="w-full">
                  Log in instead
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default RegisterPage;

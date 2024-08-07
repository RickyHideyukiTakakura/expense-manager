import { registerUser } from "@/api/register-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  });

  async function handleSignUp(data: SignUpFormSchema) {
    try {
      await registerUserFn({
        name: data.name,
        email: data.email,
      });

      toast.success("Usuário cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch {
      toast.error("Erro ao cadastrar usuário");
    }
  }

  return (
    <div className="p-8">
      <Button className="absolute right-8 top-8" variant="ghost" asChild>
        <Link to="/sign-in">Fazer login</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>

          <p className="text-sm text-muted-foreground">
            Crie sua conta e gerencie seus gastos.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" type="text" {...register("name")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Finalizar cadastro
          </Button>

          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <a href="" className="underline underline-offset-4">
              termos de serviço
            </a>{" "}
            e{" "}
            <a href="" className="underline underline-offset-4">
              políticas de privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

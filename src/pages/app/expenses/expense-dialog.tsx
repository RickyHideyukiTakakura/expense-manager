import { createExpense } from "@/api/create-expense";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createExpenseBodySchema = z.object({
  description: z.string().min(1),
  category: z.string().min(1),
  payment: z.string().min(1),
  price: z.coerce.number(),
  createdAt: z.date().optional(),
});

type CreateExpenseBodySchema = z.infer<typeof createExpenseBodySchema>;

export function ExpenseDialog() {
  const [createdAt, setCreatedAt] = useState<Date | undefined>(new Date());

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateExpenseBodySchema>({
    resolver: zodResolver(createExpenseBodySchema),
  });

  const { mutateAsync: createExpenseFn } = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  async function handleCreateExpense(data: CreateExpenseBodySchema) {
    try {
      await createExpenseFn({
        description: data.description,
        category: data.category,
        payment: data.payment,
        price: data.price,
        createdAt,
      });

      toast.success("Despesa cadastrada com sucesso!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-primary-foreground text-primary hover:text-primary/80 dark:bg-primary dark:text-foreground dark:hover:bg-primary/80"
        >
          <Plus className="size-4" />
          <span className="text-sm">Adicionar</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova despesa</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateExpense)}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Input
              id="description"
              className="col-span-3"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categoria
            </Label>
            <Input
              id="category"
              className="col-span-3"
              {...register("category")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="payment" className="text-right">
              Método de pagamento
            </Label>
            <Input
              id="payment"
              className="col-span-3"
              {...register("payment")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input id="price" className="col-span-3" {...register("price")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Data</Label>
            <DatePicker date={createdAt} onDateChange={setCreatedAt} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

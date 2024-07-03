import { updateExpense } from "@/api/update-expense";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateExpenseBodySchema = z.object({
  description: z.string().min(1),
  category: z.string().min(1),
  payment: z.string().min(1),
  price: z.coerce.number(),
  createdAt: z.date().optional(),
});

type UpdateExpenseBodySchema = z.infer<typeof updateExpenseBodySchema>;

interface ExpenseDialogUpdateProps {
  id: string;
}

export function ExpenseDialogUpdate({ id }: ExpenseDialogUpdateProps) {
  const [createdAt, setCreatedAt] = useState<Date | undefined>();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateExpenseBodySchema>({
    resolver: zodResolver(updateExpenseBodySchema),
    defaultValues: {},
  });

  const { mutateAsync: updateExpenseFn } = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  async function handleUpdateExpense(data: UpdateExpenseBodySchema) {
    try {
      await updateExpenseFn({
        id,
        description: data.description,
        category: data.category,
        payment: data.payment,
        price: data.price,
        createdAt,
      });

      toast.success("Despesa atualizada com sucesso!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Atualizar despesa</DialogTitle>
      </DialogHeader>

      <form
        className="grid gap-4 py-4"
        onSubmit={handleSubmit(handleUpdateExpense)}
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
          <Input id="payment" className="col-span-3" {...register("payment")} />
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
            Atualizar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

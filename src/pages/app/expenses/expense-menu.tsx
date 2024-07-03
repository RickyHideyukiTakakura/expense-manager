import { deleteExpense } from "@/api/delete-expense";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { MoreHorizontal, Pencil, X } from "lucide-react";
import { toast } from "sonner";
import { ExpenseDialogUpdate } from "./expense-dialog-update";

interface ExpenseMenuProps {
  id: string;
}

export function ExpenseMenu({ id }: ExpenseMenuProps) {
  const { mutateAsync: deleteExpenseFn, isPending: isDeletingExpense } =
    useMutation({
      mutationFn: deleteExpense,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
      },
    });

  async function handleDeleteExpense(expenseId: string) {
    try {
      await deleteExpenseFn({
        id: expenseId,
      });

      toast.success("Despesa deletada com sucesso.");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <MoreHorizontal className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
              <Pencil className="size-4" />
              <span className="text-sm">Editar</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 focus:bg-destructive/70"
            onClick={() => handleDeleteExpense(id)}
            disabled={isDeletingExpense}
          >
            <X className="size-4" />
            <span className="text-sm">Excluir</span>
          </DropdownMenuItem>
        </DropdownMenuContent>

        <ExpenseDialogUpdate id={id} />
      </DropdownMenu>
    </Dialog>
  );
}

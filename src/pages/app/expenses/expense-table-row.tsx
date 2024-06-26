import { deleteExpense } from "@/api/delete-expense";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MoreHorizontal, Pencil, X } from "lucide-react";
import { toast } from "sonner";

interface ExpanseTableRowProps {
  expense: {
    id: string;
    description: string;
    category: string;
    payment: string;
    price: number;
    createdAt: string;
  };
}

export function ExpenseTableRow({ expense }: ExpanseTableRowProps) {
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
    <TableRow>
      <TableCell>{expense.description}</TableCell>
      <TableCell>{expense.category}</TableCell>
      <TableCell>{expense.payment}</TableCell>
      <TableCell>
        {expense.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>
        {format(expense.createdAt, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <MoreHorizontal className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
              <Pencil className="size-4" />
              <span className="text-sm">Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2 focus:bg-destructive/70"
              onClick={() => handleDeleteExpense(expense.id)}
              disabled={isDeletingExpense}
            >
              <X className="size-4" />
              <span className="text-sm">Excluir</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

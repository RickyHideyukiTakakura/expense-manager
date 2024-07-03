import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ExpenseMenu } from "./expense-menu";

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
        <ExpenseMenu id={expense.id} />
      </TableCell>
    </TableRow>
  );
}

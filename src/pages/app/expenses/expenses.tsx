import { getExpenses } from "@/api/get-expenses";
import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { ExpenseDialogCreate } from "./expense-dialog-create";
import { ExpenseFilters } from "./expense-filters";
import { ExpenseTableRow } from "./expense-table-row";
import { ExpenseTableRowSkeleton } from "./expense-table-row-skeleton";

export function Expenses() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = z.coerce.number().parse(searchParams.get("page") ?? "1");
  const description = searchParams.get("description");
  const category = searchParams.get("category");
  const payment = searchParams.get("payment");
  const createdAtParam = searchParams.get("createdAt") || undefined;

  const createdAt = createdAtParam ? new Date(createdAtParam) : undefined;

  const { data: result, isLoading: isLoadingExpenses } = useQuery({
    queryKey: [
      "expenses",
      pageIndex,
      description,
      category,
      payment,
      createdAt,
    ],
    queryFn: () =>
      getExpenses({
        pageIndex,
        description,
        category,
        payment,
        createdAt,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", pageIndex.toString());

      return state;
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Despesas</h1>

        <ExpenseDialogCreate />
      </div>

      <ExpenseFilters />

      <div className="space-y-2.5">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-80">Descrição</TableHead>
                <TableHead className="w-52">Categoria</TableHead>
                <TableHead className="w-60">Método de pagamento</TableHead>
                <TableHead className="w-36">Preço</TableHead>
                <TableHead className="w-44">Data</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoadingExpenses && <ExpenseTableRowSkeleton />}

              {result &&
                result.expenses.map((expense) => {
                  return <ExpenseTableRow key={expense.id} expense={expense} />;
                })}
            </TableBody>
          </Table>
        </div>

        {result && (
          <Pagination
            pageIndex={pageIndex}
            totalCount={result.totalItems}
            perPage={10}
            onPageChange={handlePaginate}
          />
        )}
      </div>
    </div>
  );
}

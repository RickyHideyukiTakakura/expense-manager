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
import { ExpenseDialog } from "./expense-dialog";
import { ExpenseFilters } from "./expense-filters";
import { ExpenseTableRow } from "./expense-table-row";
import { ExpenseTableRowSkeleton } from "./expense-table-row-skeleton";

export function Expenses() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = z.coerce.number().parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingExpenses } = useQuery({
    queryKey: ["expenses", pageIndex],
    queryFn: () =>
      getExpenses({
        pageIndex,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", pageIndex.toString());

      return state;
    });
  }

  console.log(result?.expenses);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Despesas</h1>

        <ExpenseDialog />
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

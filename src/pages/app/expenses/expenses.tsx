import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExpenseDialog } from "./expense-dialog";
import { ExpenseFilters } from "./expense-filters";
import { ExpenseTableRow } from "./expense-table-row";

export function Expenses() {
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
                <TableHead className="w-80">Título</TableHead>
                <TableHead className="w-52">Categoria</TableHead>
                <TableHead className="w-60">Método de pagamento</TableHead>
                <TableHead className="w-36">Preço</TableHead>
                <TableHead className="w-44">Data</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 20 }).map((_, i) => {
                return <ExpenseTableRow key={i} />;
              })}
            </TableBody>
          </Table>
        </div>

        <Pagination
          pageIndex={0}
          totalCount={0}
          perPage={0}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}

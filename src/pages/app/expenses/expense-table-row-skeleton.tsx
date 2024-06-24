import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

export function ExpenseTableRowSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[148px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[110px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[64px]" />
        </TableCell>

        <TableCell>
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <MoreHorizontal className="size-5" />
          </Button>
        </TableCell>
      </TableRow>
    );
  });
}

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export function ExpenseFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>

      <Input placeholder="Descrição" className="h-8 w-auto" />

      <Input placeholder="Categoria" className="h-8 w-[320px]" />

      <Input placeholder="Método de pagamento" className="h-8 w-[320px]" />

      <DatePicker />

      <Button type="submit" variant="secondary">
        <Search className="mr-2 size-4" />
        Filtrar resultados
      </Button>

      <Button type="button" variant="outline">
        <X className="mr-2 size-4" />
        Remover filtros
      </Button>
    </form>
  );
}

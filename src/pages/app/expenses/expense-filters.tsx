import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const expenseFilterSchema = z.object({
  description: z.string().optional(),
  category: z.string().optional(),
  payment: z.string().optional(),
  createdAt: z.date().optional(),
});

type ExpenseFilterSchema = z.infer<typeof expenseFilterSchema>;

export function ExpenseFilters() {
  const [date, setDate] = useState<Date | undefined>();

  const [searchParams, setSearchParams] = useSearchParams();

  const description = searchParams.get("description");
  const category = searchParams.get("category");
  const payment = searchParams.get("payment");
  const createdAt = searchParams.get("createdAt");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ExpenseFilterSchema>({
    resolver: zodResolver(expenseFilterSchema),
    defaultValues: {
      description: description ?? "",
      category: category ?? "",
      payment: payment ?? "",
      createdAt: createdAt ? new Date(createdAt) : undefined,
    },
  });

  function handleFilter(data: ExpenseFilterSchema) {
    setSearchParams((state) => {
      data.description
        ? state.set("description", data.description)
        : state.delete("description");

      data.category
        ? state.set("category", data.category)
        : state.delete("category");

      data.payment
        ? state.set("payment", data.payment)
        : state.delete("payment");

      date
        ? state.set("createdAt", date.toISOString())
        : state.delete("createdAt");

      return state;
    });
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete("description");
      state.delete("category");
      state.delete("payment");
      state.delete("createdAt");
      state.set("page", "1");

      return state;
    });

    reset({
      description: "",
      category: "",
      payment: "",
      createdAt: undefined,
    });
    setDate(undefined);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex flex-col gap-2 md:flex-row md:items-center"
    >
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        placeholder="Descrição"
        className="h-8 w-auto md:w-auto"
        {...register("description")}
      />

      <Input
        placeholder="Categoria"
        className="h-8 w-auto md:w-[320px]"
        {...register("category")}
      />

      <Input
        placeholder="Método de pagamento"
        className="h-8 w-auto md:w-[320px]"
        {...register("payment")}
      />

      <DatePicker
        className="h-8 w-auto"
        isSmall
        date={date}
        onDateChange={setDate}
      />

      <Button
        type="submit"
        variant="secondary"
        size="xs"
        disabled={isSubmitting}
      >
        <Search className="mr-2 size-4" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
      >
        <X className="mr-2 size-4" />
        Remover filtros
      </Button>
    </form>
  );
}

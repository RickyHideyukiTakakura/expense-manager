import { getProfile } from "@/api/get-profile";
import { signOut } from "@/api/sign-out";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export function AccountMenu() {
  const navigate = useNavigate();

  const { data: result, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
  });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in", {
        replace: true,
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {isLoadingProfile ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span>{result?.user.name}</span>
          )}

          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {isLoadingProfile ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span>{result?.user.name}</span>
          )}
          {isLoadingProfile ? (
            <Skeleton className="mt-1 h-4 w-40" />
          ) : (
            <span className="text-xs font-normal text-muted-foreground">
              {result?.user.email}
            </span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
          disabled={isSigningOut}
          className="text-rose-500 dark:text-rose-400"
        >
          <button className="w-full" onClick={() => signOutFn()}>
            <LogOut className="mr-2 size-4" />

            <span>Sair</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

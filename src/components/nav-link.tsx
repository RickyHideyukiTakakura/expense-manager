import { Link, LinkProps, useLocation } from "react-router-dom";

export interface NavLinkProps extends LinkProps {}

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      className="flex items-center gap-1.5 text-sm font-medium text-primary/70 hover:text-primary data-[current=true]:text-primary dark:text-muted-foreground dark:hover:text-foreground dark:data-[current=true]:text-foreground"
      data-current={pathname === props.to}
      {...props}
    />
  );
}

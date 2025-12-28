import { Link } from "react-router-dom";

interface BackLinkProps {
  to?: string;
  label?: string;
  className?: string;
}

export default function BackLink({
  to = "/",
  label = "← Back",
  className = "",
}: BackLinkProps) {
  return (
    <Link
      to={to}
      className={`text-lg text-blue-600 hover:underline cursor-pointer ${className}`}
    >
      {label}
    </Link>
  );
}

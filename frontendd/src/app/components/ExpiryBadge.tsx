import { Badge } from "./ui/badge";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface ExpiryBadgeProps {
  expiryTime: string;
  className?: string;
}

export function ExpiryBadge({ expiryTime, className }: ExpiryBadgeProps) {
  const expiryDate = new Date(expiryTime);
  const now = new Date();
  const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  let variant: "default" | "destructive" | "secondary" = "default";
  let icon = <Clock className="size-3" />;
  let label = "";
  let bgColor = "";

  if (hoursUntilExpiry < 0) {
    variant = "destructive";
    icon = <AlertTriangle className="size-3" />;
    label = "Expired";
    bgColor = "bg-red-500/10 text-red-600 border-red-200";
  } else if (hoursUntilExpiry < 4) {
    icon = <AlertTriangle className="size-3" />;
    label = `${Math.floor(hoursUntilExpiry)}h remaining`;
    bgColor = "bg-orange-500/10 text-orange-600 border-orange-200";
  } else if (hoursUntilExpiry < 12) {
    icon = <Clock className="size-3" />;
    label = `${Math.floor(hoursUntilExpiry)}h remaining`;
    bgColor = "bg-yellow-500/10 text-yellow-700 border-yellow-200";
  } else {
    icon = <CheckCircle className="size-3" />;
    label = `${Math.floor(hoursUntilExpiry)}h remaining`;
    bgColor = "bg-green-500/10 text-green-700 border-green-200";
  }

  return (
    <Badge variant={variant} className={`gap-1 ${bgColor} ${className}`}>
      {icon}
      <span className="text-xs">{label}</span>
    </Badge>
  );
}

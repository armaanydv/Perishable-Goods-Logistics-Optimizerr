import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  AlertTriangle, 
  Construction, 
  Truck, 
  X,
  Clock,
  MapPin
} from "lucide-react";

export interface Crisis {
  id: string;
  type: "traffic" | "breakdown" | "delay";
  severity: "low" | "medium" | "high";
  title: string;
  description: string;
  location: string;
  timestamp: string;
  vehicleId?: string;
}

interface CrisisAlertProps {
  crisis: Crisis;
  onDismiss?: (id: string) => void;
  onResolve?: (id: string) => void;
}

export function CrisisAlert({ crisis, onDismiss, onResolve }: CrisisAlertProps) {
  const getIcon = () => {
    switch (crisis.type) {
      case "breakdown":
        return <Truck className="size-5" />;
      case "traffic":
        return <Construction className="size-5" />;
      default:
        return <Clock className="size-5" />;
    }
  };

  const getSeverityColor = () => {
    switch (crisis.severity) {
      case "high":
        return "bg-red-500/10 border-red-500/50 text-red-700";
      case "medium":
        return "bg-orange-500/10 border-orange-500/50 text-orange-700";
      default:
        return "bg-yellow-500/10 border-yellow-500/50 text-yellow-700";
    }
  };

  const getSeverityBadge = () => {
    switch (crisis.severity) {
      case "high":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-500/10 text-orange-700 border-orange-200";
      default:
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <Alert className={`${getSeverityColor()} relative`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <AlertTitle className="flex items-center gap-2 mb-1">
              {crisis.title}
              <Badge className={getSeverityBadge()}>
                {crisis.severity.toUpperCase()}
              </Badge>
            </AlertTitle>
            {onDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="size-6 -mt-1 -mr-1"
                onClick={() => onDismiss(crisis.id)}
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
          <AlertDescription className="space-y-2">
            <p>{crisis.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="size-3" />
                <span>{crisis.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>{new Date(crisis.timestamp).toLocaleTimeString()}</span>
              </div>
              {crisis.vehicleId && (
                <Badge variant="outline" className="text-xs">
                  {crisis.vehicleId}
                </Badge>
              )}
            </div>
          </AlertDescription>
          {onResolve && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onResolve(crisis.id)}
              className="mt-2"
            >
              Mark as Resolved
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
}

interface CrisisAlertsListProps {
  crises: Crisis[];
  onDismiss?: (id: string) => void;
  onResolve?: (id: string) => void;
}

export function CrisisAlertsList({ crises, onDismiss, onResolve }: CrisisAlertsListProps) {
  if (crises.length === 0) {
    return (
      <Alert className="bg-green-50/50 border-green-200">
        <AlertTriangle className="size-4 text-green-600" />
        <AlertTitle className="text-green-700">All Systems Operational</AlertTitle>
        <AlertDescription className="text-green-600">
          No active crises or alerts at this time.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      {crises.map((crisis) => (
        <CrisisAlert
          key={crisis.id}
          crisis={crisis}
          onDismiss={onDismiss}
          onResolve={onResolve}
        />
      ))}
    </div>
  );
}

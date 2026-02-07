import { Card } from "../components/ui/card";
import { MapView } from "../components/MapView";
import { RouteList } from "../components/RouteList";
import { CrisisAlertsList, Crisis } from "../components/CrisisAlert";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Navigation, RefreshCw, Zap } from "lucide-react";

interface Donor {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  address: string;
  items: Array<{ name: string; quantity: number; expiry: string }>;
}

interface NGO {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  address: string;
}

interface Vehicle {
  id: string;
  name: string;
  driver: string;
  status: "active" | "idle" | "breakdown";
  location: { lat: number; lng: number };
  currentStop?: string;
  itemsOnBoard: number;
  lastUpdate: string;
}

interface RouteStop {
  id: string;
  type: "donor" | "ngo";
  name: string;
  address: string;
  items: Array<{ name: string; quantity: number; expiry: string }>;
  eta: string;
  status: "pending" | "in-progress" | "completed";
  distance: string;
}

interface LiveMapPageProps {
  donors: Donor[];
  ngos: NGO[];
  vehicles: Vehicle[];
  crises: Crisis[];
  route?: Array<{ lat: number; lng: number }>;
  routeStops: RouteStop[];
  onDismissCrisis?: (id: string) => void;
  onResolveCrisis?: (id: string) => void;
  onRefreshRoute?: () => void;
}

export function LiveMapPage({
  donors,
  ngos,
  vehicles,
  crises,
  route,
  routeStops,
  onDismissCrisis,
  onResolveCrisis,
  onRefreshRoute,
}: LiveMapPageProps) {
  const activeVehicle = vehicles.find(v => v.status === "active");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Navigation className="size-6 text-blue-600" />
            Live Route Tracking
          </h2>
          <p className="text-muted-foreground">Real-time vehicle location and route status</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500/10 text-green-700 border-green-200 px-4 py-2">
            <Zap className="size-4 mr-1" />
            Live Updates
          </Badge>
          <Button variant="outline" size="sm" onClick={onRefreshRoute}>
            <RefreshCw className="size-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Crisis Alerts */}
      {crises.length > 0 && (
        <CrisisAlertsList
          crises={crises}
          onDismiss={onDismissCrisis}
          onResolve={onResolveCrisis}
        />
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map - 2/3 width */}
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-300px)] min-h-[600px]">
            <MapView
              donors={donors}
              ngos={ngos}
              vehicles={vehicles}
              route={route}
            />
          </Card>
        </div>

        {/* Route Timeline - 1/3 width */}
        <div className="h-[calc(100vh-300px)] min-h-[600px]">
          <RouteList 
            stops={routeStops} 
            vehicleName={activeVehicle?.name || "Vehicle #1"}
          />
        </div>
      </div>
    </div>
  );
}

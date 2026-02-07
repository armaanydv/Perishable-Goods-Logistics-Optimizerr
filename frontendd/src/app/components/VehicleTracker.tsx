import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  AlertTriangle,
  Navigation 
} from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  driver: string;
  status: "active" | "idle" | "breakdown";
  location: {
    lat: number;
    lng: number;
  };
  currentStop?: string;
  itemsOnBoard: number;
  lastUpdate: string;
}

interface VehicleTrackerProps {
  vehicles: Vehicle[];
  onSelectVehicle?: (vehicleId: string) => void;
}

export function VehicleTracker({ vehicles, onSelectVehicle }: VehicleTrackerProps) {
  const getStatusBadge = (status: Vehicle["status"]) => {
    switch (status) {
      case "active":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "idle":
        return "bg-gray-500/10 text-gray-700 border-gray-200";
      case "breakdown":
        return "bg-red-500/10 text-red-700 border-red-200";
    }
  };

  const getStatusIcon = (status: Vehicle["status"]) => {
    switch (status) {
      case "active":
        return <Navigation className="size-3" />;
      case "idle":
        return <Clock className="size-3" />;
      case "breakdown":
        return <AlertTriangle className="size-3" />;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Truck className="size-5 text-blue-600" />
          Active Vehicles
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <Card 
                key={vehicle.id} 
                className={`border ${
                  vehicle.status === "breakdown" 
                    ? "border-red-200 bg-red-50/30"
                    : vehicle.status === "active"
                    ? "border-blue-200 bg-blue-50/30"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          {vehicle.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Driver: {vehicle.driver}
                        </p>
                      </div>
                      <Badge className={getStatusBadge(vehicle.status)}>
                        {getStatusIcon(vehicle.status)}
                        <span className="ml-1">{vehicle.status}</span>
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      {vehicle.currentStop && (
                        <div className="flex items-start gap-2">
                          <MapPin className="size-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            Current: <span className="text-foreground">{vehicle.currentStop}</span>
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Package className="size-4 text-gray-400 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Items on board: <span className="text-foreground font-medium">{vehicle.itemsOnBoard}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-gray-400 flex-shrink-0" />
                        <span className="text-muted-foreground text-xs">
                          Last update: {new Date(vehicle.lastUpdate).toLocaleTimeString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="size-3 flex-shrink-0" />
                        <span>
                          {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => onSelectVehicle?.(vehicle.id)}
                    >
                      <Navigation className="size-3 mr-1" />
                      View on Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

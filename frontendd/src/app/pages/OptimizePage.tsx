import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { MapView } from "../components/MapView";
import { RouteOptimizer } from "../components/RouteOptimizer";
import { VehicleTracker } from "../components/VehicleTracker";
import { RouteList } from "../components/RouteList";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Sparkles, TrendingUp, Clock, Navigation as NavIcon } from "lucide-react";

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

interface OptimizePageProps {
  donors: Donor[];
  ngos: NGO[];
  vehicles: Vehicle[];
  route?: Array<{ lat: number; lng: number }>;
  routeStops: RouteStop[];
  onOptimize?: (options: any) => void;
  onSelectVehicle?: (id: string) => void;
}

export function OptimizePage({
  donors,
  ngos,
  vehicles,
  route,
  routeStops,
  onOptimize,
  onSelectVehicle,
}: OptimizePageProps) {
  const [showResults, setShowResults] = useState(true);

  const handleOptimize = (options: any) => {
    setShowResults(true);
    onOptimize?.(options);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="size-6 text-purple-600" />
          Route Optimization
        </h2>
        <p className="text-muted-foreground">AI-powered route planning for maximum efficiency</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Optimizer & Results */}
        <div className="space-y-6">
          <RouteOptimizer onOptimize={handleOptimize} />
          
          {showResults && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="size-4 text-green-600" />
                  Optimization Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <NavIcon className="size-4 text-green-600" />
                      <span className="text-sm font-medium">Total Distance</span>
                    </div>
                    <Badge className="bg-green-500/10 text-green-700 border-green-300">
                      23.4 km
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-blue-600" />
                      <span className="text-sm font-medium">Est. Time</span>
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-700 border-blue-300">
                      1h 45m
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-purple-600" />
                      <span className="text-sm font-medium">Efficiency</span>
                    </div>
                    <Badge className="bg-purple-500/10 text-purple-700 border-purple-300">
                      94% optimal
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Route Summary</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 4 total stops</li>
                    <li>• 2 pickups, 2 dropoffs</li>
                    <li>• 3 critical items prioritized</li>
                    <li>• Traffic conditions considered</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          <VehicleTracker vehicles={vehicles} onSelectVehicle={onSelectVehicle} />
        </div>

        {/* Right Column - Map & Route */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-[500px]">
            <MapView
              donors={donors}
              ngos={ngos}
              vehicles={vehicles}
              route={route}
            />
          </Card>

          <RouteList stops={routeStops} />
        </div>
      </div>
    </div>
  );
}

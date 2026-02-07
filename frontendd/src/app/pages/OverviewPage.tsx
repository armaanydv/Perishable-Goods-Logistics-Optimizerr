import { Card } from "../components/ui/card";
import { Dashboard } from "../components/Dashboard";
import { CrisisAlertsList, Crisis } from "../components/CrisisAlert";
import { MapView } from "../components/MapView";
import { VehicleTracker } from "../components/VehicleTracker";
import { Bell } from "lucide-react";

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

interface OverviewPageProps {
  donors: Donor[];
  ngos: NGO[];
  vehicles: Vehicle[];
  crises: Crisis[];
  route?: Array<{ lat: number; lng: number }>;
  onDismissCrisis?: (id: string) => void;
  onResolveCrisis?: (id: string) => void;
  onSelectVehicle?: (id: string) => void;
}

export function OverviewPage({
  donors,
  ngos,
  vehicles,
  crises,
  route,
  onDismissCrisis,
  onResolveCrisis,
  onSelectVehicle,
}: OverviewPageProps) {
  const dashboardStats = {
    totalDonors: donors.length,
    totalNGOs: ngos.length,
    activeVehicles: vehicles.filter(v => v.status === "active").length,
    itemsInTransit: vehicles.reduce((sum, v) => sum + v.itemsOnBoard, 0),
    completedDeliveries: 24,
    criticalItems: 3,
    avgDeliveryTime: "42",
    efficiency: 94,
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Stats */}
      <Dashboard stats={dashboardStats} />

      {/* Crisis Alerts */}
      {crises.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="size-5 text-red-600" />
            Active Crises & Alerts
          </h3>
          <CrisisAlertsList
            crises={crises}
            onDismiss={onDismissCrisis}
            onResolve={onResolveCrisis}
          />
        </div>
      )}

      {/* Map Overview */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Network Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-[500px]">
              <MapView
                donors={donors}
                ngos={ngos}
                vehicles={vehicles}
                route={route}
              />
            </Card>
          </div>
          <VehicleTracker vehicles={vehicles} onSelectVehicle={onSelectVehicle} />
        </div>
      </div>
    </div>
  );
}

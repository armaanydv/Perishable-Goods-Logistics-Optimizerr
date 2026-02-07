import { useState } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Crisis } from "./components/CrisisAlert";
import { 
  LayoutDashboard, 
  Map, 
  Sparkles,
  Settings,
  Bell,
  Menu,
  X
} from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { OverviewPage, LiveMapPage, OptimizePage, ManagePage } from "./pages";

// Mock data
const initialDonors = [
  {
    id: "donor-1",
    name: "Grand Hotel Delhi",
    location: { lat: 28.6280, lng: 77.2200 },
    address: "Connaught Place, New Delhi",
    items: [
      { name: "Prepared Rice", quantity: 50, expiry: "2026-02-07T16:00:00" },
      { name: "Vegetable Curry", quantity: 30, expiry: "2026-02-07T15:30:00" },
    ],
  },
  {
    id: "donor-2",
    name: "Spice Garden Restaurant",
    location: { lat: 28.6100, lng: 77.2300 },
    address: "Karol Bagh, New Delhi",
    items: [
      { name: "Fresh Bread", quantity: 100, expiry: "2026-02-08T09:00:00" },
      { name: "Lentil Soup", quantity: 40, expiry: "2026-02-07T18:00:00" },
    ],
  },
  {
    id: "donor-3",
    name: "Medical Supplies Co.",
    location: { lat: 28.6300, lng: 77.2000 },
    address: "Rajendra Place, New Delhi",
    items: [
      { name: "Pain Relief Medicine", quantity: 200, expiry: "2026-02-07T14:00:00" },
      { name: "Bandages", quantity: 150, expiry: "2026-03-15T00:00:00" },
    ],
  },
];

const initialNGOs = [
  {
    id: "ngo-1",
    name: "Hope Foundation",
    location: { lat: 28.6400, lng: 77.2100 },
    address: "Paharganj Relief Center",
  },
  {
    id: "ngo-2",
    name: "Care & Share NGO",
    location: { lat: 28.6000, lng: 77.2400 },
    address: "Lajpat Nagar Distribution Center",
  },
];

const initialVehicles = [
  {
    id: "vehicle-1",
    name: "Vehicle #1 - VN-2345",
    driver: "Rajesh Kumar",
    status: "active" as const,
    location: { lat: 28.6200, lng: 77.2150 },
    currentStop: "Grand Hotel Delhi",
    itemsOnBoard: 8,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "vehicle-2",
    name: "Vehicle #2 - VN-2346",
    driver: "Amit Sharma",
    status: "idle" as const,
    location: { lat: 28.6050, lng: 77.2250 },
    itemsOnBoard: 0,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "vehicle-3",
    name: "Vehicle #3 - VN-2347",
    driver: "Ankit Meena",
    status: "breakdown" as const,
    location: { lat: 28.6150, lng: 77.2050 },
    currentStop: "Near Karol Bagh",
    itemsOnBoard: 5,
    lastUpdate: new Date().toISOString(),
  },
];

const mockRoute = [
  { lat: 28.6280, lng: 77.2200 }, // Donor 1
  { lat: 28.6100, lng: 77.2300 }, // Donor 2
  { lat: 28.6400, lng: 77.2100 }, // NGO 1
  { lat: 28.6000, lng: 77.2400 }, // NGO 2
];

const mockRouteStops = [
  {
    id: "stop-1",
    type: "donor" as const,
    name: "Grand Hotel Delhi",
    address: "Connaught Place, New Delhi",
    items: [
      { name: "Prepared Rice", quantity: 50, expiry: "2026-02-07T16:00:00" },
      { name: "Vegetable Curry", quantity: 30, expiry: "2026-02-07T15:30:00" },
    ],
    eta: "2:45 PM",
    status: "completed" as const,
    distance: "0 km",
  },
  {
    id: "stop-2",
    type: "donor" as const,
    name: "Spice Garden Restaurant",
    address: "Karol Bagh, New Delhi",
    items: [
      { name: "Fresh Bread", quantity: 100, expiry: "2026-02-08T09:00:00" },
      { name: "Lentil Soup", quantity: 40, expiry: "2026-02-07T18:00:00" },
    ],
    eta: "3:15 PM",
    status: "in-progress" as const,
    distance: "3.2 km",
  },
  {
    id: "stop-3",
    type: "ngo" as const,
    name: "Hope Foundation",
    address: "Paharganj Relief Center",
    items: [
      { name: "Prepared Rice", quantity: 50, expiry: "2026-02-07T16:00:00" },
      { name: "Vegetable Curry", quantity: 30, expiry: "2026-02-07T15:30:00" },
    ],
    eta: "3:45 PM",
    status: "pending" as const,
    distance: "5.8 km",
  },
  {
    id: "stop-4",
    type: "ngo" as const,
    name: "Care & Share NGO",
    address: "Lajpat Nagar Distribution Center",
    items: [
      { name: "Fresh Bread", quantity: 100, expiry: "2026-02-08T09:00:00" },
      { name: "Lentil Soup", quantity: 40, expiry: "2026-02-07T18:00:00" },
    ],
    eta: "4:20 PM",
    status: "pending" as const,
    distance: "9.1 km",
  },
];

const initialCrises: Crisis[] = [
  {
    id: "crisis-1",
    type: "breakdown",
    severity: "high",
    title: "Vehicle Breakdown",
    description: "Vehicle #3 (VN-2347) has experienced a mechanical failure near Karol Bagh. Backup vehicle dispatched.",
    location: "Karol Bagh, New Delhi",
    timestamp: new Date().toISOString(),
    vehicleId: "VN-2347",
  },
  {
    id: "crisis-2",
    type: "traffic",
    severity: "medium",
    title: "Heavy Traffic Alert",
    description: "Significant traffic congestion on route to Lajpat Nagar. ETA delayed by 15 minutes.",
    location: "Ring Road, South Delhi",
    timestamp: new Date().toISOString(),
  },
];

type Page = "overview" | "live-map" | "optimize" | "manage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("overview");
  const [donors, setDonors] = useState(initialDonors);
  const [ngos, setNGOs] = useState(initialNGOs);
  const [vehicles] = useState(initialVehicles);
  const [crises, setCrises] = useState(initialCrises);
  const [showRoute, setShowRoute] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAddDonor = (donor: any) => {
    setDonors([...donors, donor]);
  };

  const handleAddNGO = (ngo: any) => {
    setNGOs([...ngos, ngo]);
  };

  const handleDeleteDonor = (id: string) => {
    setDonors(donors.filter(d => d.id !== id));
    toast.success("Donor removed successfully");
  };

  const handleDeleteNGO = (id: string) => {
    setNGOs(ngos.filter(n => n.id !== id));
    toast.success("NGO removed successfully");
  };

  const handleDismissCrisis = (id: string) => {
    setCrises(crises.filter(c => c.id !== id));
  };

  const handleResolveCrisis = (id: string) => {
    setCrises(crises.filter(c => c.id !== id));
    toast.success("Crisis resolved successfully");
  };

  const handleOptimizeRoute = () => {
    setShowRoute(true);
    toast.success("Route optimized successfully!");
  };

  const handleSelectVehicle = (id: string) => {
    setCurrentPage("live-map");
    toast.info("Viewing vehicle on map");
  };

  const handleRefreshRoute = () => {
    toast.success("Route data refreshed");
  };

  const navItems = [
    { id: "overview" as Page, label: "Dashboard", icon: LayoutDashboard },
    { id: "live-map" as Page, label: "Live Map", icon: Map },
    { id: "optimize" as Page, label: "Optimize", icon: Sparkles },
    { id: "manage" as Page, label: "Manage", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Food & Medicine Rescue Network</h1>
                <p className="text-sm text-gray-600">Real-time Logistics Optimization</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "default" : "ghost"}
                      onClick={() => setCurrentPage(item.id)}
                      className="gap-2"
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>

              <div className="relative">
                <Button variant="outline" size="icon">
                  <Bell className="size-5" />
                </Button>
                {crises.length > 0 && (
                  <span className="absolute -top-1 -right-1 size-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {crises.length}
                  </span>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-2"
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {currentPage === "overview" && (
          <OverviewPage
            donors={donors}
            ngos={ngos}
            vehicles={vehicles}
            crises={crises}
            route={showRoute ? mockRoute : undefined}
            onDismissCrisis={handleDismissCrisis}
            onResolveCrisis={handleResolveCrisis}
            onSelectVehicle={handleSelectVehicle}
          />
        )}

        {currentPage === "live-map" && (
          <LiveMapPage
            donors={donors}
            ngos={ngos}
            vehicles={vehicles}
            crises={crises}
            route={showRoute ? mockRoute : undefined}
            routeStops={mockRouteStops}
            onDismissCrisis={handleDismissCrisis}
            onResolveCrisis={handleResolveCrisis}
            onRefreshRoute={handleRefreshRoute}
          />
        )}

        {currentPage === "optimize" && (
          <OptimizePage
            donors={donors}
            ngos={ngos}
            vehicles={vehicles}
            route={showRoute ? mockRoute : undefined}
            routeStops={mockRouteStops}
            onOptimize={handleOptimizeRoute}
            onSelectVehicle={handleSelectVehicle}
          />
        )}

        {currentPage === "manage" && (
          <ManagePage
            donors={donors}
            ngos={ngos}
            onAddDonor={handleAddDonor}
            onAddNGO={handleAddNGO}
            onDeleteDonor={handleDeleteDonor}
            onDeleteNGO={handleDeleteNGO}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Food & Medicine Rescue Network. Saving lives through optimized logistics.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                System Status: Operational
              </Badge>
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { 
  Sparkles, 
  Settings2, 
  MapPin, 
  Clock, 
  Package,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface RouteOptimizerProps {
  onOptimize?: (options: OptimizationOptions) => void;
  isOptimizing?: boolean;
}

interface OptimizationOptions {
  vehicleId: string;
  priorityMode: "expiry" | "distance" | "balanced";
  considerTraffic: boolean;
  maxStops: number;
}

export function RouteOptimizer({ onOptimize, isOptimizing = false }: RouteOptimizerProps) {
  const [vehicleId, setVehicleId] = useState("vehicle-1");
  const [priorityMode, setPriorityMode] = useState<"expiry" | "distance" | "balanced">("balanced");
  const [considerTraffic, setConsiderTraffic] = useState(true);
  const [maxStops, setMaxStops] = useState("10");

  const handleOptimize = () => {
    const options: OptimizationOptions = {
      vehicleId,
      priorityMode,
      considerTraffic,
      maxStops: parseInt(maxStops),
    };

    onOptimize?.(options);
    toast.success("Route optimization started!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-purple-600" />
          Route Optimization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vehicle Selection */}
        <div className="space-y-2">
          <Label htmlFor="vehicle">Select Vehicle</Label>
          <Select value={vehicleId} onValueChange={setVehicleId}>
            <SelectTrigger id="vehicle">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vehicle-1">Vehicle #1 - VN-2345</SelectItem>
              <SelectItem value="vehicle-2">Vehicle #2 - VN-2346</SelectItem>
              <SelectItem value="vehicle-3">Vehicle #3 - VN-2347</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Priority Mode */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Settings2 className="size-4" />
            Optimization Priority
          </Label>
          
          <div className="space-y-2">
            <Card 
              className={`cursor-pointer transition-all ${
                priorityMode === "expiry" 
                  ? "border-orange-500 bg-orange-50/50" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => setPriorityMode("expiry")}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`size-4 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                  priorityMode === "expiry"
                    ? "border-orange-500 bg-orange-500"
                    : "border-gray-300"
                }`}>
                  {priorityMode === "expiry" && (
                    <div className="size-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="size-4 text-orange-600" />
                    <span className="font-medium">Expiry Priority</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Prioritize items closest to expiration time
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${
                priorityMode === "distance" 
                  ? "border-blue-500 bg-blue-50/50" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => setPriorityMode("distance")}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`size-4 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                  priorityMode === "distance"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}>
                  {priorityMode === "distance" && (
                    <div className="size-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="size-4 text-blue-600" />
                    <span className="font-medium">Distance Priority</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Minimize total distance traveled
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${
                priorityMode === "balanced" 
                  ? "border-purple-500 bg-purple-50/50" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => setPriorityMode("balanced")}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`size-4 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                  priorityMode === "balanced"
                    ? "border-purple-500 bg-purple-500"
                    : "border-gray-300"
                }`}>
                  {priorityMode === "balanced" && (
                    <div className="size-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="size-4 text-purple-600" />
                    <span className="font-medium">Balanced Mode</span>
                    <Badge className="bg-purple-500/10 text-purple-700 border-purple-200">
                      Recommended
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Balance between expiry time and distance
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Additional Options */}
        <div className="space-y-4">
          <Label>Additional Options</Label>
          
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <Checkbox
              id="traffic"
              checked={considerTraffic}
              onCheckedChange={(checked) => setConsiderTraffic(checked as boolean)}
            />
            <div className="flex-1">
              <label htmlFor="traffic" className="text-sm font-medium cursor-pointer">
                Consider Real-time Traffic
              </label>
              <p className="text-xs text-muted-foreground">
                Adjust routes based on current traffic conditions
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxStops">Maximum Stops</Label>
            <Select value={maxStops} onValueChange={setMaxStops}>
              <SelectTrigger id="maxStops">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 stops</SelectItem>
                <SelectItem value="10">10 stops</SelectItem>
                <SelectItem value="15">15 stops</SelectItem>
                <SelectItem value="20">20 stops</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Optimization Summary */}
        <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium">Optimization Summary</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-gray-400" />
              <span className="text-muted-foreground">Max Stops:</span>
              <span className="font-medium">{maxStops}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-gray-400" />
              <span className="text-muted-foreground">Traffic:</span>
              <span className="font-medium">{considerTraffic ? "On" : "Off"}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleOptimize} 
          className="w-full"
          disabled={isOptimizing}
        >
          <Sparkles className="size-4 mr-2" />
          {isOptimizing ? "Optimizing..." : "Optimize Route"}
        </Button>
      </CardContent>
    </Card>
  );
}

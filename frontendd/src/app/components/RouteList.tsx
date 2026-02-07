import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExpiryBadge } from "./ExpiryBadge";
import { MapPin, Navigation, Clock, Package, CheckCircle2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

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

interface RouteListProps {
  stops: RouteStop[];
  vehicleName?: string;
}

export function RouteList({ stops, vehicleName = "Vehicle #1" }: RouteListProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Navigation className="size-5 text-blue-600" />
          Route Timeline - {vehicleName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-gray-200" />
            
            <div className="space-y-4">
              {stops.map((stop, index) => (
                <div key={stop.id} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1 size-8 rounded-full border-2 flex items-center justify-center ${
                    stop.status === "completed" 
                      ? "bg-green-500 border-green-500" 
                      : stop.status === "in-progress"
                      ? "bg-blue-500 border-blue-500 animate-pulse"
                      : "bg-white border-gray-300"
                  }`}>
                    {stop.status === "completed" ? (
                      <CheckCircle2 className="size-4 text-white" />
                    ) : stop.type === "donor" ? (
                      <MapPin className="size-4 text-purple-600" />
                    ) : (
                      <Package className="size-4 text-green-600" />
                    )}
                  </div>

                  <Card className={`border ${
                    stop.status === "completed" 
                      ? "bg-green-50/50 border-green-200" 
                      : stop.status === "in-progress"
                      ? "bg-blue-50/50 border-blue-200"
                      : ""
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{stop.name}</h4>
                            <Badge variant={stop.type === "donor" ? "secondary" : "default"} className={
                              stop.type === "donor" 
                                ? "bg-purple-500/10 text-purple-700 border-purple-200"
                                : "bg-green-500/10 text-green-700 border-green-200"
                            }>
                              {stop.type === "donor" ? "Pickup" : "Dropoff"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{stop.address}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>ETA: {stop.eta}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="size-3" />
                          <span>{stop.distance}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {stop.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm bg-white/50 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <Package className="size-3 text-gray-400" />
                              <span>{item.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {item.quantity}x
                              </Badge>
                            </div>
                            <ExpiryBadge expiryTime={item.expiry} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

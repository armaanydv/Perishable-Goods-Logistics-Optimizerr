import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Truck, MapPin, Building2 } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
}

interface Donor {
  id: string;
  name: string;
  location: Location;
  items: Array<{ name: string; quantity: number }>;
}

interface NGO {
  id: string;
  name: string;
  location: Location;
}

interface Vehicle {
  id: string;
  name: string;
  location: Location;
  status: "active" | "idle" | "breakdown";
}

interface MapViewProps {
  donors: Donor[];
  ngos: NGO[];
  vehicles: Vehicle[];
  route?: Location[];
  center?: Location;
  zoom?: number;
}

export function MapView({ 
  donors, 
  ngos, 
  vehicles, 
  route, 
  center = { lat: 28.6139, lng: 77.2090 },
}: MapViewProps) {
  // Calculate bounds to fit all markers
  const allLocations = [
    ...donors.map(d => d.location),
    ...ngos.map(n => n.location),
    ...vehicles.map(v => v.location),
  ];

  const minLat = Math.min(...allLocations.map(l => l.lat), center.lat);
  const maxLat = Math.max(...allLocations.map(l => l.lat), center.lat);
  const minLng = Math.min(...allLocations.map(l => l.lng), center.lng);
  const maxLng = Math.max(...allLocations.map(l => l.lng), center.lng);

  // Convert lat/lng to SVG coordinates
  const latRange = maxLat - minLat || 0.1;
  const lngRange = maxLng - minLng || 0.1;
  const padding = 50;
  const width = 800;
  const height = 600;

  const toX = (lng: number) => ((lng - minLng) / lngRange) * (width - 2 * padding) + padding;
  const toY = (lat: number) => height - (((lat - minLat) / latRange) * (height - 2 * padding) + padding);

  return (
    <Card className="h-full w-full overflow-hidden border-0 shadow-lg relative bg-gray-50">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid)" />
        
        {/* Route lines */}
        {route && route.length > 1 && (
          <g>
            {route.map((loc, idx) => {
              if (idx === route.length - 1) return null;
              const nextLoc = route[idx + 1];
              return (
                <line
                  key={`route-${idx}`}
                  x1={toX(loc.lng)}
                  y1={toY(loc.lat)}
                  x2={toX(nextLoc.lng)}
                  y2={toY(nextLoc.lat)}
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  opacity="0.7"
                />
              );
            })}
            {/* Route arrows */}
            {route.map((loc, idx) => {
              if (idx === route.length - 1) return null;
              const nextLoc = route[idx + 1];
              const midX = (toX(loc.lng) + toX(nextLoc.lng)) / 2;
              const midY = (toY(loc.lat) + toY(nextLoc.lat)) / 2;
              return (
                <circle
                  key={`route-point-${idx}`}
                  cx={midX}
                  cy={midY}
                  r="4"
                  fill="#3b82f6"
                />
              );
            })}
          </g>
        )}

        {/* Breakdown circles */}
        {vehicles.filter(v => v.status === "breakdown").map((vehicle) => (
          <circle
            key={`breakdown-circle-${vehicle.id}`}
            cx={toX(vehicle.location.lng)}
            cy={toY(vehicle.location.lat)}
            r="40"
            fill="#ef4444"
            opacity="0.1"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
        ))}

        {/* Donor markers */}
        {donors.map((donor) => (
          <g key={donor.id} className="cursor-pointer hover:opacity-80 transition-opacity">
            <circle
              cx={toX(donor.location.lng)}
              cy={toY(donor.location.lat)}
              r="20"
              fill="#a855f7"
              opacity="0.9"
            />
            <circle
              cx={toX(donor.location.lng)}
              cy={toY(donor.location.lat)}
              r="15"
              fill="white"
              opacity="0.9"
            />
            <text
              x={toX(donor.location.lng)}
              y={toY(donor.location.lat) + 5}
              textAnchor="middle"
              fill="#a855f7"
              fontSize="18"
              fontWeight="bold"
            >
              D
            </text>
          </g>
        ))}

        {/* NGO markers */}
        {ngos.map((ngo) => (
          <g key={ngo.id} className="cursor-pointer hover:opacity-80 transition-opacity">
            <circle
              cx={toX(ngo.location.lng)}
              cy={toY(ngo.location.lat)}
              r="20"
              fill="#22c55e"
              opacity="0.9"
            />
            <circle
              cx={toX(ngo.location.lng)}
              cy={toY(ngo.location.lat)}
              r="15"
              fill="white"
              opacity="0.9"
            />
            <text
              x={toX(ngo.location.lng)}
              y={toY(ngo.location.lat) + 5}
              textAnchor="middle"
              fill="#22c55e"
              fontSize="18"
              fontWeight="bold"
            >
              N
            </text>
          </g>
        ))}

        {/* Vehicle markers */}
        {vehicles.map((vehicle) => {
          const color = vehicle.status === "breakdown" ? "#ef4444" : 
                       vehicle.status === "active" ? "#3b82f6" : "#6b7280";
          return (
            <g key={vehicle.id} className="cursor-pointer hover:opacity-80 transition-opacity">
              <circle
                cx={toX(vehicle.location.lng)}
                cy={toY(vehicle.location.lat)}
                r="20"
                fill={color}
                opacity="0.9"
              />
              <circle
                cx={toX(vehicle.location.lng)}
                cy={toY(vehicle.location.lat)}
                r="15"
                fill="white"
                opacity="0.9"
              />
              <text
                x={toX(vehicle.location.lng)}
                y={toY(vehicle.location.lat) + 5}
                textAnchor="middle"
                fill={color}
                fontSize="18"
                fontWeight="bold"
              >
                V
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 space-y-2 border border-gray-200">
        <h4 className="font-semibold text-sm mb-3">Map Legend</h4>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center justify-center size-6 rounded-full bg-purple-500 text-white text-xs font-bold">
            D
          </div>
          <span>Donors ({donors.length})</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center justify-center size-6 rounded-full bg-green-500 text-white text-xs font-bold">
            N
          </div>
          <span>NGOs ({ngos.length})</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center justify-center size-6 rounded-full bg-blue-500 text-white text-xs font-bold">
            V
          </div>
          <span>Active Vehicles</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center justify-center size-6 rounded-full bg-red-500 text-white text-xs font-bold">
            V
          </div>
          <span>Breakdown Alert</span>
        </div>
        {route && route.length > 0 && (
          <div className="flex items-center gap-2 text-sm pt-2 border-t">
            <div className="w-6 h-0.5 bg-blue-500 border-blue-500" style={{ borderTop: '2px dashed' }}></div>
            <span>Optimized Route</span>
          </div>
        )}
      </div>

      {/* Info cards on hover - positioned on right */}
      <div className="absolute top-4 right-4 space-y-2 max-w-xs">
        {/* Donors info */}
        {donors.slice(0, 3).map((donor) => (
          <Card key={donor.id} className="p-3 bg-white/95 backdrop-blur border-purple-200">
            <div className="flex items-start gap-2">
              <MapPin className="size-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{donor.name}</p>
                <Badge className="bg-purple-500/10 text-purple-700 border-purple-200 text-xs mt-1">
                  {donor.items.length} items
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}

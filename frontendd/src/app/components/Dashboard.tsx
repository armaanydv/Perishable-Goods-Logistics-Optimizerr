import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  TrendingUp, 
  MapPin, 
  Building2, 
  Truck, 
  Package,
  Clock,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

interface DashboardStats {
  totalDonors: number;
  totalNGOs: number;
  activeVehicles: number;
  itemsInTransit: number;
  completedDeliveries: number;
  criticalItems: number;
  avgDeliveryTime: string;
  efficiency: number;
}

interface DashboardProps {
  stats: DashboardStats;
}

export function Dashboard({ stats }: DashboardProps) {
  const statCards = [
    {
      title: "Active Donors",
      value: stats.totalDonors,
      icon: <MapPin className="size-5 text-purple-600" />,
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      trend: "+12% this week",
      trendUp: true
    },
    {
      title: "Distribution Centers",
      value: stats.totalNGOs,
      icon: <Building2 className="size-5 text-green-600" />,
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      trend: "+3 new",
      trendUp: true
    },
    {
      title: "Active Vehicles",
      value: stats.activeVehicles,
      icon: <Truck className="size-5 text-blue-600" />,
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      trend: "On route",
      trendUp: true
    },
    {
      title: "Items in Transit",
      value: stats.itemsInTransit,
      icon: <Package className="size-5 text-orange-600" />,
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      trend: `${stats.criticalItems} critical`,
      trendUp: false
    },
  ];

  const metricCards = [
    {
      title: "Completed Deliveries",
      value: stats.completedDeliveries,
      subtitle: "Today",
      icon: <CheckCircle2 className="size-5 text-green-600" />,
      bgColor: "bg-green-50/50",
      borderColor: "border-green-200"
    },
    {
      title: "Avg Delivery Time",
      value: stats.avgDeliveryTime,
      subtitle: "Minutes",
      icon: <Clock className="size-5 text-blue-600" />,
      bgColor: "bg-blue-50/50",
      borderColor: "border-blue-200"
    },
    {
      title: "Route Efficiency",
      value: `${stats.efficiency}%`,
      subtitle: "Optimization score",
      icon: <TrendingUp className="size-5 text-purple-600" />,
      bgColor: "bg-purple-50/50",
      borderColor: "border-purple-200"
    },
    {
      title: "Critical Items",
      value: stats.criticalItems,
      subtitle: "Expiring soon",
      icon: <AlertTriangle className="size-5 text-red-600" />,
      bgColor: "bg-red-50/50",
      borderColor: "border-red-200"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                  {stat.icon}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className={`text-sm flex items-center gap-1 ${
                  stat.trendUp ? "text-green-600" : "text-orange-600"
                }`}>
                  {stat.trendUp ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <AlertTriangle className="size-3" />
                  )}
                  {stat.trend}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((metric, index) => (
            <Card key={index} className={`${metric.bgColor} ${metric.borderColor} border`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  {metric.icon}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                <p className="text-2xl font-bold mb-1">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { DonorForm } from "../components/DonorForm";
import { NGOForm } from "../components/NGOForm";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea } from "../components/ui/scroll-area";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MapPin, Building2, Settings, Search, Filter, Trash2 } from "lucide-react";

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

interface ManagePageProps {
  donors: Donor[];
  ngos: NGO[];
  onAddDonor?: (donor: any) => void;
  onAddNGO?: (ngo: any) => void;
  onDeleteDonor?: (id: string) => void;
  onDeleteNGO?: (id: string) => void;
}

export function ManagePage({
  donors,
  ngos,
  onAddDonor,
  onAddNGO,
  onDeleteDonor,
  onDeleteNGO,
}: ManagePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("add");

  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNGOs = ngos.filter(ngo =>
    ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ngo.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="size-6 text-gray-600" />
          Network Management
        </h2>
        <p className="text-muted-foreground">Add and manage donors, NGOs, and distribution centers</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="add" className="gap-2">
            <MapPin className="size-4" />
            Add Locations
          </TabsTrigger>
          <TabsTrigger value="donors" className="gap-2">
            <MapPin className="size-4" />
            Manage Donors ({donors.length})
          </TabsTrigger>
          <TabsTrigger value="ngos" className="gap-2">
            <Building2 className="size-4" />
            Manage NGOs ({ngos.length})
          </TabsTrigger>
        </TabsList>

        {/* Add Tab */}
        <TabsContent value="add" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DonorForm onSubmit={onAddDonor} />
            <NGOForm onSubmit={onAddNGO} />
          </div>
        </TabsContent>

        {/* Donors Tab */}
        <TabsContent value="donors" className="space-y-4 mt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search donors by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="size-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDonors.map((donor) => (
              <Card key={donor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <MapPin className="size-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{donor.name}</h4>
                          <p className="text-sm text-muted-foreground">{donor.address}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-2"
                        onClick={() => onDeleteDonor?.(donor.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500/10 text-purple-700 border-purple-200">
                        {donor.items.length} items
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {donor.location.lat.toFixed(4)}, {donor.location.lng.toFixed(4)}
                      </Badge>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Available Items:</p>
                      <ScrollArea className="h-20">
                        <div className="space-y-1">
                          {donor.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <span>{item.name}</span>
                              <span className="text-muted-foreground">{item.quantity} kg</span>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDonors.length === 0 && (
            <Card className="p-12 text-center">
              <MapPin className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Donors Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search" : "Add your first donor to get started"}
              </p>
              <Button onClick={() => setActiveTab("add")}>
                <MapPin className="size-4 mr-2" />
                Add Donor
              </Button>
            </Card>
          )}
        </TabsContent>

        {/* NGOs Tab */}
        <TabsContent value="ngos" className="space-y-4 mt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search NGOs by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="size-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNGOs.map((ngo) => (
              <Card key={ngo.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <Building2 className="size-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{ngo.name}</h4>
                          <p className="text-sm text-muted-foreground">{ngo.address}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-2"
                        onClick={() => onDeleteNGO?.(ngo.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        Distribution Center
                      </Badge>
                    </div>

                    <div className="pt-2 border-t">
                      <Badge variant="outline" className="text-xs">
                        {ngo.location.lat.toFixed(4)}, {ngo.location.lng.toFixed(4)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNGOs.length === 0 && (
            <Card className="p-12 text-center">
              <Building2 className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Distribution Centers Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search" : "Add your first NGO to get started"}
              </p>
              <Button onClick={() => setActiveTab("add")}>
                <Building2 className="size-4 mr-2" />
                Add NGO
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

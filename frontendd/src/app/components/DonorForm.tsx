import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Plus, X, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Item {
  name: string;
  quantity: number;
  expiry: string;
}

interface DonorFormProps {
  onSubmit?: (donor: any) => void;
}

export function DonorForm({ onSubmit }: DonorFormProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [items, setItems] = useState<Item[]>([{ name: "", quantity: 1, expiry: "" }]);

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 1, expiry: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !address || !lat || !lng) {
      toast.error("Please fill in all required fields");
      return;
    }

    const validItems = items.filter(item => item.name && item.quantity > 0 && item.expiry);
    
    if (validItems.length === 0) {
      toast.error("Please add at least one valid item");
      return;
    }

    const donor = {
      id: `donor-${Date.now()}`,
      name,
      address,
      location: { lat: parseFloat(lat), lng: parseFloat(lng) },
      items: validItems,
    };

    onSubmit?.(donor);
    toast.success("Donor added successfully!");
    
    // Reset form
    setName("");
    setAddress("");
    setLat("");
    setLng("");
    setItems([{ name: "", quantity: 1, expiry: "" }]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="size-5 text-purple-600" />
          Add Donor Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Donor Name *</Label>
              <Input
                id="name"
                placeholder="Restaurant, Hotel, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                placeholder="Street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="lat">Latitude *</Label>
              <Input
                id="lat"
                type="number"
                step="any"
                placeholder="28.6139"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="lng">Longitude *</Label>
              <Input
                id="lng"
                type="number"
                step="any"
                placeholder="77.2090"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Items to Donate</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAddItem}
                className="gap-1"
              >
                <Plus className="size-4" />
                Add Item
              </Button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="flex gap-2 items-end p-3 border rounded-lg bg-gray-50">
                <div className="flex-1 space-y-2">
                  <div>
                    <Label className="text-xs">Item Name</Label>
                    <Input
                      placeholder="Rice, Vegetables, etc."
                      value={item.name}
                      onChange={(e) => handleItemChange(index, "name", e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Quantity (kg)</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Expiry Time</Label>
                      <Input
                        type="datetime-local"
                        value={item.expiry}
                        onChange={(e) => handleItemChange(index, "expiry", e.target.value)}
                        className="bg-white"
                      />
                    </div>
                  </div>
                </div>
                {items.length > 1 && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full">
            Add Donor
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

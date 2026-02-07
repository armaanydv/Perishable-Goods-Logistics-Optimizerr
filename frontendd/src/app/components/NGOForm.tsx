import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Building2 } from "lucide-react";
import { toast } from "sonner";

interface NGOFormProps {
  onSubmit?: (ngo: any) => void;
}

export function NGOForm({ onSubmit }: NGOFormProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [capacity, setCapacity] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !address || !lat || !lng || !contactPerson) {
      toast.error("Please fill in all required fields");
      return;
    }

    const ngo = {
      id: `ngo-${Date.now()}`,
      name,
      address,
      contactPerson,
      phone,
      email,
      capacity: capacity ? parseInt(capacity) : undefined,
      location: { lat: parseFloat(lat), lng: parseFloat(lng) },
    };

    onSubmit?.(ngo);
    toast.success("NGO/Distribution Center added successfully!");
    
    // Reset form
    setName("");
    setAddress("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setCapacity("");
    setLat("");
    setLng("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="size-5 text-green-600" />
          Add NGO / Distribution Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="ngo-name">Organization Name *</Label>
              <Input
                id="ngo-name"
                placeholder="Hope Foundation, Care Center, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="ngo-address">Address *</Label>
              <Textarea
                id="ngo-address"
                placeholder="Street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="ngo-lat">Latitude *</Label>
              <Input
                id="ngo-lat"
                type="number"
                step="any"
                placeholder="28.6139"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="ngo-lng">Longitude *</Label>
              <Input
                id="ngo-lng"
                type="number"
                step="any"
                placeholder="77.2090"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="contact-person">Contact Person *</Label>
              <Input
                id="contact-person"
                placeholder="Primary contact name"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@ngo.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="capacity">Daily Capacity (kg)</Label>
              <Input
                id="capacity"
                type="number"
                min="0"
                placeholder="500"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Maximum amount of food/medicine this center can handle per day
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Distribution Center
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

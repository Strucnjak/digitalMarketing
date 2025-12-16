import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { useAdminData, type ServiceKey, type TeamMember, type Testimonial } from "./AdminDataContext";
import { servicePageIds } from "../routing";

const serviceLabels: Record<ServiceKey, string> = {
  "web-design": "Web dizajn",
  seo: "SEO",
  "social-media": "Društvene mreže",
  branding: "Brending",
  strategy: "Strategija",
};

export function AdminPanel() {
  const {
    pricesEnabled,
    setPricesEnabled,
    servicePrices,
    updateServicePrice,
    teamMembers,
    updateTeamMember,
    addTeamMember,
    removeTeamMember,
    testimonials,
    addTestimonial,
    updateTestimonial,
    removeTestimonial,
    showTestimonials,
    setShowTestimonials,
    notifications,
    clearNotifications,
  } = useAdminData();

  const [newMember, setNewMember] = useState<TeamMember>({
    name: "",
    role: "",
    description: "",
    image: "",
  });

  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    name: "",
    role: "",
    content: "",
    avatar: "",
    rating: 5,
  });

  const sortedNotifications = useMemo(
    () => [...notifications].sort((a, b) => b.createdAt - a.createdAt),
    [notifications],
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-bdigital-navy">Admin panel</h1>
            <p className="text-neutral-gray">Upravljajte cijenama, timom, recenzijama i obavještenjima.</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/">⬅ Povratak na sajt</Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Cijene usluga</CardTitle>
            <div className="flex items-center gap-2">
              <Switch checked={pricesEnabled} onCheckedChange={setPricesEnabled} id="pricesEnabled" />
              <Label htmlFor="pricesEnabled" className="text-sm text-neutral-gray">
                Prikaz cijena aktivan
              </Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {servicePageIds.map((service) => {
              const servicePriceList = servicePrices[service] ?? [];

              return (
                <div key={service} className="space-y-2">
                  <h3 className="text-lg font-semibold text-bdigital-navy">{serviceLabels[service]}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {servicePriceList.map((price, index) => (
                      <div key={`${service}-${index}`} className="space-y-1">
                        <Label htmlFor={`${service}-${index}`}>Paket {index + 1}</Label>
                        <Input
                          id={`${service}-${index}`}
                          value={price}
                          onChange={(e) => updateServicePrice(service, index, e.target.value)}
                          placeholder="Unesite cijenu"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Naš tim</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4 space-y-3 bg-white shadow-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ime i prezime</Label>
                    <Input
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, { name: e.target.value })}
                      placeholder="Ime i prezime"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pozicija</Label>
                    <Input
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, { role: e.target.value })}
                      placeholder="Uloga u timu"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Opis</Label>
                    <Textarea
                      value={member.description}
                      onChange={(e) => updateTeamMember(index, { description: e.target.value })}
                      placeholder="Kratak opis"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL fotografije</Label>
                    <Input
                      value={member.image}
                      onChange={(e) => updateTeamMember(index, { image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" className="text-red-600" onClick={() => removeTeamMember(index)}>
                    Ukloni člana
                  </Button>
                </div>
              </div>
            ))}

            <div className="border border-dashed border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
              <h4 className="font-semibold text-bdigital-navy">Dodaj novog člana</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Ime i prezime"
                />
                <Input
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  placeholder="Uloga"
                />
                <Textarea
                  value={newMember.description}
                  onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                  placeholder="Kratak opis"
                />
                <Input
                  value={newMember.image}
                  onChange={(e) => setNewMember({ ...newMember, image: e.target.value })}
                  placeholder="URL fotografije"
                />
              </div>
              <Button
                onClick={() => {
                  if (!newMember.name.trim() || !newMember.role.trim()) return;
                  addTeamMember(newMember);
                  setNewMember({ name: "", role: "", description: "", image: "" });
                }}
              >
                Sačuvaj člana
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Šta kažu naši klijenti</CardTitle>
            <div className="flex items-center gap-2">
              <Switch checked={showTestimonials} onCheckedChange={setShowTestimonials} id="toggleTestimonials" />
              <Label htmlFor="toggleTestimonials" className="text-sm text-neutral-gray">
                Prikaz recenzija aktivan
              </Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4 space-y-3 bg-white shadow-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ime i inicijali</Label>
                    <Input
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(index, { name: e.target.value })}
                      placeholder="Ime klijenta"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Uloga / Kompanija</Label>
                    <Input
                      value={testimonial.role}
                      onChange={(e) => updateTestimonial(index, { role: e.target.value })}
                      placeholder="Pozicija"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Inicijali za avatar</Label>
                    <Input
                      value={testimonial.avatar}
                      onChange={(e) => updateTestimonial(index, { avatar: e.target.value })}
                      placeholder="AN"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ocjena (1-5)</Label>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={testimonial.rating}
                      onChange={(e) => updateTestimonial(index, { rating: Number(e.target.value) })}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Recenzija</Label>
                    <Textarea
                      value={testimonial.content}
                      onChange={(e) => updateTestimonial(index, { content: e.target.value })}
                      placeholder="Sadržaj recenzije"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" className="text-red-600" onClick={() => removeTestimonial(index)}>
                    Ukloni recenziju
                  </Button>
                </div>
              </div>
            ))}

            <div className="border border-dashed border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
              <h4 className="font-semibold text-bdigital-navy">Dodaj recenziju</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                  placeholder="Ime"
                />
                <Input
                  value={newTestimonial.role}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                  placeholder="Pozicija"
                />
                <Input
                  value={newTestimonial.avatar}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, avatar: e.target.value })}
                  placeholder="Inicijali"
                />
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={newTestimonial.rating}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                />
                <div className="md:col-span-2">
                  <Textarea
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    placeholder="Tekst recenzije"
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) return;
                  addTestimonial(newTestimonial);
                  setNewTestimonial({ name: "", role: "", avatar: "", rating: 5, content: "" });
                }}
              >
                Sačuvaj recenziju
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Obavještenja sa formi</CardTitle>
            <Button variant="outline" onClick={clearNotifications} disabled={!notifications.length}>
              Očisti
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {sortedNotifications.length === 0 ? (
              <p className="text-neutral-gray">Nema novih obavještenja.</p>
            ) : (
              sortedNotifications.map((notification) => (
                <div key={notification.id} className="border border-gray-100 rounded-lg p-3 bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-bdigital-navy">
                      {notification.type === "service-inquiry" ? "Upit za uslugu" : "Besplatna konsultacija"}
                    </span>
                    <span className="text-xs text-neutral-gray">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-gray mt-2">{notification.details}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPanel;

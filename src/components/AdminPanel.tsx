import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, CheckCircle2, Eye, Mail, Phone, Reply, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useAdminData, type SectionVisibility, type ServiceKey, type TeamMember, type Testimonial } from "./AdminDataContext";
import { servicePageIds } from "../routing";
import { clearAdminAccess } from "../utils/adminAccess";

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
    sectionVisibility,
    setSectionVisibility,
    showTestimonials,
    setShowTestimonials,
    notifications,
    updateNotificationStatus,
    saveNotificationResponse,
    removeNotification,
    clearNotifications,
    resetState,
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

  const [responseDrafts, setResponseDrafts] = useState<Record<string, string>>({});
  const [expandedNotificationId, setExpandedNotificationId] = useState<string | null>(null);

  const sortedNotifications = useMemo(
    () => [...notifications].sort((a, b) => b.createdAt - a.createdAt),
    [notifications],
  );

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.status === "new").length,
    [notifications],
  );

  const respondedCount = useMemo(
    () => notifications.filter((notification) => notification.status === "responded").length,
    [notifications],
  );

  const sectionToggles: { key: keyof SectionVisibility; label: string; description: string }[] = [
    { key: "hero", label: "Hero i glavna CTA sekcija", description: "Prvi ekran sa naslovom i dugmadima." },
    { key: "services", label: "Usluge", description: "Prikaz ponude i paketa." },
    { key: "portfolio", label: "Portfolio", description: "Studije slučaja i projekti." },
    { key: "about", label: "O nama i tim", description: "Opis kompanije i članova tima." },
    { key: "testimonials", label: "Recenzije", description: "Iskustva klijenata." },
    { key: "contact", label: "Kontakt i forme", description: "Kontakt forma i CTA blokovi." },
  ];

  const canCreateMember = newMember.name.trim().length > 0 && newMember.role.trim().length > 0;
  const canCreateTestimonial =
    newTestimonial.name.trim().length > 0 && newTestimonial.content.trim().length > 0;

  const handleResetState = () => {
    if (typeof window === "undefined") return;

    const confirmed = window.confirm(
      "Resetovanjem brišete lokalno sačuvane podatke o cijenama, timu i recenzijama. Nastavi?",
    );

    if (confirmed) {
      resetState();
    }
  };

  const handleLogout = () => {
    if (typeof window === "undefined") return;

    clearAdminAccess();
    window.location.href = "/admin";
  };

  const statusLabels = {
    new: "Novo",
    read: "Pročitano",
    responded: "Odgovoreno",
  } as const;

  const handleSaveResponse = (id: string) => {
    const response = responseDrafts[id] ?? "";
    saveNotificationResponse(id, response);
    updateNotificationStatus(id, response.trim() ? "responded" : "read");
  };

  const handleMarkAllRead = () => {
    sortedNotifications.forEach((notification) => {
      if (notification.status !== "responded") {
        updateNotificationStatus(notification.id, "read");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-bdigital-navy">Admin panel</h1>
            <p className="text-neutral-gray max-w-2xl">
              Upravljajte sekcijama sajta, sadržajem i porukama sa formi uz brže akcije za odgovor i arhivu.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleResetState}>
              Resetuj lokalne podatke
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Odjavi se
            </Button>
            <Button asChild variant="outline">
              <Link to="/">⬅ Povratak na sajt</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 shadow-md border-bdigital-cyan/30">
            <CardContent className="p-4">
              <p className="text-sm text-neutral-gray">Nove prijave</p>
              <p className="text-3xl font-bold text-bdigital-navy">{unreadCount}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 shadow-md border-emerald-100">
            <CardContent className="p-4">
              <p className="text-sm text-neutral-gray">Odgovorene forme</p>
              <p className="text-3xl font-bold text-emerald-600">{respondedCount}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 shadow-md border-slate-100">
            <CardContent className="p-4">
              <p className="text-sm text-neutral-gray">Ukupno poruka</p>
              <p className="text-3xl font-bold text-bdigital-navy">{notifications.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vidljivost sekcija</CardTitle>
            <p className="text-sm text-neutral-gray">
              Brzo ugasi ili uključi cijele blokove na početnoj stranici.
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectionToggles.map((section) => (
              <div
                key={section.key}
                className="flex items-start justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-bdigital-navy">{section.label}</p>
                  <p className="text-sm text-neutral-gray">{section.description}</p>
                </div>
                <Switch
                  checked={sectionVisibility[section.key]}
                  onCheckedChange={(value) =>
                    section.key === "testimonials" ? setShowTestimonials(value) : setSectionVisibility(section.key, value)
                  }
                  id={`section-${section.key}`}
                  aria-label={`Toggle ${section.label}`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

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
                      type="url"
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
                  type="url"
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
                disabled={!canCreateMember}
              >
                Sačuvaj člana
              </Button>
              <p className="text-sm text-neutral-gray">Ime i uloga su obavezni, a link fotografije je opcionalan.</p>
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
                      inputMode="numeric"
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
                  inputMode="numeric"
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
                disabled={!canCreateTestimonial}
              >
                Sačuvaj recenziju
              </Button>
              <p className="text-sm text-neutral-gray">
                Popunite ime i sadržaj recenzije. Ocjena van opsega 1-5 će biti automatski korigovana.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Obavještenja sa formi</CardTitle>
              <p className="text-sm text-neutral-gray">Pregledaj, odgovori ili obriši svaku prijavu.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleMarkAllRead} disabled={!notifications.length}>
                Označi pročitano
              </Button>
              <Button variant="outline" onClick={clearNotifications} disabled={!notifications.length}>
                Očisti sve
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {sortedNotifications.length === 0 ? (
              <p className="text-neutral-gray" role="status" aria-live="polite">
                Nema novih obavještenja.
              </p>
            ) : (
              sortedNotifications.map((notification) => {
                const payload =
                  notification.payload && typeof notification.payload === "object"
                    ? (notification.payload as Record<string, unknown>)
                    : undefined;
                const responseDraft = responseDrafts[notification.id] ?? notification.response ?? "";
                const isExpanded = expandedNotificationId === notification.id;

                return (
                  <div
                    key={notification.id}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="bg-bdigital-cyan/10 text-bdigital-navy">
                          {notification.type === "service-inquiry" ? "Upit za uslugu" : "Besplatna konsultacija"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            notification.status === "responded"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : notification.status === "read"
                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                          }
                        >
                          {statusLabels[notification.status]}
                        </Badge>
                      </div>
                      <span className="text-xs text-neutral-gray">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-sm text-bdigital-navy font-semibold mt-3">{notification.details}</p>

                    {isExpanded && payload && (
                      <div className="mt-3 grid gap-3 rounded-lg bg-gray-50 p-3 text-sm text-neutral-gray md:grid-cols-2">
                        {payload.fullName && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-bdigital-cyan-dark" />
                            <span className="text-bdigital-navy font-semibold">{String(payload.fullName)}</span>
                          </div>
                        )}
                        {payload.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-bdigital-cyan-dark" />
                            <span>{String(payload.email)}</span>
                          </div>
                        )}
                        {payload.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-bdigital-cyan-dark" />
                            <span>{String(payload.phone)}</span>
                          </div>
                        )}
                        {payload.company && (
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-bdigital-cyan-dark" />
                            <span>{String(payload.company)}</span>
                          </div>
                        )}
                        {payload.selectedService && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-bdigital-cyan-dark" />
                            <span>Usluga: {String(payload.selectedService)}</span>
                          </div>
                        )}
                        {payload.selectedPackage && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-bdigital-cyan-dark" />
                            <span>Paket: {String(payload.selectedPackage)}</span>
                          </div>
                        )}
                        {payload.website && (
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-bdigital-cyan-dark" />
                            <span>{String(payload.website)}</span>
                          </div>
                        )}
                        {payload.businessType && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-bdigital-cyan-dark" />
                            <span>Industrija: {String(payload.businessType)}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-3 grid gap-3 md:grid-cols-[1.2fr_1fr]">
                      <div className="space-y-2">
                        <Label htmlFor={`response-${notification.id}`} className="text-sm text-bdigital-navy">
                          Bilješka / odgovor
                        </Label>
                        <Textarea
                          id={`response-${notification.id}`}
                          value={responseDraft}
                          onChange={(e) =>
                            setResponseDrafts((prev) => ({
                              ...prev,
                              [notification.id]: e.target.value,
                            }))
                          }
                          placeholder="Zapišite odgovor koji ste poslali ili status dogovora"
                        />
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => handleSaveResponse(notification.id)}>
                            <Reply className="mr-2 h-4 w-4" /> Sačuvaj odgovor
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setResponseDrafts((prev) => ({ ...prev, [notification.id]: notification.response ?? "" }))}
                          >
                            Vrati tekst
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-end gap-2 self-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedNotificationId(isExpanded ? null : notification.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          {isExpanded ? "Sakrij detalje" : "Prikaži detalje"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateNotificationStatus(
                              notification.id,
                              notification.status === "new" ? "read" : "new",
                            )
                          }
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          {notification.status === "new" ? "Označi pročitano" : "Vrati na novo"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Obriši
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPanel;

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { servicePageIds, type PageType } from "../routing";

export type ServiceKey = (typeof servicePageIds)[number];

export interface ServicePackagePriceMap {
  [key: string]: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FormNotification {
  id: string;
  type: "service-inquiry" | "consultation";
  createdAt: number;
  details: string;
  payload?: unknown;
}

interface AdminDataState {
  pricesEnabled: boolean;
  servicePrices: Record<ServiceKey, string[]>;
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  showTestimonials: boolean;
  notifications: FormNotification[];
}

interface AdminDataContextValue extends AdminDataState {
  updateServicePrice: (service: ServiceKey, index: number, value: string) => void;
  setPricesEnabled: (value: boolean) => void;
  updateTeamMember: (index: number, member: Partial<TeamMember>) => void;
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (index: number) => void;
  updateTestimonial: (index: number, testimonial: Partial<Testimonial>) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  removeTestimonial: (index: number) => void;
  setShowTestimonials: (value: boolean) => void;
  addNotification: (notification: FormNotification) => void;
  clearNotifications: () => void;
}

const defaultServicePrices: Record<ServiceKey, string[]> = {
  "web-design": ["800 €", "1.200 €", "2.000 €+"],
  seo: ["350 €/mes", "600 €/mes", "1.000 €/mes"],
  "social-media": ["500 €/mes", "900 €/mes", "1.500 €/mes"],
  branding: ["500 €", "1.700 €", "2.400 €+"],
  strategy: ["600 €", "900 €", "2.000 €+"],
};

const defaultTeamMembers: TeamMember[] = [
  {
    name: "Marko Petrović",
    role: "CEO & Creative Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&face",
    description: "Vodi kreativni tim sa više od 5 godina iskustva u digitalnom marketingu.",
  },
  {
    name: "Ana Nikolić",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&face",
    description: "Ekspert za web tehnologije i UX/UI dizajn sa strašću za inovacije.",
  },
  {
    name: "Stefan Jovanović",
    role: "SEO Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&face",
    description: "Specijalizovan za SEO optimizaciju i digitalne strategije.",
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    name: "Marko Petrović",
    role: 'Vlasnik restorana "Konoba Stari Grad"',
    content:
      "DIAL Digital je kreirao fantastičnu web stranicu za naš restoran. Broj online rezervacija se udvostručio u prva tri meseca!",
    avatar: "MP",
    rating: 5,
  },
  {
    name: "Ana Nikolić",
    role: 'Direktorka "Montenegrin Properties"',
    content:
      "Njihov SEO je potpuno transformisao naše online prisustvo. Sada smo prvi u Google pretragama za nekretnine u Podgorici.",
    avatar: "AN",
    rating: 5,
  },
  {
    name: "Stefan Jovanović",
    role: 'Osnivač "TechStart ME"',
    content:
      "Profesionalni pristup, kreativna rešenja i odličan rezultat. Preporučujem DIAL Digital svim kompanijama koje žele rast.",
    avatar: "SJ",
    rating: 5,
  },
];

const AdminDataContext = createContext<AdminDataContextValue | undefined>(undefined);

const storageKey = "admin-panel-data";

function cloneServicePrices(source: Partial<Record<ServiceKey, string[]>> = {}) {
  return Object.entries(defaultServicePrices).reduce<Record<ServiceKey, string[]>>(
    (acc, [key, prices]) => {
      const serviceKey = key as ServiceKey;
      acc[serviceKey] = [...(source[serviceKey] ?? prices)];
      return acc;
    },
    {} as Record<ServiceKey, string[]>,
  );
}

function createStateFromPartial(parsed?: Partial<AdminDataState>): AdminDataState {
  return {
    pricesEnabled: parsed?.pricesEnabled ?? true,
    servicePrices: cloneServicePrices(parsed?.servicePrices),
    teamMembers: parsed?.teamMembers?.length
      ? parsed.teamMembers.map((member) => ({ ...member }))
      : [...defaultTeamMembers],
    testimonials: parsed?.testimonials?.length
      ? parsed.testimonials.map((testimonial) => ({ ...testimonial }))
      : [...defaultTestimonials],
    showTestimonials: parsed?.showTestimonials ?? true,
    notifications: parsed?.notifications ?? [],
  };
}

function getStoredState(): Partial<AdminDataState> | undefined {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored) as Partial<AdminDataState>;
    }
  } catch (error) {
    console.error("Failed to parse admin panel data", error);
  }
  return undefined;
}

const getInitialState = (): AdminDataState => createStateFromPartial();

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminDataState>(() => getInitialState());
  const [hasHydratedFromStorage, setHasHydratedFromStorage] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedState = getStoredState();
    if (storedState) {
      setState(createStateFromPartial(storedState));
    }
    setHasHydratedFromStorage(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hasHydratedFromStorage) return;
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, hasHydratedFromStorage]);

  const value = useMemo<AdminDataContextValue>(() => ({
    ...state,
    updateServicePrice: (service, index, value) => {
      setState((prev) => ({
        ...prev,
        servicePrices: {
          ...prev.servicePrices,
          [service]: (prev.servicePrices[service] ?? []).map((price, i) => (i === index ? value : price)),
        },
      }));
    },
    setPricesEnabled: (value) => setState((prev) => ({ ...prev, pricesEnabled: value })),
    updateTeamMember: (index, member) => {
      setState((prev) => ({
        ...prev,
        teamMembers: prev.teamMembers.map((existing, i) => (i === index ? { ...existing, ...member } : existing)),
      }));
    },
    addTeamMember: (member) =>
      setState((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, member],
      })),
    removeTeamMember: (index) =>
      setState((prev) => ({
        ...prev,
        teamMembers: prev.teamMembers.filter((_, i) => i !== index),
      })),
    updateTestimonial: (index, testimonial) =>
      setState((prev) => ({
        ...prev,
        testimonials: prev.testimonials.map((existing, i) =>
          i === index ? { ...existing, ...testimonial } : existing,
        ),
      })),
    addTestimonial: (testimonial) =>
      setState((prev) => ({
        ...prev,
        testimonials: [...prev.testimonials, testimonial],
      })),
    removeTestimonial: (index) =>
      setState((prev) => ({
        ...prev,
        testimonials: prev.testimonials.filter((_, i) => i !== index),
      })),
    setShowTestimonials: (value) => setState((prev) => ({ ...prev, showTestimonials: value })),
    addNotification: (notification) =>
      setState((prev) => ({
        ...prev,
        notifications: [notification, ...prev.notifications].slice(0, 50),
      })),
    clearNotifications: () => setState((prev) => ({ ...prev, notifications: [] })),
  }), [state]);

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData(): AdminDataContextValue {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}

export function getDefaultPricesForPage(page: PageType, packagesLength: number): string[] {
  const key = page as ServiceKey;
  const prices = defaultServicePrices[key] ?? [];
  return prices.slice(0, packagesLength);
}

import type { Role } from "@/config/site";

export type DemoRole = Role | "admin";
export type AppointmentStatus = "Requested" | "Confirmed" | "Completed" | "Cancelled";
export type OrderStatus = "Enquiry" | "Accepted" | "Ready for collection" | "Declined";

export interface DemoProfile {
  id: string;
  name: string;
  email: string;
  role: DemoRole;
  createdAt: string;
  verified?: boolean;
}

export interface DemoAnimal {
  id: string;
  name: string;
  species: string;
  breed: string;
  group: string;
  ownerName: string;
  ownerRole: Role;
  location: string;
  nextCare: string;
  status: "Up to date" | "Due soon" | "Review needed";
}

export interface DemoAppointment {
  id: string;
  date: string;
  time: string;
  animalName: string;
  service: string;
  customer: string;
  customerRole: "farmer" | "keeper";
  location: string;
  status: AppointmentStatus;
  amount: number;
}

export interface DemoTask {
  id: string;
  title: string;
  kind: string;
  dueDate: string;
  animalName?: string;
  role?: DemoRole;
  complete: boolean;
}

export interface DemoClient {
  id: string;
  name: string;
  phone: string;
  location: string;
  animals: string[];
}

export interface DemoProduct {
  id: string;
  name: string;
  category: string;
  quantity: number;
  batch: string;
  expiresOn: string;
  price: number;
  restricted: boolean;
  listedBy: "pharmacy" | "vet";
}

export interface DemoOrder {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  customer: string;
  customerRole: "farmer" | "keeper" | "vet";
  createdAt: string;
  status: OrderStatus;
}

export interface DemoNotification {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
  read: boolean;
  role?: DemoRole;
}

export interface DemoPayment {
  id: string;
  label: string;
  date: string;
  amount: number;
  status: "Paid" | "Outstanding";
}

export interface DemoWorkspace {
  schemaVersion: 1;
  revision: number;
  updatedAt: string;
  profiles: DemoProfile[];
  animals: DemoAnimal[];
  appointments: DemoAppointment[];
  tasks: DemoTask[];
  clients: DemoClient[];
  products: DemoProduct[];
  orders: DemoOrder[];
  notifications: DemoNotification[];
  payments: DemoPayment[];
}

const STORAGE_KEY = "zoveto.demo.workspace.v1";
const WORKSPACE_EVENT = "zoveto:workspace-updated";

function dateOffset(offset: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function createSeedWorkspace(): DemoWorkspace {
  const today = new Date().toISOString();
  return {
    schemaVersion: 1,
    revision: 1,
    updatedAt: today,
    profiles: [
      {
        id: "profile-vet",
        name: "Dr. Ama Mensah",
        email: "ama@example.test",
        role: "vet",
        createdAt: dateOffset(-150),
        verified: false,
      },
      {
        id: "profile-farmer",
        name: "Kojo Asante",
        email: "kojo@example.test",
        role: "farmer",
        createdAt: dateOffset(-120),
      },
      {
        id: "profile-keeper",
        name: "Akosua Boateng",
        email: "akosua@example.test",
        role: "keeper",
        createdAt: dateOffset(-90),
      },
      {
        id: "profile-pharmacy",
        name: "Greenfield Vet Pharmacy",
        email: "orders@example.test",
        role: "pharmacy",
        createdAt: dateOffset(-80),
        verified: true,
      },
    ],
    animals: [
      {
        id: "animal-1",
        name: "Ama’s herd",
        species: "Cattle",
        breed: "Sanga",
        group: "Herd A",
        ownerName: "Kojo Asante",
        ownerRole: "farmer",
        location: "Kumasi, Ashanti",
        nextCare: dateOffset(3),
        status: "Due soon",
      },
      {
        id: "animal-2",
        name: "Nana",
        species: "Goat",
        breed: "West African Dwarf",
        group: "Herd A",
        ownerName: "Kojo Asante",
        ownerRole: "farmer",
        location: "Kumasi, Ashanti",
        nextCare: dateOffset(18),
        status: "Up to date",
      },
      {
        id: "animal-3",
        name: "Kofi",
        species: "Dog",
        breed: "Mixed breed",
        group: "Household",
        ownerName: "Akosua Boateng",
        ownerRole: "keeper",
        location: "Accra, Greater Accra",
        nextCare: dateOffset(7),
        status: "Due soon",
      },
      {
        id: "animal-4",
        name: "Mimi",
        species: "Cat",
        breed: "Domestic shorthair",
        group: "Household",
        ownerName: "Akosua Boateng",
        ownerRole: "keeper",
        location: "Accra, Greater Accra",
        nextCare: dateOffset(30),
        status: "Up to date",
      },
      {
        id: "animal-5",
        name: "The poultry flock",
        species: "Poultry",
        breed: "Layer hens",
        group: "Coop 1",
        ownerName: "Kojo Asante",
        ownerRole: "farmer",
        location: "Kumasi, Ashanti",
        nextCare: dateOffset(1),
        status: "Review needed",
      },
    ],
    appointments: [
      {
        id: "appointment-1",
        date: dateOffset(0),
        time: "09:00",
        animalName: "Kofi",
        service: "Wellness visit",
        customer: "Akosua Boateng",
        customerRole: "keeper",
        location: "Accra, Greater Accra",
        status: "Confirmed",
        amount: 180,
      },
      {
        id: "appointment-2",
        date: dateOffset(0),
        time: "11:30",
        animalName: "Ama’s herd",
        service: "Farm visit",
        customer: "Kojo Asante",
        customerRole: "farmer",
        location: "Kumasi, Ashanti",
        status: "Requested",
        amount: 350,
      },
      {
        id: "appointment-3",
        date: dateOffset(0),
        time: "14:00",
        animalName: "Mimi",
        service: "Vaccination follow-up",
        customer: "Akosua Boateng",
        customerRole: "keeper",
        location: "Accra, Greater Accra",
        status: "Confirmed",
        amount: 120,
      },
      {
        id: "appointment-4",
        date: dateOffset(-36),
        time: "10:00",
        animalName: "Nana",
        service: "Routine check",
        customer: "Kojo Asante",
        customerRole: "farmer",
        location: "Kumasi, Ashanti",
        status: "Completed",
        amount: 150,
      },
      {
        id: "appointment-5",
        date: dateOffset(-70),
        time: "13:30",
        animalName: "Kofi",
        service: "Vaccination",
        customer: "Akosua Boateng",
        customerRole: "keeper",
        location: "Accra, Greater Accra",
        status: "Completed",
        amount: 160,
      },
      {
        id: "appointment-6",
        date: dateOffset(2),
        time: "08:30",
        animalName: "The poultry flock",
        service: "Farm visit",
        customer: "Kojo Asante",
        customerRole: "farmer",
        location: "Kumasi, Ashanti",
        status: "Confirmed",
        amount: 300,
      },
      {
        id: "appointment-7",
        date: dateOffset(6),
        time: "15:00",
        animalName: "Mimi",
        service: "Follow-up visit",
        customer: "Akosua Boateng",
        customerRole: "keeper",
        location: "Accra, Greater Accra",
        status: "Requested",
        amount: 120,
      },
    ],
    tasks: [
      {
        id: "task-1",
        title: "Check vaccination schedule",
        kind: "Follow-up",
        dueDate: dateOffset(1),
        animalName: "Ama’s herd",
        role: "farmer",
        complete: false,
      },
      {
        id: "task-2",
        title: "Review poultry flock",
        kind: "Farm visit",
        dueDate: dateOffset(2),
        animalName: "The poultry flock",
        role: "farmer",
        complete: false,
      },
      {
        id: "task-3",
        title: "Prepare visit notes",
        kind: "Consultation",
        dueDate: dateOffset(0),
        animalName: "Kofi",
        role: "keeper",
        complete: false,
      },
      {
        id: "task-4",
        title: "Update client contact details",
        kind: "Admin",
        dueDate: dateOffset(-1),
        role: "vet",
        complete: true,
      },
      {
        id: "task-5",
        title: "Follow up after the wellness visit",
        kind: "Follow-up",
        dueDate: dateOffset(4),
        animalName: "Kofi",
        role: "vet",
        complete: false,
      },
    ],
    clients: [
      {
        id: "client-1",
        name: "Kojo Asante",
        phone: "+233 24 555 0184",
        location: "Kumasi, Ashanti",
        animals: ["Ama’s herd", "Nana", "The poultry flock"],
      },
      {
        id: "client-2",
        name: "Akosua Boateng",
        phone: "+233 20 555 0276",
        location: "Accra, Greater Accra",
        animals: ["Kofi", "Mimi"],
      },
      {
        id: "client-3",
        name: "Yaw Owusu",
        phone: "+233 27 555 0318",
        location: "Sunyani, Bono",
        animals: ["Adu"],
      },
    ],
    products: [
      {
        id: "product-1",
        name: "Livestock mineral supplement",
        category: "Animal nutrition",
        quantity: 24,
        batch: "LM-2408",
        expiresOn: dateOffset(240),
        price: 85,
        restricted: false,
        listedBy: "pharmacy",
      },
      {
        id: "product-2",
        name: "Poultry drinker",
        category: "Farm equipment",
        quantity: 4,
        batch: "PD-1124",
        expiresOn: dateOffset(365),
        price: 45,
        restricted: false,
        listedBy: "pharmacy",
      },
      {
        id: "product-3",
        name: "Veterinary vaccine",
        category: "Vaccines",
        quantity: 2,
        batch: "VX-0924",
        expiresOn: dateOffset(24),
        price: 110,
        restricted: true,
        listedBy: "pharmacy",
      },
      {
        id: "product-4",
        name: "Clinical gloves",
        category: "Practice supplies",
        quantity: 18,
        batch: "CG-0325",
        expiresOn: dateOffset(500),
        price: 32,
        restricted: false,
        listedBy: "vet",
      },
      {
        id: "product-5",
        name: "Sample collection tubes",
        category: "Practice supplies",
        quantity: 3,
        batch: "ST-0125",
        expiresOn: dateOffset(330),
        price: 20,
        restricted: false,
        listedBy: "vet",
      },
    ],
    orders: [
      {
        id: "order-1",
        productId: "product-1",
        productName: "Livestock mineral supplement",
        quantity: 2,
        customer: "Kojo Asante",
        customerRole: "farmer",
        createdAt: dateOffset(-1),
        status: "Enquiry",
      },
      {
        id: "order-2",
        productId: "product-2",
        productName: "Poultry drinker",
        quantity: 1,
        customer: "Kojo Asante",
        customerRole: "farmer",
        createdAt: dateOffset(-2),
        status: "Accepted",
      },
      {
        id: "order-3",
        productId: "product-1",
        productName: "Livestock mineral supplement",
        quantity: 1,
        customer: "Akosua Boateng",
        customerRole: "keeper",
        createdAt: dateOffset(-3),
        status: "Ready for collection",
      },
    ],
    notifications: [
      {
        id: "notification-1",
        title: "New farm visit request",
        detail: "Kojo Asante · The poultry flock",
        createdAt: today,
        read: false,
        role: "vet",
      },
      {
        id: "notification-2",
        title: "Follow-up due soon",
        detail: "Kofi · 7 days",
        createdAt: new Date(Date.now() - 3_600_000).toISOString(),
        read: false,
        role: "keeper",
      },
      {
        id: "notification-3",
        title: "Stock running low",
        detail: "Poultry drinker · 4 remaining",
        createdAt: new Date(Date.now() - 86_400_000).toISOString(),
        read: true,
        role: "pharmacy",
      },
    ],
    payments: [
      {
        id: "payment-1",
        label: "Farm visit · Kojo Asante",
        date: dateOffset(-4),
        amount: 300,
        status: "Paid",
      },
      {
        id: "payment-2",
        label: "Wellness visit · Akosua Boateng",
        date: dateOffset(-8),
        amount: 180,
        status: "Paid",
      },
      {
        id: "payment-3",
        label: "Routine check · Kojo Asante",
        date: dateOffset(-12),
        amount: 150,
        status: "Outstanding",
      },
      {
        id: "payment-4",
        label: "Vaccination · Akosua Boateng",
        date: dateOffset(-19),
        amount: 160,
        status: "Paid",
      },
    ],
  };
}

function isDemoWorkspace(value: unknown): value is DemoWorkspace {
  if (!value || typeof value !== "object") return false;
  const workspace = value as Partial<DemoWorkspace>;
  return (
    workspace.schemaVersion === 1 &&
    typeof workspace.revision === "number" &&
    Array.isArray(workspace.profiles) &&
    Array.isArray(workspace.animals) &&
    Array.isArray(workspace.appointments) &&
    Array.isArray(workspace.tasks) &&
    Array.isArray(workspace.clients) &&
    Array.isArray(workspace.products) &&
    Array.isArray(workspace.orders) &&
    Array.isArray(workspace.notifications) &&
    Array.isArray(workspace.payments)
  );
}

const SEED_SNAPSHOT = JSON.stringify(createSeedWorkspace());

export function getWorkspaceSnapshot() {
  return localStorage.getItem(STORAGE_KEY) ?? SEED_SNAPSHOT;
}

export function parseWorkspace(snapshot: string): DemoWorkspace {
  const value: unknown = JSON.parse(snapshot);
  if (!isDemoWorkspace(value)) {
    throw new Error("Saved demo data is invalid. Reset the demo workspace to continue.");
  }
  return value;
}

export function readWorkspace() {
  return parseWorkspace(getWorkspaceSnapshot());
}

export function subscribeWorkspace(listener: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(WORKSPACE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(WORKSPACE_EVENT, listener);
  };
}

export function saveWorkspace(next: DemoWorkspace) {
  if (!isDemoWorkspace(next)) throw new Error("Cannot save invalid demo data.");
  const current = readWorkspace();
  const updated: DemoWorkspace = {
    ...next,
    revision: current.revision + 1,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(WORKSPACE_EVENT));
  return updated;
}

export function updateWorkspace(updater: (current: DemoWorkspace) => DemoWorkspace) {
  return saveWorkspace(updater(readWorkspace()));
}

export function resetWorkspace() {
  const reset = createSeedWorkspace();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
  window.dispatchEvent(new Event(WORKSPACE_EVENT));
  return reset;
}

export function upsertDemoProfile(name: string, email: string, role: DemoRole) {
  const normalizedEmail = email.trim().toLowerCase();
  const workspace = updateWorkspace((current) => {
    const existing = current.profiles.find(
      (profile) => profile.email.toLowerCase() === normalizedEmail && profile.role === role,
    );
    const profile: DemoProfile = {
      id: existing?.id ?? createId("profile"),
      name: name.trim(),
      email: normalizedEmail,
      role,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      verified: existing?.verified,
    };
    const profiles = existing
      ? current.profiles.map((item) => (item.id === existing.id ? profile : item))
      : [...current.profiles, profile];
    return { ...current, profiles };
  });
  const profile = workspace.profiles.find(
    (profile) => profile.email === normalizedEmail && profile.role === role,
  );
  if (!profile) throw new Error("The demo profile could not be saved.");
  return profile;
}

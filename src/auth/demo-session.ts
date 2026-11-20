import type { DemoRole } from "@/data/demo-workspace";

export interface DemoSession {
  profileId: string;
  name: string;
  email: string;
  role: DemoRole;
}

const SESSION_KEY = "zoveto.demo.session.v1";

export function readDemoSession(): DemoSession | null {
  const value = sessionStorage.getItem(SESSION_KEY);
  if (!value) return null;

  const parsed: unknown = JSON.parse(value);
  if (!parsed || typeof parsed !== "object") {
    throw new Error("The demo session is invalid. Please sign in again.");
  }

  const session = parsed as Partial<DemoSession>;
  const validRole =
    session.role === "farmer" ||
    session.role === "keeper" ||
    session.role === "vet" ||
    session.role === "pharmacy" ||
    session.role === "admin";
  if (
    !validRole ||
    typeof session.name !== "string" ||
    typeof session.email !== "string" ||
    typeof session.profileId !== "string"
  ) {
    throw new Error("The demo session is invalid. Please sign in again.");
  }

  return session as DemoSession;
}

export function saveDemoSession(session: DemoSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearDemoSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
import type { DemoRole, DemoWorkspace } from "@/data/demo-workspace";

export function visibleAnimals(data: DemoWorkspace, role: DemoRole) {
  return role === "vet" || role === "admin"
    ? data.animals
    : data.animals.filter((animal) => animal.ownerRole === role);
}

export function visibleAppointments(data: DemoWorkspace, role: DemoRole) {
  return role === "vet" || role === "admin"
    ? data.appointments
    : role === "farmer" || role === "keeper"
      ? data.appointments.filter((appointment) => appointment.customerRole === role)
      : [];
}

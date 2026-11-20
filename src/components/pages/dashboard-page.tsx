import {
  ArrowDownToLine,
  BellRing,
  Check,
  CircleAlert,
  FileText,
  PawPrint,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { saveDemoSession, type DemoSession } from "@/auth/demo-session";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { visibleAnimals, visibleAppointments } from "@/components/dashboard/dashboard-data";
import { StatusBadge } from "@/components/dashboard/dashboard-status-badge";
import {
  FinancesPage,
  ProfilePage,
  ReportsPage,
  SubscriptionsPage,
  UsersPage,
  VerificationsPage,
} from "@/components/pages/dashboard-admin-pages";
import { dashboardHref, type DashboardPageId } from "@/components/dashboard/dashboard-config";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button, ButtonLink } from "@/components/ui/button";
import { useDemoWorkspace } from "@/hooks/use-demo-workspace";
import { navigate } from "@/lib/router";
import {
  createId,
  resetWorkspace,
  upsertDemoProfile,
  updateWorkspace,
  type AppointmentStatus,
  type DemoAnimal,
  type DemoAppointment,
  type DemoClient,
  type DemoOrder,
  type DemoProduct,
  type DemoRole,
  type DemoTask,
  type DemoWorkspace,
} from "@/data/demo-workspace";
import { formatCurrency, formatDate, localDate } from "@/lib/format";

const FIELD =
  "border-line text-ink focus:border-forest min-h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none transition";

function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-muted text-sm">Workspace / {title}</p>
        <h1 className="mt-1 text-2xl sm:text-[28px]">{title}</h1>
        <p className="text-muted mt-1 text-sm">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Panel({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="border-line rounded-xl border bg-white">
      <header className="border-line flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
        <div>
          <h2 className="text-base">{title}</h2>
          {description ? <p className="text-muted mt-0.5 text-xs">{description}</p> : null}
        </div>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function EmptyState({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <div className="border-line flex min-h-36 flex-col items-center justify-center rounded-lg border border-dashed px-5 py-8 text-center">
      <FileText className="text-muted size-6" aria-hidden="true" />
      <p className="text-body mt-3 text-sm">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

function ActionMessage({ children }: { children: string }) {
  return (
    <p
      className="text-forest flex items-center gap-2 rounded-lg bg-[#edf4e7] px-3 py-2 text-sm"
      role="status"
    >
      <Check className="size-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

function ErrorMessage({ children }: { children: string }) {
  return (
    <p
      className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
      role="alert"
    >
      <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

function useActionFeedback() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const run = (action: () => void, success: string) => {
    try {
      action();
      setError("");
      setMessage(success);
      return true;
    } catch (caught) {
      setMessage("");
      setError(caught instanceof Error ? caught.message : "The change could not be saved.");
      return false;
    }
  };
  return { message, error, run };
}

function formatUpdated(value: string) {
  return new Intl.DateTimeFormat("en-GH", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function downloadWorkspace(data: DemoWorkspace) {
  const file = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `zoveto-demo-${localDate()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function DashboardPage({
  role,
  page,
  session,
}: {
  role: DemoRole;
  page: DashboardPageId;
  session: DemoSession;
}) {
  const data = useDemoWorkspace();
  const [currentSession, setCurrentSession] = useState(session);
  const [search, setSearch] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const feedback = useActionFeedback();

  const markNotificationsRead = () =>
    feedback.run(
      () =>
        updateWorkspace((current) => ({
          ...current,
          notifications: current.notifications.map((item) =>
            role === "admin" || !item.role || item.role === role ? { ...item, read: true } : item,
          ),
        })),
      "Notifications marked as read.",
    );

  const openPage = (nextPage: DashboardPageId) => navigate(dashboardHref(role, nextPage));

  const filteredNotifications =
    role === "admin"
      ? data.notifications
      : data.notifications.filter((item) => !item.role || item.role === role);

  const content = (() => {
    switch (page) {
      case "overview":
        return (
          <DashboardOverview
            role={role}
            session={currentSession}
            data={data}
            onNavigate={openPage}
          />
        );
      case "appointments":
        return (
          <AppointmentsPage role={role} session={currentSession} data={data} search={search} />
        );
      case "animals":
        return <AnimalsPage role={role} session={currentSession} data={data} search={search} />;
      case "clients":
        return <ClientsPage role={role} data={data} search={search} />;
      case "tasks":
      case "reminders":
        return <TasksPage role={role} data={data} search={search} />;
      case "farm":
        return <FarmPage role={role} data={data} />;
      case "records":
        return <RecordsPage role={role} data={data} />;
      case "inventory":
        return <InventoryPage role={role} data={data} search={search} />;
      case "products":
        return <ProductsPage role={role} session={currentSession} data={data} search={search} />;
      case "orders":
        return <OrdersPage role={role} session={currentSession} data={data} search={search} />;
      case "finances":
        return <FinancesPage data={data} search={search} />;
      case "verifications":
        return <VerificationsPage data={data} search={search} />;
      case "users":
        return <UsersPage data={data} search={search} />;
      case "subscriptions":
        return <SubscriptionsPage />;
      case "reports":
        return <ReportsPage role={role} data={data} />;
      case "profile":
        return (
          <ProfilePage
            session={currentSession}
            onProfileChange={(updated) => {
              saveDemoSession(updated);
              setCurrentSession(updated);
            }}
          />
        );
    }
  })();

  return (
    <DashboardShell
      role={role}
      page={page}
      session={currentSession}
      notifications={filteredNotifications}
      search={search}
      onSearch={setSearch}
      onMarkAllRead={markNotificationsRead}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted flex items-center gap-2 text-xs">
          <span className="bg-forest size-2 rounded-full" aria-hidden="true" />
          Saved on this device · Last update {formatUpdated(data.updatedAt)}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              feedback.run(() => downloadWorkspace(data), "Demo data exported as a JSON file.")
            }
          >
            <ArrowDownToLine className="size-4" aria-hidden="true" />
            Export data
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfirmReset((visible) => !visible)}
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Reset demo
          </Button>
        </div>
      </div>
      {confirmReset ? (
        <div className="border-line mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-white p-4">
          <p className="text-body text-sm">
            Replace local changes with the original sample records?
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setConfirmReset(false)}>
              Keep my changes
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                feedback.run(() => {
                  resetWorkspace();
                  const profile = upsertDemoProfile(
                    currentSession.name,
                    currentSession.email,
                    currentSession.role,
                  );
                  const nextSession = {
                    ...currentSession,
                    profileId: profile.id,
                    name: profile.name,
                    email: profile.email,
                  };
                  saveDemoSession(nextSession);
                  setCurrentSession(nextSession);
                  setConfirmReset(false);
                }, "Sample data reset. Your demo profile was kept.")
              }
            >
              Reset sample data
            </Button>
          </div>
        </div>
      ) : null}
      {feedback.message ? (
        <div className="mb-4">
          <ActionMessage>{feedback.message}</ActionMessage>
        </div>
      ) : null}
      {feedback.error ? (
        <div className="mb-4">
          <ErrorMessage>{feedback.error}</ErrorMessage>
        </div>
      ) : null}
      {content}
    </DashboardShell>
  );
}

function AppointmentsPage({
  role,
  session,
  data,
  search,
}: {
  role: DemoRole;
  session: DemoSession;
  data: DemoWorkspace;
  search: string;
}) {
  const feedback = useActionFeedback();
  const [showForm, setShowForm] = useState(false);
  const appointments = visibleAppointments(data, role)
    .filter((appointment) =>
      `${appointment.animalName} ${appointment.service} ${appointment.customer} ${appointment.status}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const animals = visibleAnimals(data, role);

  const createAppointment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const animal = animals.find((item) => item.id === form.get("animal"));
    if (!animal) {
      feedback.run(() => {
        throw new Error("Choose an animal from your workspace.");
      }, "");
      return;
    }
    const date = String(form.get("date") ?? "");
    const time = String(form.get("time") ?? "");
    const service = String(form.get("service") ?? "").trim();
    if (!date || !time || !service) {
      feedback.run(() => {
        throw new Error("Choose an animal, service, date and time.");
      }, "");
      return;
    }

    const saved = feedback.run(() => {
      const customerRole =
        role === "farmer" || role === "keeper"
          ? role
          : animal.ownerRole === "farmer" || animal.ownerRole === "keeper"
            ? animal.ownerRole
            : "keeper";
      const customer = role === "farmer" || role === "keeper" ? session.name : animal.ownerName;
      updateWorkspace((current) => ({
        ...current,
        appointments: [
          {
            id: createId("appointment"),
            date,
            time,
            animalName: animal.name,
            service,
            customer,
            customerRole,
            location: animal.location,
            status: "Requested",
            amount: 0,
          },
          ...current.appointments,
        ],
        notifications: [
          {
            id: createId("notification"),
            title: "Appointment request created",
            detail: `${animal.name} · ${service}`,
            createdAt: new Date().toISOString(),
            read: false,
            role: "vet",
          },
          ...current.notifications,
        ],
      }));
    }, "Appointment request saved on this device.");
    if (saved) {
      formElement.reset();
      setShowForm(false);
    }
  };

  const changeStatus = (id: string, status: AppointmentStatus) =>
    feedback.run(
      () =>
        updateWorkspace((current) => {
          const appointment = current.appointments.find((item) => item.id === id);
          if (!appointment) throw new Error("This appointment is no longer available.");
          const recipientRole =
            role === "vet" || role === "admin" ? appointment.customerRole : "vet";
          return {
            ...current,
            appointments: current.appointments.map((item) =>
              item.id === id ? { ...item, status } : item,
            ),
            notifications: [
              {
                id: createId("notification"),
                title: "Appointment updated",
                detail: `${appointment.animalName} · ${status}`,
                createdAt: new Date().toISOString(),
                read: false,
                role: recipientRole,
              },
              ...current.notifications,
            ],
          };
        }),
      `Appointment marked ${status.toLowerCase()}.`,
    );

  const mayCreate = role === "farmer" || role === "keeper" || role === "vet";
  return (
    <>
      <PageHeading
        title="Appointments"
        description="Review visit requests and keep the schedule up to date."
        action={
          mayCreate ? (
            <Button variant="primary" onClick={() => setShowForm((open) => !open)}>
              <Plus className="size-4" aria-hidden="true" />
              New request
            </Button>
          ) : null
        }
      />
      <div className="space-y-4">
        {showForm ? (
          <Panel
            title="Request an appointment"
            description="This demo request is saved locally and does not notify a real clinic."
          >
            {animals.length ? (
              <form
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
                onSubmit={createAppointment}
              >
                <label className="text-body text-xs font-medium">
                  Animal or group
                  <select className={`${FIELD} mt-1.5`} name="animal" required>
                    {animals.map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        {animal.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-body text-xs font-medium">
                  Service
                  <select className={`${FIELD} mt-1.5`} name="service">
                    <option>Wellness visit</option>
                    <option>Farm visit</option>
                    <option>Vaccination follow-up</option>
                    <option>Routine check</option>
                  </select>
                </label>
                <label className="text-body text-xs font-medium">
                  Preferred date
                  <input
                    className={`${FIELD} mt-1.5`}
                    type="date"
                    name="date"
                    min={localDate()}
                    required
                  />
                </label>
                <label className="text-body text-xs font-medium">
                  Preferred time
                  <input className={`${FIELD} mt-1.5`} type="time" name="time" required />
                </label>
                <div className="flex gap-2 sm:col-span-2 lg:col-span-4">
                  <Button type="submit" variant="primary">
                    Save request
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <EmptyState
                message="Add an animal before requesting a visit."
                action={
                  <ButtonLink href={dashboardHref(role, "animals")} variant="outline">
                    Go to animals
                  </ButtonLink>
                }
              />
            )}
          </Panel>
        ) : null}
        {feedback.message ? <ActionMessage>{feedback.message}</ActionMessage> : null}
        {feedback.error ? <ErrorMessage>{feedback.error}</ErrorMessage> : null}
        <AppointmentTable appointments={appointments} role={role} onStatus={changeStatus} />
      </div>
    </>
  );
}

function AppointmentTable({
  appointments,
  role,
  onStatus,
}: {
  appointments: DemoAppointment[];
  role: DemoRole;
  onStatus: (id: string, status: AppointmentStatus) => void;
}) {
  return (
    <Panel title="Visit schedule" description={`${appointments.length} matching appointments`}>
      {appointments.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-muted text-xs">
              <tr>
                {[
                  "Date & time",
                  "Animal",
                  "Service",
                  "Customer",
                  "Location",
                  "Status",
                  "Action",
                ].map((item) => (
                  <th key={item} className="px-3 py-2 font-medium">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-line border-t">
                  <td className="px-3 py-3">
                    <span className="text-ink block">{formatDate(appointment.date)}</span>
                    <span className="text-muted text-xs">{appointment.time}</span>
                  </td>
                  <td className="text-ink px-3 py-3 font-medium">{appointment.animalName}</td>
                  <td className="px-3 py-3">{appointment.service}</td>
                  <td className="px-3 py-3">{appointment.customer}</td>
                  <td className="px-3 py-3">{appointment.location}</td>
                  <td className="px-3 py-3">
                    <StatusBadge>{appointment.status}</StatusBadge>
                  </td>
                  <td className="px-3 py-3">
                    {(role === "vet" || role === "admin") &&
                    appointment.status !== "Completed" &&
                    appointment.status !== "Cancelled" ? (
                      <select
                        aria-label={`Update ${appointment.animalName} appointment`}
                        className="border-line min-h-9 rounded-md border bg-white px-2 text-xs"
                        value={appointment.status}
                        onChange={(event) =>
                          onStatus(appointment.id, event.target.value as AppointmentStatus)
                        }
                      >
                        <option value="Requested">Requested</option>
                        <option value="Confirmed">Confirm</option>
                        <option value="Completed">Complete</option>
                        <option value="Cancelled">Cancel</option>
                      </select>
                    ) : role !== "vet" && role !== "admin" && appointment.status === "Requested" ? (
                      <button
                        type="button"
                        onClick={() => onStatus(appointment.id, "Cancelled")}
                        className="text-forest text-xs font-semibold hover:underline"
                      >
                        Cancel request
                      </button>
                    ) : (
                      <span className="text-muted text-xs">Not provided</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState message="No appointments match your search." />
      )}
    </Panel>
  );
}

function AnimalsPage({
  role,
  session,
  data,
  search,
}: {
  role: DemoRole;
  session: DemoSession;
  data: DemoWorkspace;
  search: string;
}) {
  const feedback = useActionFeedback();
  const [showForm, setShowForm] = useState(false);
  const animals = visibleAnimals(data, role).filter((animal) =>
    `${animal.name} ${animal.species} ${animal.breed} ${animal.group} ${animal.location}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const addAnimal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") ?? "").trim();
    const species = String(form.get("species") ?? "").trim();
    const breed = String(form.get("breed") ?? "").trim();
    const location = String(form.get("location") ?? "").trim();
    if (!name || !species || !location) return;

    const saved = feedback.run(() => {
      const ownerRole = role === "farmer" || role === "keeper" ? role : "keeper";
      const ownerName =
        role === "farmer" || role === "keeper"
          ? session.name
          : (data.clients[0]?.name ?? session.name);
      const animal: DemoAnimal = {
        id: createId("animal"),
        name,
        species,
        breed: breed || "Not recorded",
        group: String(form.get("group") ?? "").trim() || "Unassigned",
        ownerName,
        ownerRole,
        location,
        nextCare: String(form.get("nextCare") ?? "").trim() || localDate(),
        status: "Up to date",
      };
      updateWorkspace((current) => ({ ...current, animals: [animal, ...current.animals] }));
    }, "Animal saved to the local workspace.");
    if (saved) {
      formElement.reset();
      setShowForm(false);
    }
  };

  const updateStatus = (id: string, status: DemoAnimal["status"]) =>
    feedback.run(
      () =>
        updateWorkspace((current) => ({
          ...current,
          animals: current.animals.map((animal) =>
            animal.id === id ? { ...animal, status } : animal,
          ),
        })),
      "Animal care status updated.",
    );

  return (
    <>
      <PageHeading
        title={
          role === "farmer"
            ? "Animals & herds"
            : role === "keeper"
              ? "My animals"
              : "Animal records"
        }
        description="Keep basic animal details and upcoming care dates together."
        action={
          role !== "admin" && role !== "pharmacy" ? (
            <Button variant="primary" onClick={() => setShowForm((open) => !open)}>
              <Plus className="size-4" aria-hidden="true" />
              Add animal
            </Button>
          ) : null
        }
      />
      <div className="space-y-4">
        {showForm ? (
          <Panel
            title="Add an animal or group"
            description="This sample profile is saved only in your current browser."
          >
            <form onSubmit={addAnimal} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <label className="text-body text-xs font-medium">
                Animal or group name
                <input className={`${FIELD} mt-1.5`} name="name" required maxLength={70} />
              </label>
              <label className="text-body text-xs font-medium">
                Species
                <select className={`${FIELD} mt-1.5`} name="species">
                  {["Cattle", "Goat", "Sheep", "Poultry", "Dog", "Cat", "Other"].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="text-body text-xs font-medium">
                Breed
                <input className={`${FIELD} mt-1.5`} name="breed" maxLength={70} />
              </label>
              <label className="text-body text-xs font-medium">
                Herd or group
                <input className={`${FIELD} mt-1.5`} name="group" maxLength={70} />
              </label>
              <label className="text-body text-xs font-medium">
                Location
                <input className={`${FIELD} mt-1.5`} name="location" required maxLength={100} />
              </label>
              <label className="text-body text-xs font-medium">
                Next care date
                <input className={`${FIELD} mt-1.5`} name="nextCare" type="date" />
              </label>
              <div className="flex gap-2 sm:col-span-2 lg:col-span-3">
                <Button type="submit" variant="primary">
                  Save animal
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Panel>
        ) : null}
        {feedback.message ? <ActionMessage>{feedback.message}</ActionMessage> : null}
        {feedback.error ? <ErrorMessage>{feedback.error}</ErrorMessage> : null}
        <Panel title="Animal list" description={`${animals.length} sample profiles`}>
          {animals.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="text-muted text-xs">
                  <tr>
                    {[
                      "Animal / group",
                      "Species & breed",
                      "Owner / group",
                      "Location",
                      "Next care",
                      "Status",
                    ].map((item) => (
                      <th key={item} className="px-3 py-2 font-medium">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {animals.map((animal) => (
                    <tr key={animal.id} className="border-line border-t">
                      <td className="text-ink px-3 py-3 font-medium">{animal.name}</td>
                      <td className="px-3 py-3">
                        {animal.species} · {animal.breed}
                      </td>
                      <td className="px-3 py-3">
                        {animal.ownerName}
                        <span className="text-muted block text-xs">{animal.group}</span>
                      </td>
                      <td className="px-3 py-3">{animal.location}</td>
                      <td className="px-3 py-3">{formatDate(animal.nextCare)}</td>
                      <td className="px-3 py-3">
                        {role === "vet" || role === "admin" ? (
                          <select
                            aria-label={`Update care status for ${animal.name}`}
                            className="border-line min-h-9 rounded-md border bg-white px-2 text-xs"
                            value={animal.status}
                            onChange={(event) =>
                              updateStatus(animal.id, event.target.value as DemoAnimal["status"])
                            }
                          >
                            <option>Up to date</option>
                            <option>Due soon</option>
                            <option>Review needed</option>
                          </select>
                        ) : (
                          <StatusBadge>{animal.status}</StatusBadge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="No animals match your search." />
          )}
        </Panel>
      </div>
    </>
  );
}

function FarmPage({ role, data }: { role: DemoRole; data: DemoWorkspace }) {
  const animals = visibleAnimals(data, role);
  const groups = animals.reduce<Record<string, DemoAnimal[]>>((result, animal) => {
    const key = `${animal.location} · ${animal.group}`;
    (result[key] ??= []).push(animal);
    return result;
  }, {});
  return (
    <>
      <PageHeading
        title="My farm"
        description="A simple overview of your locations and livestock groups."
        action={
          <ButtonLink href={dashboardHref(role, "animals")} variant="primary">
            <Plus className="size-4" aria-hidden="true" />
            Add livestock
          </ButtonLink>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(groups).map(([label, items]) => (
          <Panel key={label} title={label} description={`${items.length} animal or group records`}>
            <ul className="divide-line divide-y">
              {items.map((animal) => (
                <li
                  key={animal.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span>
                    <span className="text-ink block text-sm font-medium">{animal.name}</span>
                    <span className="text-muted text-xs">
                      {animal.species} · {animal.breed}
                    </span>
                  </span>
                  <StatusBadge>{animal.status}</StatusBadge>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
      {!Object.keys(groups).length ? (
        <EmptyState message="Add your first animal to start a farm record." />
      ) : null}
    </>
  );
}

function RecordsPage({ role, data }: { role: DemoRole; data: DemoWorkspace }) {
  const animals = visibleAnimals(data, role);
  return (
    <>
      <PageHeading
        title="Shared health records"
        description="Basic care information attached to animal profiles."
      />
      <div className="bg-cream/60 text-deep mb-4 rounded-lg p-4 text-sm">
        This demo only shows care dates and status. Detailed clinical notes are not available here.
      </div>
      <Panel title="Care history" description="Only records visible to this demo role are shown.">
        {animals.length ? (
          <ul className="divide-line divide-y">
            {animals.map((animal) => (
              <li
                key={animal.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-ink font-medium">{animal.name}</p>
                  <p className="text-muted mt-0.5 text-xs">
                    {animal.species} · {animal.group}
                  </p>
                </div>
                <div className="text-right">
                  <StatusBadge>{animal.status}</StatusBadge>
                  <p className="text-muted mt-1 text-xs">
                    Next care · {formatDate(animal.nextCare)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState message="No shared care information is available yet." />
        )}
      </Panel>
    </>
  );
}

function TasksPage({
  role,
  data,
  search,
}: {
  role: DemoRole;
  data: DemoWorkspace;
  search: string;
}) {
  const feedback = useActionFeedback();
  const [showForm, setShowForm] = useState(false);
  const names = new Set(visibleAnimals(data, role).map((animal) => animal.name));
  const tasks = data.tasks.filter((task) => {
    const roleCanSee =
      role === "admin" ||
      (task.role ? task.role === role : !task.animalName || names.has(task.animalName));
    return (
      roleCanSee &&
      `${task.title} ${task.kind} ${task.animalName ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });
  const title = role === "farmer" || role === "keeper" ? "Care reminders" : "Tasks & follow-ups";

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const task: DemoTask = {
      id: createId("task"),
      title: String(form.get("title") ?? "").trim(),
      kind: String(form.get("kind") ?? "Follow-up"),
      dueDate: String(form.get("dueDate") ?? localDate()),
      animalName: String(form.get("animalName") ?? "") || undefined,
      role,
      complete: false,
    };
    if (!task.title) return;
    if (
      feedback.run(
        () => updateWorkspace((current) => ({ ...current, tasks: [task, ...current.tasks] })),
        "Reminder saved locally.",
      )
    ) {
      formElement.reset();
      setShowForm(false);
    }
  };

  const toggleTask = (task: DemoTask) =>
    feedback.run(
      () =>
        updateWorkspace((current) => ({
          ...current,
          tasks: current.tasks.map((item) =>
            item.id === task.id ? { ...item, complete: !item.complete } : item,
          ),
        })),
      task.complete ? "Task reopened." : "Task marked complete.",
    );

  return (
    <>
      <PageHeading
        title={title}
        description="Keep follow-ups and practical next steps visible."
        action={
          <Button variant="primary" onClick={() => setShowForm((open) => !open)}>
            <Plus className="size-4" aria-hidden="true" />
            Add reminder
          </Button>
        }
      />
      <div className="space-y-4">
        {showForm ? (
          <Panel title="New reminder">
            <form onSubmit={addTask} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="text-body text-xs font-medium">
                Reminder
                <input name="title" className={`${FIELD} mt-1.5`} required maxLength={90} />
              </label>
              <label className="text-body text-xs font-medium">
                Type
                <select name="kind" className={`${FIELD} mt-1.5`}>
                  <option>Follow-up</option>
                  <option>Farm visit</option>
                  <option>Vaccination</option>
                  <option>Deworming</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="text-body text-xs font-medium">
                Animal or group
                <select name="animalName" className={`${FIELD} mt-1.5`}>
                  <option value="">General reminder</option>
                  {visibleAnimals(data, role).map((animal) => (
                    <option key={animal.id}>{animal.name}</option>
                  ))}
                </select>
              </label>
              <label className="text-body text-xs font-medium">
                Due date
                <input
                  name="dueDate"
                  type="date"
                  className={`${FIELD} mt-1.5`}
                  required
                  min={localDate()}
                />
              </label>
              <Button type="submit" variant="primary" className="sm:col-span-2 lg:col-span-4">
                Save reminder
              </Button>
            </form>
          </Panel>
        ) : null}
        {feedback.message ? <ActionMessage>{feedback.message}</ActionMessage> : null}
        {feedback.error ? <ErrorMessage>{feedback.error}</ErrorMessage> : null}
        <Panel
          title="Your task list"
          description={`${tasks.filter((task) => !task.complete).length} open · ${tasks.filter((task) => task.complete).length} completed`}
        >
          {tasks.length ? (
            <ul className="divide-line divide-y">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <input
                    type="checkbox"
                    checked={task.complete}
                    onChange={() => toggleTask(task)}
                    aria-label={`${task.complete ? "Reopen" : "Complete"} ${task.title}`}
                    className="accent-[#167c6a]"
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm font-medium ${task.complete ? "text-muted line-through" : "text-ink"}`}
                    >
                      {task.title}
                    </span>
                    <span className="text-muted text-xs">
                      {task.kind}
                      {task.animalName ? ` · ${task.animalName}` : ""}
                    </span>
                  </span>
                  <span className="text-muted shrink-0 text-xs">{formatDate(task.dueDate)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="No reminders match your search." />
          )}
        </Panel>
      </div>
    </>
  );
}

function ClientsPage({
  role,
  data,
  search,
}: {
  role: DemoRole;
  data: DemoWorkspace;
  search: string;
}) {
  const feedback = useActionFeedback();
  const [showForm, setShowForm] = useState(false);
  const clients = data.clients.filter((client) =>
    `${client.name} ${client.phone} ${client.location}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const addClient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const client: DemoClient = {
      id: createId("client"),
      name: String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      location: String(form.get("location") ?? "").trim(),
      animals: [],
    };
    if (!client.name || !client.phone || !client.location) return;
    if (
      feedback.run(
        () => updateWorkspace((current) => ({ ...current, clients: [client, ...current.clients] })),
        "Client saved in the local demo.",
      )
    ) {
      formElement.reset();
      setShowForm(false);
    }
  };

  return (
    <>
      <PageHeading
        title={role === "admin" ? "Client directory" : "Clients"}
        description="Contact details and animal counts for this sample practice."
        action={
          role === "vet" ? (
            <Button variant="primary" onClick={() => setShowForm((open) => !open)}>
              <Plus className="size-4" aria-hidden="true" />
              Add client
            </Button>
          ) : undefined
        }
      />
      <div className="space-y-4">
        {showForm ? (
          <Panel title="Add a client">
            <form onSubmit={addClient} className="grid gap-3 sm:grid-cols-3">
              <label className="text-body text-xs font-medium">
                Client name
                <input className={`${FIELD} mt-1.5`} name="name" required maxLength={80} />
              </label>
              <label className="text-body text-xs font-medium">
                Phone
                <input
                  className={`${FIELD} mt-1.5`}
                  name="phone"
                  type="tel"
                  required
                  maxLength={30}
                />
              </label>
              <label className="text-body text-xs font-medium">
                Location
                <input className={`${FIELD} mt-1.5`} name="location" required maxLength={100} />
              </label>
              <Button variant="primary" type="submit" className="sm:col-span-3">
                Save client
              </Button>
            </form>
          </Panel>
        ) : null}
        {feedback.message ? <ActionMessage>{feedback.message}</ActionMessage> : null}
        {feedback.error ? <ErrorMessage>{feedback.error}</ErrorMessage> : null}
        <Panel title="Client list" description={`${clients.length} sample records`}>
          {clients.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] text-left text-sm">
                <thead className="text-muted text-xs">
                  <tr>
                    {["Name", "Phone", "Location", "Animals"].map((item) => (
                      <th key={item} className="px-3 py-2 font-medium">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-line border-t">
                      <td className="text-ink px-3 py-3 font-medium">{client.name}</td>
                      <td className="px-3 py-3">{client.phone}</td>
                      <td className="px-3 py-3">{client.location}</td>
                      <td className="px-3 py-3">{client.animals.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="No clients match your search." />
          )}
        </Panel>
      </div>
    </>
  );
}

function InventoryPage({
  role,
  data,
  search,
}: {
  role: DemoRole;
  data: DemoWorkspace;
  search: string;
}) {
  const feedback = useActionFeedback();
  const [showForm, setShowForm] = useState(false);
  const scope = role === "pharmacy" ? "pharmacy" : "vet";
  const products = data.products
    .filter((product) => product.listedBy === scope)
    .filter((product) =>
      `${product.name} ${product.category} ${product.batch}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  const addProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const quantity = Number(form.get("quantity"));
    const price = Number(form.get("price"));
    if (!Number.isInteger(quantity) || quantity < 0 || !Number.isFinite(price) || price < 0) {
      feedback.run(() => {
        throw new Error("Enter a valid non-negative quantity and price.");
      }, "");
      return;
    }
    const product: DemoProduct = {
      id: createId("product"),
      name: String(form.get("name") ?? "").trim(),
      category: String(form.get("category") ?? "").trim(),
      quantity,
      batch: String(form.get("batch") ?? "").trim() || "Not recorded",
      expiresOn: String(form.get("expiresOn") ?? ""),
      price,
      restricted: form.get("restricted") === "on",
      listedBy: scope,
    };
    if (!product.name || !product.category || !product.expiresOn) {
      feedback.run(() => {
        throw new Error("Enter the product name, category and expiry date.");
      }, "");
      return;
    }
    if (
      feedback.run(
        () =>
          updateWorkspace((current) => ({ ...current, products: [product, ...current.products] })),
        "Product added to the local catalogue.",
      )
    ) {
      formElement.reset();
      setShowForm(false);
    }
  };

  const adjustStock = (id: string, delta: number) =>
    feedback.run(() => {
      updateWorkspace((current) => ({
        ...current,
        products: current.products.map((item) => {
          if (item.id !== id) return item;
          const quantity = item.quantity + delta;
          if (quantity < 0) throw new Error("Stock cannot be reduced below zero.");
          return { ...item, quantity };
        }),
      }));
    }, "Stock quantity updated.");

  return (
    <>
      <PageHeading
        title={scope === "pharmacy" ? "Inventory" : "Practice inventory"}
        description="Track product quantities, batches and expiry dates."
        action={
          <Button variant="primary" onClick={() => setShowForm((open) => !open)}>
            <Plus className="size-4" aria-hidden="true" />
            Add product
          </Button>
        }
      />
      <div className="space-y-4">
        {showForm ? (
          <Panel
            title="Add a product"
            description="Restricted products should only be supplied with appropriate professional authorisation."
          >
            <form onSubmit={addProduct} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <label className="text-body text-xs font-medium">
                Product name
                <input name="name" className={`${FIELD} mt-1.5`} required maxLength={100} />
              </label>
              <label className="text-body text-xs font-medium">
                Category
                <input name="category" className={`${FIELD} mt-1.5`} required maxLength={60} />
              </label>
              <label className="text-body text-xs font-medium">
                Quantity
                <input
                  name="quantity"
                  className={`${FIELD} mt-1.5`}
                  type="number"
                  min="0"
                  step="1"
                  defaultValue="0"
                  required
                />
              </label>
              <label className="text-body text-xs font-medium">
                Batch number
                <input name="batch" className={`${FIELD} mt-1.5`} maxLength={40} />
              </label>
              <label className="text-body text-xs font-medium">
                Expiry date
                <input name="expiresOn" className={`${FIELD} mt-1.5`} type="date" required />
              </label>
              <label className="text-body text-xs font-medium">
                Unit price (GHS)
                <input
                  name="price"
                  className={`${FIELD} mt-1.5`}
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue="0"
                  required
                />
              </label>
              <label className="text-body flex items-center gap-2 text-sm sm:col-span-2 lg:col-span-3">
                <input type="checkbox" name="restricted" className="accent-[#167c6a]" />
                Requires professional authorisation
              </label>
              <Button type="submit" variant="primary" className="sm:col-span-2 lg:col-span-3">
                Save product
              </Button>
            </form>
          </Panel>
        ) : null}
        {feedback.message ? <ActionMessage>{feedback.message}</ActionMessage> : null}
        {feedback.error ? <ErrorMessage>{feedback.error}</ErrorMessage> : null}
        <Panel title="Stock list" description={`${products.length} matching items`}>
          {products.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="text-muted text-xs">
                  <tr>
                    {[
                      "Product",
                      "Category",
                      "Quantity",
                      "Batch",
                      "Expires",
                      "Unit price",
                      "Access",
                    ].map((item) => (
                      <th key={item} className="px-3 py-2 font-medium">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-line border-t">
                      <td className="text-ink px-3 py-3 font-medium">{product.name}</td>
                      <td className="px-3 py-3">{product.category}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={product.quantity === 0}
                            aria-label={`Decrease ${product.name} stock`}
                            onClick={() => adjustStock(product.id, -1)}
                            className="border-line grid size-8 place-items-center rounded border"
                          >
                            −
                          </button>
                          <span className="min-w-5 text-center">{product.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase ${product.name} stock`}
                            onClick={() => adjustStock(product.id, 1)}
                            className="border-line grid size-8 place-items-center rounded border"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-3">{product.batch}</td>
                      <td className="px-3 py-3">{formatDate(product.expiresOn)}</td>
                      <td className="px-3 py-3">{formatCurrency(product.price)}</td>
                      <td className="px-3 py-3">
                        {product.restricted ? (
                          <StatusBadge>Restricted</StatusBadge>
                        ) : (
                          <span className="text-muted text-xs">Standard</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="No products match your search." />
          )}
        </Panel>
      </div>
    </>
  );
}

function ProductsPage({
  role,
  session,
  data,
  search,
}: {
  role: DemoRole;
  session: DemoSession;
  data: DemoWorkspace;
  search: string;
}) {
  const feedback = useActionFeedback();
  const products = data.products
    .filter((product) => product.listedBy === "pharmacy")
    .filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase()),
    );

  const sendEnquiry = (product: DemoProduct) =>
    feedback.run(() => {
      if (role !== "farmer" && role !== "keeper") {
        throw new Error("This workspace cannot send pharmacy enquiries.");
      }
      if (product.restricted) {
        throw new Error(
          "This product needs professional authorisation. Contact a veterinary professional.",
        );
      }
      if (product.quantity < 1) throw new Error("This product is currently unavailable.");
      updateWorkspace((current) => ({
        ...current,
        orders: [
          {
            id: createId("order"),
            productId: product.id,
            productName: product.name,
            quantity: 1,
            customer: session.name,
            customerRole: role,
            createdAt: localDate(),
            status: "Enquiry",
          },
          ...current.orders,
        ],
        notifications: [
          {
            id: createId("notification"),
            title: "Product enquiry sent",
            detail: `${product.name} · ${session.name}`,
            createdAt: new Date().toISOString(),
            read: false,
            role: "pharmacy",
          },
          ...current.notifications,
        ],
      }));
    }, "Enquiry saved locally. No order has been placed or payment taken.");

  return (
    <>
      <PageHeading
        title="Pharmacy products"
        description="Browse sample listings and send a local enquiry. No sale or payment is processed."
      />
      <div className="space-y-4">
        {feedback.message ? <ActionMessage>{feedback.message}</ActionMessage> : null}
        {feedback.error ? <ErrorMessage>{feedback.error}</ErrorMessage> : null}
        {products.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="border-line rounded-xl border bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-forest grid size-10 place-items-center rounded-lg bg-[#edf4e7]">
                    <PawPrint className="size-5" aria-hidden="true" />
                  </span>
                  {product.restricted ? (
                    <StatusBadge>Restricted</StatusBadge>
                  ) : (
                    <StatusBadge>{product.quantity ? "In stock" : "Unavailable"}</StatusBadge>
                  )}
                </div>
                <p className="text-muted mt-4 text-xs">{product.category}</p>
                <h2 className="mt-1 text-lg">{product.name}</h2>
                <p className="text-muted mt-2 text-sm">
                  Stock: {product.quantity} · Expires {formatDate(product.expiresOn)}
                </p>
                <p className="text-forest mt-3 text-lg font-semibold">
                  {formatCurrency(product.price)}
                </p>
                {product.restricted ? (
                  <p className="text-muted mt-3 text-xs">
                    Authorisation is required. Enquiries cannot be submitted from this demo.
                  </p>
                ) : (
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    disabled={!product.quantity}
                    onClick={() => sendEnquiry(product)}
                  >
                    <BellRing className="size-4" aria-hidden="true" />
                    Send enquiry
                  </Button>
                )}
              </article>
            ))}
          </div>
        ) : (
          <EmptyState message="No pharmacy products match your search." />
        )}
      </div>
    </>
  );
}

function OrdersPage({
  role,
  session,
  data,
  search,
}: {
  role: DemoRole;
  session: DemoSession;
  data: DemoWorkspace;
  search: string;
}) {
  const feedback = useActionFeedback();
  const orders = data.orders
    .filter((order) =>
      role === "pharmacy" ? true : order.customerRole === role && order.customer === session.name,
    )
    .filter((order) =>
      `${order.productName} ${order.customer} ${order.status}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  const updateOrder = (order: DemoOrder, status: DemoOrder["status"]) =>
    feedback.run(
      () =>
        updateWorkspace((current) => {
          const currentOrder = current.orders.find((item) => item.id === order.id);
          if (!currentOrder) throw new Error("This order is no longer available.");
          let products = current.products;
          if (status === "Accepted" && currentOrder.status === "Enquiry") {
            const product = current.products.find((item) => item.id === currentOrder.productId);
            if (!product || product.restricted) {
              throw new Error("This product cannot be supplied through the demo marketplace.");
            }
            if (product.quantity < currentOrder.quantity) {
              throw new Error("There is not enough stock to accept this enquiry.");
            }
            products = current.products.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity - currentOrder.quantity }
                : item,
            );
          }

          return {
            ...current,
            products,
            orders: current.orders.map((item) =>
              item.id === order.id ? { ...item, status } : item,
            ),
            notifications: [
              {
                id: createId("notification"),
                title: "Pharmacy enquiry updated",
                detail: `${currentOrder.productName} · ${status}`,
                createdAt: new Date().toISOString(),
                read: false,
                role: currentOrder.customerRole,
              },
              ...current.notifications,
            ],
          };
        }),
      `Enquiry marked ${status.toLowerCase()}.`,
    );

  return (
    <>
      <PageHeading
        title={role === "pharmacy" ? "Orders & enquiries" : "My product enquiries"}
        description={
          role === "pharmacy"
            ? "Review sample enquiries and update their local status."
            : "Track local enquiries sent to pharmacies. No sale or payment is processed."
        }
      />
      {feedback.message ? (
        <div className="mb-4">
          <ActionMessage>{feedback.message}</ActionMessage>
        </div>
      ) : null}
      {feedback.error ? (
        <div className="mb-4">
          <ErrorMessage>{feedback.error}</ErrorMessage>
        </div>
      ) : null}
      <Panel
        title={role === "pharmacy" ? "Order activity" : "Enquiry history"}
        description={
          role === "pharmacy" ? "Accepting an enquiry updates sample stock only." : undefined
        }
      >
        {orders.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="text-muted text-xs">
                <tr>
                  {["Date", "Product", "Customer", "Quantity", "Status", "Update"].map((item) => (
                    <th key={item} className="px-3 py-2 font-medium">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-line border-t">
                    <td className="px-3 py-3">{formatDate(order.createdAt)}</td>
                    <td className="text-ink px-3 py-3 font-medium">{order.productName}</td>
                    <td className="px-3 py-3">{order.customer}</td>
                    <td className="px-3 py-3">{order.quantity}</td>
                    <td className="px-3 py-3">
                      <StatusBadge>{order.status}</StatusBadge>
                    </td>
                    <td className="px-3 py-3">
                      {role === "pharmacy" && order.status === "Enquiry" ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => updateOrder(order, "Accepted")}
                            className="text-forest text-xs font-semibold hover:underline"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => updateOrder(order, "Declined")}
                            className="text-muted text-xs font-semibold hover:underline"
                          >
                            Decline
                          </button>
                        </div>
                      ) : role === "pharmacy" && order.status === "Accepted" ? (
                        <button
                          type="button"
                          onClick={() => updateOrder(order, "Ready for collection")}
                          className="text-forest text-xs font-semibold hover:underline"
                        >
                          Mark ready
                        </button>
                      ) : (
                        <span className="text-muted text-xs">Not provided</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No orders match your search." />
        )}
      </Panel>
    </>
  );
}

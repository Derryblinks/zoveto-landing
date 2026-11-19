import {
  Activity,
  CalendarCheck,
  CalendarDays,
  CircleAlert,
  Clock3,
  PawPrint,
  Users,
} from "lucide-react";
import type { DemoSession } from "@/auth/demo-session";
import type { DemoRole, DemoWorkspace } from "@/data/demo-workspace";
import { visibleAnimals, visibleAppointments } from "@/components/dashboard/dashboard-data";
import { StatusBadge } from "@/components/dashboard/dashboard-status-badge";
import { AppLink } from "@/components/ui/app-link";
import { Reveal } from "@/components/ui/reveal";
import { formatDate, localDate } from "@/lib/format";
import { dashboardHref, type DashboardPageId } from "./dashboard-config";

interface Stat {
  label: string;
  value: string;
  note: string;
  icon: typeof Users;
}

function getStats(data: DemoWorkspace, role: DemoRole): Stat[] {
  const today = localDate();
  const appointments = visibleAppointments(data, role);
  const animals = visibleAnimals(data, role);
  const upcoming = appointments.filter(
    (appointment) =>
      appointment.date >= today &&
      appointment.status !== "Cancelled" &&
      appointment.status !== "Completed",
  );
  const dueTasks = data.tasks.filter(
    (task) =>
      !task.complete &&
      task.dueDate >= today &&
      (role === "admin" || !task.role || task.role === role),
  );

  if (role === "vet") {
    return [
      {
        label: "Active clients",
        value: String(data.clients.length),
        note: "Across your practice",
        icon: Users,
      },
      {
        label: "Animals on record",
        value: String(data.animals.length),
        note: "Livestock and pets",
        icon: PawPrint,
      },
      {
        label: "Appointments today",
        value: String(appointments.filter((item) => item.date === today).length),
        note: "See today’s schedule",
        icon: CalendarDays,
      },
      {
        label: "Requests to review",
        value: String(appointments.filter((item) => item.status === "Requested").length),
        note: "Awaiting a response",
        icon: CircleAlert,
      },
    ];
  }
  if (role === "farmer") {
    return [
      {
        label: "Animals and groups",
        value: String(animals.length),
        note: "Across your farm",
        icon: PawPrint,
      },
      {
        label: "Upcoming vet visits",
        value: String(upcoming.length),
        note: "Confirmed and requested",
        icon: CalendarCheck,
      },
      { label: "Care reminders", value: String(dueTasks.length), note: "Coming up", icon: Clock3 },
      {
        label: "Open enquiries",
        value: String(
          data.orders.filter((item) => item.customerRole === role && item.status === "Enquiry")
            .length,
        ),
        note: "Pharmacy responses",
        icon: Activity,
      },
    ];
  }
  if (role === "keeper") {
    return [
      {
        label: "Animals in your care",
        value: String(animals.length),
        note: "Household profiles",
        icon: PawPrint,
      },
      {
        label: "Upcoming appointments",
        value: String(upcoming.length),
        note: "Requested and confirmed",
        icon: CalendarCheck,
      },
      { label: "Care reminders", value: String(dueTasks.length), note: "Plan ahead", icon: Clock3 },
      {
        label: "Open enquiries",
        value: String(
          data.orders.filter((item) => item.customerRole === role && item.status === "Enquiry")
            .length,
        ),
        note: "Pharmacy responses",
        icon: Activity,
      },
    ];
  }
  if (role === "pharmacy") {
    const listedProducts = data.products.filter((item) => item.listedBy === "pharmacy");
    const lowStock = listedProducts.filter((item) => item.quantity <= 5).length;
    return [
      {
        label: "Listed products",
        value: String(listedProducts.length),
        note: "Your catalogue",
        icon: PawPrint,
      },
      {
        label: "Low-stock items",
        value: String(lowStock),
        note: "Five or fewer in stock",
        icon: CircleAlert,
      },
      {
        label: "Open enquiries",
        value: String(data.orders.filter((item) => item.status === "Enquiry").length),
        note: "Awaiting a response",
        icon: Activity,
      },
      {
        label: "Enquiries to review",
        value: String(data.orders.filter((item) => item.status === "Enquiry").length),
        note: "Local demo requests",
        icon: Activity,
      },
    ];
  }
  return [
    {
      label: "Demo profiles",
      value: String(data.profiles.length),
      note: "Saved in this browser",
      icon: Users,
    },
    {
      label: "Awaiting review",
      value: String(
        data.profiles.filter(
          (item) => (item.role === "vet" || item.role === "pharmacy") && !item.verified,
        ).length,
      ),
      note: "Sample verification queue",
      icon: CircleAlert,
    },
    {
      label: "Appointments",
      value: String(data.appointments.length),
      note: "All demo roles",
      icon: CalendarDays,
    },
    {
      label: "Product enquiries",
      value: String(data.orders.length),
      note: "Sample orders only",
      icon: Activity,
    },
  ];
}

function ActivityChart({ data, role }: { data: DemoWorkspace; role: DemoRole }) {
  const activityDates =
    role === "pharmacy"
      ? data.orders.map((item) => item.createdAt)
      : visibleAppointments(data, role).map((item) => item.date);
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - index));
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    return {
      key,
      label: new Intl.DateTimeFormat("en", { month: "short" }).format(date),
      count: activityDates.filter((dateValue) => dateValue.startsWith(key)).length,
    };
  });
  const max = Math.max(1, ...months.map((month) => month.count));
  const points = months
    .map((month, index) => {
      const x = 30 + index * 64;
      const y = 116 - (month.count / max) * 86;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section
      aria-labelledby="activity-chart-title"
      className="border-line rounded-xl border bg-white p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="activity-chart-title" className="text-base">
            {role === "pharmacy" ? "Enquiry activity" : "Appointment activity"}
          </h2>
          <p className="text-muted mt-1 text-xs">
            {role === "pharmacy"
              ? "Enquiries received each month"
              : "Appointments by scheduled month"}{" "}
            · sample data
          </p>
        </div>
        <span className="text-forest grid size-9 place-items-center rounded-lg bg-[#edf4e7]">
          <Activity className="size-[18px]" aria-hidden="true" />
        </span>
      </div>
      <svg
        viewBox="0 0 360 150"
        role="img"
        aria-label={`${role === "pharmacy" ? "Enquiry" : "Appointment"} counts for the last six months: ${months.map((month) => `${month.label} ${month.count}`).join(", ")}`}
        className="mt-4 h-[150px] w-full overflow-visible"
      >
        {[30, 70, 110].map((y) => (
          <line key={y} x1="20" x2="350" y1={y} y2={y} stroke="#e4e1d4" strokeDasharray="3 5" />
        ))}
        <polyline
          points={points}
          fill="none"
          stroke="#416428"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="chart-line"
        />
        {months.map((month, index) => {
          const x = 30 + index * 64;
          const y = 116 - (month.count / max) * 86;
          return (
            <g key={month.key}>
              <circle cx={x} cy={y} r="4" fill="#416428" />
              <text x={x} y="145" textAnchor="middle" className="fill-muted text-[11px]">
                {month.label}
              </text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

function StatusChart({ data, role }: { data: DemoWorkspace; role: DemoRole }) {
  const appointments = visibleAppointments(data, role);
  const counts =
    role === "pharmacy"
      ? [
          {
            label: "Enquiry",
            count: data.orders.filter((item) => item.status === "Enquiry").length,
            color: "#c1af85",
          },
          {
            label: "Accepted",
            count: data.orders.filter((item) => item.status === "Accepted").length,
            color: "#416428",
          },
          {
            label: "Ready for collection",
            count: data.orders.filter((item) => item.status === "Ready for collection").length,
            color: "#9eb57d",
          },
          {
            label: "Declined",
            count: data.orders.filter((item) => item.status === "Declined").length,
            color: "#d8d6ca",
          },
        ]
      : [
          {
            label: "Confirmed",
            count: appointments.filter((item) => item.status === "Confirmed").length,
            color: "#416428",
          },
          {
            label: "Requested",
            count: appointments.filter((item) => item.status === "Requested").length,
            color: "#c1af85",
          },
          {
            label: "Completed",
            count: appointments.filter((item) => item.status === "Completed").length,
            color: "#9eb57d",
          },
          {
            label: "Cancelled",
            count: appointments.filter((item) => item.status === "Cancelled").length,
            color: "#d8d6ca",
          },
        ];
  const total = counts.reduce((sum, item) => sum + item.count, 0);
  let start = 0;
  const gradient = counts
    .map((item) => {
      const end = start + (total ? (item.count / total) * 100 : 0);
      const slice = `${item.color} ${start}% ${end}%`;
      start = end;
      return slice;
    })
    .join(", ");

  return (
    <section
      aria-labelledby="status-chart-title"
      className="border-line rounded-xl border bg-white p-5 sm:p-6"
    >
      <h2 id="status-chart-title" className="text-base">
        {role === "pharmacy" ? "Enquiry status" : "Appointment status"}
      </h2>
      <p className="text-muted mt-1 text-xs">
        {role === "pharmacy" ? "All sample enquiries" : "All sample appointments"}
      </p>
      <div className="mt-5 flex items-center justify-center gap-6">
        <div
          role="img"
          aria-label={`${role === "pharmacy" ? "Enquiry" : "Appointment"} status breakdown for ${total} records`}
          className="relative grid size-32 shrink-0 place-items-center rounded-full"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <div className="grid size-[82px] place-items-center rounded-full bg-white text-center">
            <span>
              <strong className="text-ink block text-2xl">{total}</strong>
              <span className="text-muted text-[10px]">
                {role === "pharmacy" ? "enquiries" : "appointments"}
              </span>
            </span>
          </div>
        </div>
        <ul className="space-y-2.5">
          {counts.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-xs">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className="text-body">{item.label}</span>
              <span className="text-muted ml-auto pl-2">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function UpcomingTable({ data, role }: { data: DemoWorkspace; role: DemoRole }) {
  if (role === "pharmacy") return null;
  const appointments = visibleAppointments(data, role)
    .filter(
      (appointment) =>
        appointment.date >= localDate() &&
        appointment.status !== "Cancelled" &&
        appointment.status !== "Completed",
    )
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
    .slice(0, 5);
  return (
    <section className="border-line rounded-xl border bg-white">
      <div className="border-line flex items-center justify-between gap-3 border-b px-5 py-4">
        <div>
          <h2 className="text-base">Upcoming appointments</h2>
          <p className="text-muted mt-0.5 text-xs">A quick look at upcoming visits</p>
        </div>
        <AppLink
          href={dashboardHref(role, "appointments")}
          className="text-forest text-xs font-semibold hover:underline"
        >
          View all
        </AppLink>
      </div>
      {appointments.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-bg text-muted text-xs">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  Date
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Animal / group
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Service
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-line border-t">
                  <td className="text-body px-5 py-3.5">
                    <span className="block">{formatDate(appointment.date)}</span>
                    <span className="text-muted text-xs">{appointment.time}</span>
                  </td>
                  <td className="text-ink px-5 py-3.5 font-medium">{appointment.animalName}</td>
                  <td className="text-body px-5 py-3.5">{appointment.service}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge>{appointment.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted px-5 py-8 text-center text-sm">No appointments yet.</p>
      )}
    </section>
  );
}

export function DashboardOverview({
  role,
  session,
  data,
  onNavigate,
}: {
  role: DemoRole;
  session: DemoSession;
  data: DemoWorkspace;
  onNavigate: (page: DashboardPageId) => void;
}) {
  const stats = getStats(data, role);
  const animalGroups = visibleAnimals(data, role).reduce<Record<string, number>>(
    (groups, animal) => {
      groups[animal.species] = (groups[animal.species] ?? 0) + 1;
      return groups;
    },
    {},
  );
  const totalAnimals = Object.values(animalGroups).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-muted text-sm">
            {new Intl.DateTimeFormat("en-GH", {
              weekday: "long",
              day: "numeric",
              month: "long",
            }).format(new Date())}
          </p>
          <h1 className="mt-1 text-2xl sm:text-[28px]">Hello, {session.name.split(" ")[0]}</h1>
          <p className="text-muted mt-1 text-sm">Here’s a summary of your demo workspace.</p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate(role === "pharmacy" ? "inventory" : "appointments")}
          className="bg-forest hover:bg-deep inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition-colors"
        >
          <CalendarDays className="size-4" aria-hidden="true" />
          {role === "pharmacy" ? "Manage inventory" : "View schedule"}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 55}>
            <article className="border-line flex min-h-[130px] items-start justify-between rounded-xl border bg-white p-5">
              <div>
                <p className="text-muted text-sm">{stat.label}</p>
                <p className="text-ink mt-2 text-[26px] leading-none font-semibold">{stat.value}</p>
                <p className="text-muted mt-2 text-xs">{stat.note}</p>
              </div>
              <span className="text-forest grid size-10 place-items-center rounded-lg bg-[#edf4e7]">
                <stat.icon className="size-[19px]" aria-hidden="true" />
              </span>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <ActivityChart data={data} role={role} />
        </Reveal>
        <Reveal delay={90}>
          <StatusChart data={data} role={role} />
        </Reveal>
      </div>

      {totalAnimals ? (
        <section className="border-line rounded-xl border bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base">Animals by species</h2>
              <p className="text-muted mt-1 text-xs">Based on saved demo animal records</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("animals")}
              className="text-forest text-xs font-semibold hover:underline"
            >
              View animals
            </button>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(animalGroups).map(([species, count]) => (
              <div key={species}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-body">{species}</span>
                  <span className="text-muted">{count}</span>
                </div>
                <div
                  className="bg-surface h-2 overflow-hidden rounded-full"
                  role="img"
                  aria-label={`${species}: ${count} of ${totalAnimals} animals`}
                >
                  <div
                    className="bg-forest h-full rounded-full transition-[width] duration-700"
                    style={{ width: `${(count / totalAnimals) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <UpcomingTable data={data} role={role} />

      {role === "vet" || role === "farmer" || role === "keeper" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="border-line rounded-xl border bg-white p-5">
            <div className="flex items-center gap-2">
              <Clock3 className="text-forest size-[18px]" aria-hidden="true" />
              <h2 className="text-base">Next steps</h2>
            </div>
            <ul className="divide-line mt-3 divide-y">
              {data.tasks
                .filter((task) => !task.complete && (!task.role || task.role === role))
                .slice(0, 3)
                .map((task) => (
                  <li key={task.id} className="flex items-center justify-between gap-3 py-3">
                    <span>
                      <span className="text-ink block text-sm font-medium">{task.title}</span>
                      <span className="text-muted text-xs">{task.animalName ?? task.kind}</span>
                    </span>
                    <span className="text-muted shrink-0 text-xs">{formatDate(task.dueDate)}</span>
                  </li>
                ))}
            </ul>
            <button
              type="button"
              onClick={() =>
                onNavigate(role === "farmer" || role === "keeper" ? "reminders" : "tasks")
              }
              className="text-forest mt-2 text-xs font-semibold hover:underline"
            >
              View reminders and tasks
            </button>
          </section>
          <section className="border-line rounded-xl border bg-white p-5">
            <div className="flex items-center gap-2">
              <PawPrint className="text-forest size-[18px]" aria-hidden="true" />
              <h2 className="text-base">Care to keep in view</h2>
            </div>
            <ul className="divide-line mt-3 divide-y">
              {visibleAnimals(data, role)
                .slice(0, 3)
                .map((animal) => (
                  <li key={animal.id} className="flex items-center justify-between gap-3 py-3">
                    <span>
                      <span className="text-ink block text-sm font-medium">{animal.name}</span>
                      <span className="text-muted text-xs">
                        {animal.species} · {animal.group}
                      </span>
                    </span>
                    <span className="text-muted shrink-0 text-xs">
                      Next care {formatDate(animal.nextCare)}
                    </span>
                  </li>
                ))}
            </ul>
            <button
              type="button"
              onClick={() => onNavigate("animals")}
              className="text-forest mt-2 text-xs font-semibold hover:underline"
            >
              View animal records
            </button>
          </section>
        </div>
      ) : null}
    </div>
  );
}

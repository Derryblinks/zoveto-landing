import { ArrowDownToLine, Check, CircleAlert, FileText, Plus } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import type { DemoSession } from "@/auth/demo-session";
import { ROLE_LABELS } from "@/components/dashboard/dashboard-config";
import { StatusBadge } from "@/components/dashboard/dashboard-status-badge";
import { Button } from "@/components/ui/button";
import {
  createId,
  updateWorkspace,
  type DemoRole,
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
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-line rounded-xl border bg-white">
      <header className="border-line flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
        <div>
          <h2 className="text-base">{title}</h2>
          {description ? <p className="text-muted mt-0.5 text-xs">{description}</p> : null}
        </div>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="border-line flex min-h-36 flex-col items-center justify-center rounded-lg border border-dashed px-5 py-8 text-center">
      <FileText className="text-muted size-6" aria-hidden="true" />
      <p className="text-body mt-3 text-sm">{message}</p>
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

export function FinancesPage({ data, search }: { data: DemoWorkspace; search: string }) {
  const feedback = useActionFeedback();
  const [showForm, setShowForm] = useState(false);
  const payments = data.payments.filter((payment) =>
    `${payment.label} ${payment.status}`.toLowerCase().includes(search.toLowerCase()),
  );
  const paidTotal = data.payments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const outstandingTotal = data.payments
    .filter((payment) => payment.status === "Outstanding")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const addPayment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const label = String(form.get("label") ?? "").trim();
    const amount = Number(form.get("amount"));
    const statusValue = form.get("status");
    if (!label || !Number.isFinite(amount) || amount <= 0) {
      feedback.run(() => {
        throw new Error("Enter a description and a positive amount.");
      }, "");
      return;
    }
    if (statusValue !== "Paid" && statusValue !== "Outstanding") {
      feedback.run(() => {
        throw new Error("Choose a valid payment status.");
      }, "");
      return;
    }
    const payment = {
      id: createId("payment"),
      label,
      amount,
      date: String(form.get("date") ?? localDate()),
      status: statusValue === "Paid" ? ("Paid" as const) : ("Outstanding" as const),
    };
    if (
      feedback.run(
        () =>
          updateWorkspace((current) => ({
            ...current,
            payments: [payment, ...current.payments],
          })),
        "Payment record saved locally.",
      )
    ) {
      formElement.reset();
      setShowForm(false);
    }
  };

  const changePayment = (id: string, status: "Paid" | "Outstanding") =>
    feedback.run(
      () =>
        updateWorkspace((current) => ({
          ...current,
          payments: current.payments.map((item) => (item.id === id ? { ...item, status } : item)),
        })),
      `Payment marked ${status.toLowerCase()}.`,
    );

  return (
    <>
      <PageHeading
        title="Finances"
        description="Keep a simple record of practice charges and payments. No payment is processed by this demo."
        action={
          <Button variant="primary" onClick={() => setShowForm((open) => !open)}>
            <Plus className="size-4" aria-hidden="true" />
            Record payment
          </Button>
        }
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="border-line rounded-xl border bg-white p-5">
          <p className="text-muted text-sm">Recorded as paid</p>
          <p className="text-ink mt-2 text-2xl font-semibold">{formatCurrency(paidTotal)}</p>
        </div>
        <div className="border-line rounded-xl border bg-white p-5">
          <p className="text-muted text-sm">Outstanding in sample records</p>
          <p className="text-ink mt-2 text-2xl font-semibold">{formatCurrency(outstandingTotal)}</p>
        </div>
      </div>
      <div className="space-y-4">
        {showForm ? (
          <Panel title="Add a payment record">
            <form onSubmit={addPayment} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="text-body text-xs font-medium">
                Description
                <input className={`${FIELD} mt-1.5`} name="label" required maxLength={100} />
              </label>
              <label className="text-body text-xs font-medium">
                Amount (GHS)
                <input
                  className={`${FIELD} mt-1.5`}
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                />
              </label>
              <label className="text-body text-xs font-medium">
                Date
                <input
                  className={`${FIELD} mt-1.5`}
                  name="date"
                  type="date"
                  required
                  defaultValue={localDate()}
                />
              </label>
              <label className="text-body text-xs font-medium">
                Status
                <select className={`${FIELD} mt-1.5`} name="status">
                  <option>Outstanding</option>
                  <option>Paid</option>
                </select>
              </label>
              <Button type="submit" variant="primary" className="sm:col-span-2 lg:col-span-4">
                Save record
              </Button>
            </form>
          </Panel>
        ) : null}
        {feedback.message ? <ActionMessage>{feedback.message}</ActionMessage> : null}
        {feedback.error ? <ErrorMessage>{feedback.error}</ErrorMessage> : null}
        <Panel
          title="Payment records"
          description="Illustrative figures only; not connected to a payment provider."
        >
          {payments.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-muted text-xs">
                  <tr>
                    {["Description", "Date", "Amount", "Status", "Update"].map((item) => (
                      <th key={item} className="px-3 py-2 font-medium">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-line border-t">
                      <td className="text-ink px-3 py-3 font-medium">{payment.label}</td>
                      <td className="px-3 py-3">{formatDate(payment.date)}</td>
                      <td className="px-3 py-3">{formatCurrency(payment.amount)}</td>
                      <td className="px-3 py-3">
                        <StatusBadge>{payment.status}</StatusBadge>
                      </td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            changePayment(
                              payment.id,
                              payment.status === "Paid" ? "Outstanding" : "Paid",
                            )
                          }
                          className="text-forest text-xs font-semibold hover:underline"
                        >
                          Mark {payment.status === "Paid" ? "outstanding" : "paid"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="No payment records match your search." />
          )}
        </Panel>
      </div>
    </>
  );
}

export function VerificationsPage({ data, search }: { data: DemoWorkspace; search: string }) {
  const feedback = useActionFeedback();
  const profiles = data.profiles
    .filter((profile) => profile.role === "vet" || profile.role === "pharmacy")
    .filter((profile) =>
      `${profile.name} ${profile.email} ${profile.role}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  const verify = (id: string) =>
    feedback.run(
      () =>
        updateWorkspace((current) => ({
          ...current,
          profiles: current.profiles.map((profile) =>
            profile.id === id ? { ...profile, verified: true } : profile,
          ),
        })),
      "Sample profile marked reviewed on this device.",
    );

  return (
    <>
      <PageHeading
        title="Verification queue"
        description="Local-only review preview. No credentials are collected or verified by this demo."
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
        title="Professional and pharmacy profiles"
        description="A real verification workflow requires trusted server-side review."
      >
        {profiles.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="text-muted text-xs">
                <tr>
                  {["Profile", "Role", "Submitted", "Review status", "Action"].map((item) => (
                    <th key={item} className="px-3 py-2 font-medium">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id} className="border-line border-t">
                    <td className="px-3 py-3">
                      <span className="text-ink block font-medium">{profile.name}</span>
                      <span className="text-muted text-xs">{profile.email}</span>
                    </td>
                    <td className="px-3 py-3">{ROLE_LABELS[profile.role]}</td>
                    <td className="px-3 py-3">{formatDate(profile.createdAt)}</td>
                    <td className="px-3 py-3">
                      <StatusBadge>{profile.verified ? "Reviewed" : "Pending review"}</StatusBadge>
                    </td>
                    <td className="px-3 py-3">
                      {profile.verified ? (
                        <span className="text-muted text-xs">No action</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => verify(profile.id)}
                          className="text-forest text-xs font-semibold hover:underline"
                        >
                          Mark reviewed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No professional profiles match this search." />
        )}
      </Panel>
    </>
  );
}

export function UsersPage({ data, search }: { data: DemoWorkspace; search: string }) {
  const profiles = data.profiles.filter((profile) =>
    `${profile.name} ${profile.email} ${ROLE_LABELS[profile.role]}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        title="User directory"
        description="Sample profiles stored in this browser. Sign-in is not authenticated."
      />
      <Panel title="Profiles" description={`${profiles.length} local demo profiles`}>
        {profiles.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-left text-sm">
              <thead className="text-muted text-xs">
                <tr>
                  {["Name", "Email", "Role", "Added", "Status"].map((item) => (
                    <th key={item} className="px-3 py-2 font-medium">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id} className="border-line border-t">
                    <td className="text-ink px-3 py-3 font-medium">{profile.name}</td>
                    <td className="px-3 py-3">{profile.email}</td>
                    <td className="px-3 py-3">{ROLE_LABELS[profile.role]}</td>
                    <td className="px-3 py-3">{formatDate(profile.createdAt)}</td>
                    <td className="px-3 py-3">
                      <StatusBadge>{profile.verified ? "Reviewed" : "Demo profile"}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No profiles match your search." />
        )}
      </Panel>
    </>
  );
}

export function SubscriptionsPage() {
  return (
    <>
      <PageHeading
        title="Subscriptions"
        description="Plan and billing status for veterinary professionals."
      />
      <div className="bg-cream/60 text-deep mb-4 rounded-lg p-4 text-sm">
        Billing is not connected in this local demo. No subscription will be activated and no
        payment will be taken.
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Free membership" description="Available as a demo profile">
          <ul className="text-body space-y-2 text-sm">
            <li>Professional profile preview</li>
            <li>Appointment and sample record views</li>
            <li>Local-only workspace data</li>
          </ul>
          <StatusBadge>Demo only</StatusBadge>
        </Panel>
        <Panel title="Paid plans" description="Names, prices and privileges are not configured">
          <p className="text-body text-sm">
            A secure payment provider and server-side transaction verification are required before
            billing can be enabled.
          </p>
          <span className="text-muted mt-4 inline-block text-xs">
            No checkout action is available in this preview.
          </span>
        </Panel>
      </div>
    </>
  );
}

export function ReportsPage({ role, data }: { role: DemoRole; data: DemoWorkspace }) {
  const today = localDate();
  const expiryWindowEnd = new Date(`${today}T12:00:00`);
  expiryWindowEnd.setDate(expiryWindowEnd.getDate() + 60);
  const expiryEnd = expiryWindowEnd.toISOString().slice(0, 10);
  const products =
    role === "pharmacy"
      ? data.products.filter((item) => item.listedBy === "pharmacy")
      : data.products;
  const lowStock = products.filter((item) => item.quantity <= 5);
  const soonExpiry = products.filter((item) => {
    return item.expiresOn >= today && item.expiresOn <= expiryEnd;
  });
  const exportCsv = () => {
    const rows = [["Product", "Category", "Quantity", "Batch", "Expiry", "Restricted"]];
    for (const product of products) {
      rows.push([
        product.name,
        product.category,
        String(product.quantity),
        product.batch,
        product.expiresOn,
        product.restricted ? "Yes" : "No",
      ]);
    }
    const csv = rows
      .map((row) =>
        row
          .map((field) => {
            const safeField = /^[=+\-@\t\r]/.test(field) ? `'${field}` : field;
            return `"${safeField.replaceAll('"', '""')}"`;
          })
          .join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `zoveto-stock-${localDate()}.csv`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <>
      <PageHeading
        title={role === "pharmacy" ? "Stock report" : "Platform reports"}
        description="Summary calculated from sample data saved in this browser."
        action={
          <Button variant="outline" onClick={exportCsv}>
            <ArrowDownToLine className="size-4" aria-hidden="true" />
            Export stock CSV
          </Button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="border-line rounded-xl border bg-white p-5">
          <p className="text-muted text-sm">Products tracked</p>
          <p className="text-ink mt-2 text-2xl font-semibold">{products.length}</p>
        </div>
        <div className="border-line rounded-xl border bg-white p-5">
          <p className="text-muted text-sm">Low-stock items</p>
          <p className="text-ink mt-2 text-2xl font-semibold">{lowStock.length}</p>
        </div>
        <div className="border-line rounded-xl border bg-white p-5">
          <p className="text-muted text-sm">Expiring within 60 days</p>
          <p className="text-ink mt-2 text-2xl font-semibold">{soonExpiry.length}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Low stock" description="Five or fewer units in the sample inventory">
          {lowStock.length ? (
            <ul className="divide-line divide-y">
              {lowStock.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span>
                    <span className="text-ink block text-sm font-medium">{product.name}</span>
                    <span className="text-muted text-xs">{product.category}</span>
                  </span>
                  <StatusBadge>{`${product.quantity} left`}</StatusBadge>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="No products are low in stock." />
          )}
        </Panel>
        <Panel title="Expiry watch" description="Product dates are illustrative only">
          {soonExpiry.length ? (
            <ul className="divide-line divide-y">
              {soonExpiry.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span>
                    <span className="text-ink block text-sm font-medium">{product.name}</span>
                    <span className="text-muted text-xs">Batch {product.batch}</span>
                  </span>
                  <span className="text-muted text-xs">{formatDate(product.expiresOn)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="No sample products expire within 60 days." />
          )}
        </Panel>
      </div>
    </>
  );
}

export function ProfilePage({
  session,
  onProfileChange,
}: {
  session: DemoSession;
  onProfileChange: (session: DemoSession) => void;
}) {
  const feedback = useActionFeedback();
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "")
      .trim()
      .toLowerCase();
    if (name.length < 2 || !email.includes("@")) {
      feedback.run(() => {
        throw new Error("Enter a valid name and email address.");
      }, "");
      return;
    }
    feedback.run(() => {
      const workspace = updateWorkspace((current) => ({
        ...current,
        profiles: current.profiles.map((item) =>
          item.id === session.profileId ? { ...item, name, email } : item,
        ),
      }));
      const profile = workspace.profiles.find((item) => item.id === session.profileId);
      if (!profile) throw new Error("Demo profile is no longer available.");
      onProfileChange({ ...session, name: profile.name, email: profile.email });
    }, "Demo profile updated on this device.");
  };
  return (
    <>
      <PageHeading
        title="Profile settings"
        description="Update the demo identity used in this browser."
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
      <Panel title="Your profile" description={`Workspace role: ${ROLE_LABELS[session.role]}`}>
        <form onSubmit={save} className="grid max-w-2xl gap-4 sm:grid-cols-2">
          <label className="text-body text-sm font-medium">
            Name
            <input
              className={`${FIELD} mt-1.5`}
              name="name"
              required
              minLength={2}
              defaultValue={session.name}
            />
          </label>
          <label className="text-body text-sm font-medium">
            Email
            <input
              className={`${FIELD} mt-1.5`}
              name="email"
              type="email"
              required
              defaultValue={session.email}
            />
          </label>
          <p className="text-muted text-xs sm:col-span-2">
            Changes are stored locally. There is no password reset or identity verification in this
            preview.
          </p>
          <Button type="submit" variant="primary" className="sm:col-span-2">
            Save profile
          </Button>
        </form>
      </Panel>
    </>
  );
}

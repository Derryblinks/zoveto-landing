import { ArrowLeft, PawPrint } from "lucide-react";
import { useState, type FormEvent } from "react";
import { saveDemoSession } from "@/auth/demo-session";
import { loginLink, registerLink, type Role } from "@/config/site";
import { upsertDemoProfile, type DemoRole } from "@/data/demo-workspace";
import { navigate } from "@/lib/router";
import { Button, ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const ROLES: { value: Role; label: string }[] = [
  { value: "farmer", label: "Livestock farmer" },
  { value: "keeper", label: "Animal keeper" },
  { value: "vet", label: "Veterinary professional" },
  { value: "pharmacy", label: "Veterinary pharmacy" },
];

const LABELS: Record<DemoRole, string> = {
  farmer: "Farmer",
  keeper: "Animal keeper",
  vet: "Veterinary professional",
  pharmacy: "Pharmacy",
  admin: "Administrator",
};

function safeNextPath(next: string | undefined, role: DemoRole) {
  if (!next?.startsWith("/dashboard/") || next.startsWith("//")) return `/dashboard/${role}`;
  return next.split("/")[2] === role ? next : `/dashboard/${role}`;
}

export function AuthPage({
  mode,
  initialRole,
  next,
}: {
  mode: "login" | "register";
  initialRole?: Role;
  next?: string;
}) {
  const isRegister = mode === "register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(initialRole ?? "keeper");
  const [error, setError] = useState("");

  const finishDemoSignIn = (
    selectedRole: DemoRole,
    selectedEmail: string,
    selectedName?: string,
  ) => {
    try {
      const cleanEmail = selectedEmail.trim().toLowerCase();
      const fallbackName = cleanEmail.split("@")[0]?.replace(/[._-]/g, " ") || "Demo user";
      const userName = selectedName?.trim() || fallbackName;
      const profile = upsertDemoProfile(userName, cleanEmail, selectedRole);

      saveDemoSession({
        profileId: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role,
      });
      setError("");
      navigate(safeNextPath(next, selectedRole));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not open the demo workspace.");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    if (isRegister && name.trim().length < 2) {
      setError("Enter your name to create a demo profile.");
      return;
    }
    if (isRegister && password.length < 8) {
      setError("Use at least 8 characters for the demo password.");
      return;
    }
    finishDemoSignIn(role, email, isRegister ? name : undefined);
  };

  return (
    <main className="bg-surface flex min-h-screen flex-col px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-[1080px] items-center justify-between">
        <a href="/" aria-label="ZOVETO home">
          <Logo />
        </a>
        <ButtonLink href="/" variant="outline" size="sm">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </ButtonLink>
      </div>

      <section
        aria-labelledby="auth-title"
        className="border-line bg-card mx-auto my-6 grid w-full max-w-[1080px] flex-1 overflow-hidden rounded-[24px] border md:my-10 md:min-h-[640px] md:grid-cols-[0.88fr_1fr]"
      >
        <div className="bg-deep relative hidden min-h-[640px] overflow-hidden p-10 text-white md:flex md:flex-col md:justify-between lg:p-12">
          <img
            src="/images/veterinary-care.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover opacity-25"
          />
          <div className="from-deep via-deep/75 to-deep/35 absolute inset-0 bg-linear-to-t" />
          <div className="relative">
            <span className="bg-sage text-deep mb-6 grid size-12 place-items-center rounded-xl">
              <PawPrint className="size-6" aria-hidden="true" />
            </span>
            <p className="text-cream text-sm font-semibold">For the people who care for animals</p>
            <h1 className="mt-3 max-w-[13ch] text-4xl leading-tight text-white">
              Good care starts with good connections.
            </h1>
          </div>
          <p className="relative max-w-[38ch] text-sm text-white/75">
            This local preview uses sample information only. It does not create a real account or
            send data to a server.
          </p>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-[430px]">
            <p className="text-forest text-sm font-semibold">
              {isRegister ? "Create your profile" : "Welcome back"}
            </p>
            <h2 id="auth-title" className="mt-2 text-3xl">
              {isRegister ? "Get started with ZOVETO" : "Sign in to your workspace"}
            </h2>
            <p className="text-muted mt-2 text-[15px]">
              {isRegister
                ? "Choose your role to open the right workspace."
                : "Use the demo sign-in to open a role-specific workspace."}
            </p>

            <div className="border-line bg-surface mt-5 rounded-xl border p-3.5 text-sm">
              <b className="text-ink block">Demo mode</b>
              <span>
                No real authentication is active. Passwords are never saved; demo profiles and
                workspace data stay in this browser.
              </span>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {isRegister ? (
                <label className="text-ink block text-sm font-medium" htmlFor="full-name">
                  Full name
                  <input
                    id="full-name"
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="border-line focus:border-forest text-body mt-1.5 min-h-12 w-full rounded-lg border bg-white px-3.5 font-normal transition outline-none"
                  />
                </label>
              ) : null}
              <label className="text-ink block text-sm font-medium" htmlFor="email">
                Email address
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="border-line focus:border-forest text-body mt-1.5 min-h-12 w-full rounded-lg border bg-white px-3.5 font-normal transition outline-none"
                />
              </label>
              <label className="text-ink block text-sm font-medium" htmlFor="password">
                Password
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  required
                  minLength={isRegister ? 8 : undefined}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="border-line focus:border-forest text-body mt-1.5 min-h-12 w-full rounded-lg border bg-white px-3.5 font-normal transition outline-none"
                />
                {!isRegister ? (
                  <span className="text-muted mt-1 block text-xs">
                    Demo only: this password is not checked or stored.
                  </span>
                ) : null}
              </label>
              <label className="text-ink block text-sm font-medium" htmlFor="role">
                {isRegister ? "I am a…" : "Open workspace as"}
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(event) => setRole(event.target.value as Role)}
                  className="border-line focus:border-forest text-body mt-1.5 min-h-12 w-full rounded-lg border bg-white px-3.5 font-normal outline-none"
                >
                  {ROLES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              {error ? (
                <p className="text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}
              <Button type="submit" variant="primary" className="min-h-12 w-full">
                {isRegister ? "Create demo profile" : "Sign in"}
              </Button>
            </form>

            {!isRegister ? (
              <div className="border-line mt-6 border-t pt-5">
                <p className="text-ink text-sm font-semibold">Or explore a sample workspace</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ROLES.map((item) => (
                    <Button
                      key={item.value}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        finishDemoSignIn(item.value, `demo.${item.value}@zoveto.local`)
                      }
                    >
                      {item.label}
                    </Button>
                  ))}
                  {import.meta.env.DEV ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => finishDemoSignIn("admin", "admin@zoveto.local", "Demo admin")}
                    >
                      Admin preview
                    </Button>
                  ) : null}
                </div>
              </div>
            ) : null}

            <p className="text-muted mt-6 text-center text-sm">
              {isRegister ? "Already have a demo profile?" : "New to ZOVETO?"}{" "}
              <ButtonLink
                href={isRegister ? loginLink() : registerLink(role)}
                className="text-forest font-semibold hover:underline"
              >
                {isRegister ? "Sign in" : "Create a profile"}
              </ButtonLink>
            </p>
            <span className="sr-only">{LABELS[role]}</span>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { ReactNode } from "react";
import { readDemoSession } from "@/auth/demo-session";
import { DashboardPage } from "@/components/pages/dashboard-page";
import { LandingPage } from "@/components/pages/landing-page";
import { AuthPage } from "@/components/pages/auth-page";
import { isDashboardPage } from "@/components/dashboard/dashboard-config";
import { AppLink } from "@/components/ui/app-link";
import { ButtonLink } from "@/components/ui/button";
import type { DemoRole } from "@/data/demo-workspace";
import { useRoute } from "@/hooks/use-route";

export function App() {
  const route = useRoute();
  const [pathname = "/", query = ""] = route.split("?", 2);
  const title =
    pathname === "/login"
      ? "Sign in | ZOVETO"
      : pathname === "/register"
        ? "Create a profile | ZOVETO"
        : pathname.startsWith("/dashboard")
          ? "ZOVETO workspace"
          : pathname === "/"
            ? "ZOVETO | Animal care and veterinary services in Ghana"
            : "Page not found | ZOVETO";

  const content = (() => {
    if (pathname === "/") return <LandingPage />;
    if (pathname === "/login" || pathname === "/register") {
      const params = new URLSearchParams(query);
      const intendedRole = params.get("next")?.split("/")[2];
      const requestedRole = params.get("role") ?? intendedRole;
      const initialRole =
        requestedRole === "farmer" ||
        requestedRole === "keeper" ||
        requestedRole === "vet" ||
        requestedRole === "pharmacy"
          ? requestedRole
          : undefined;
      return (
        <AuthPage
          mode={pathname === "/register" ? "register" : "login"}
          initialRole={initialRole}
          next={params.get("next") ?? undefined}
        />
      );
    }

    if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
      let session;
      try {
        session = readDemoSession();
      } catch (error) {
        return (
          <RouteMessage
            message={error instanceof Error ? error.message : "The demo session is invalid."}
          />
        );
      }

      if (!session) {
        const intendedRole = pathname.split("/")[2];
        const initialRole =
          intendedRole === "farmer" ||
          intendedRole === "keeper" ||
          intendedRole === "vet" ||
          intendedRole === "pharmacy"
            ? intendedRole
            : undefined;
        return <AuthPage mode="login" initialRole={initialRole} next={pathname} />;
      }
      if (pathname === "/dashboard") {
        return <DashboardPage role={session.role} page="overview" session={session} />;
      }

      const [, , routeRole, routePage] = pathname.split("/");
      const role = routeRole as DemoRole;
      if (
        (role !== "farmer" &&
          role !== "keeper" &&
          role !== "vet" &&
          role !== "pharmacy" &&
          role !== "admin") ||
        (role === "admin" && !import.meta.env.DEV)
      ) {
        return <RouteMessage message="That workspace page does not exist." />;
      }
      if (session.role !== role) {
        return (
          <RouteMessage
            message={`This demo is signed in as ${session.name} (${session.role}). Sign in with the right role to switch workspaces.`}
            action={<ButtonLink href="/login">Switch demo role</ButtonLink>}
          />
        );
      }

      const page = routePage ?? "overview";
      if (!isDashboardPage(role, page)) {
        return <RouteMessage message="That workspace page does not exist." />;
      }
      return <DashboardPage role={role} page={page} session={session} />;
    }

    return <RouteMessage message="We couldn’t find that page." />;
  })();

  return (
    <>
      <title>{title}</title>
      {content}
    </>
  );
}

function RouteMessage({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <main className="bg-surface grid min-h-screen place-items-center px-6 py-12">
      <div className="border-line w-full max-w-lg rounded-2xl border bg-white p-8 text-center">
        <h1 className="text-2xl">Let’s get you back on track</h1>
        <p className="text-muted mt-3">{message}</p>
        <div className="mt-6 flex justify-center gap-3">
          {action ?? (
            <ButtonLink href="/login" variant="primary">
              Sign in
            </ButtonLink>
          )}
          <AppLink
            href="/"
            className="text-forest inline-flex min-h-11 items-center px-3 text-sm font-semibold"
          >
            Home
          </AppLink>
        </div>
      </div>
    </main>
  );
}

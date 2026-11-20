import { Bell, LogOut, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import type { DemoSession } from "@/auth/demo-session";
import { AppLink } from "@/components/ui/app-link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import type { DemoNotification, DemoRole } from "@/data/demo-workspace";
import { clearDemoSession } from "@/auth/demo-session";
import { navigate } from "@/lib/router";
import {
  DASHBOARD_NAV,
  dashboardHref,
  ROLE_LABELS,
  type DashboardPageId,
} from "./dashboard-config";

function NavigationList({
  role,
  page,
  onNavigate,
}: {
  role: DemoRole;
  page: DashboardPageId;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Workspace" className="space-y-1">
      {DASHBOARD_NAV[role].map((item) => (
        <AppLink
          key={item.id}
          href={dashboardHref(role, item.id)}
          onClick={onNavigate}
          aria-current={page === item.id ? "page" : undefined}
          className={[
            "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
            page === item.id
              ? "text-forest bg-[#edf4e7]"
              : "text-body hover:bg-surface hover:text-ink",
          ].join(" ")}
        >
          <item.icon className="size-[18px] shrink-0" aria-hidden="true" />
          {item.label}
        </AppLink>
      ))}
    </nav>
  );
}

export function DashboardShell({
  role,
  page,
  session,
  notifications,
  search,
  onSearch,
  onMarkAllRead,
  children,
}: {
  role: DemoRole;
  page: DashboardPageId;
  session: DemoSession;
  notifications: DemoNotification[];
  search: string;
  onSearch: (value: string) => void;
  onMarkAllRead: () => void;
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const logout = () => {
    clearDemoSession();
    navigate("/");
  };

  return (
    <div className="app-light-theme bg-surface min-h-screen">
      <aside className="border-line fixed inset-y-0 left-0 z-30 hidden w-[252px] flex-col border-r bg-white px-4 py-5 md:flex">
        <AppLink href="/" aria-label="ZOVETO home" className="mb-8 px-2">
          <Logo />
        </AppLink>
        <p className="text-muted mb-3 px-3 text-[11px] font-semibold tracking-[0.12em] uppercase">
          {ROLE_LABELS[role]}
        </p>
        <NavigationList role={role} page={page} />
        <div className="mt-auto">
          <div className="border-line bg-surface rounded-lg border p-3">
            <p className="text-ink text-xs font-semibold">Local demo workspace</p>
            <p className="text-muted mt-1 text-xs leading-relaxed">
              Sample data is saved in this browser only.
            </p>
          </div>
          <Button variant="outline" className="mt-3 w-full justify-start" onClick={logout}>
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </Button>
        </div>
      </aside>

      <div className="md:ml-[252px]">
        <header className="border-line sticky top-0 z-20 border-b bg-white">
          <div className="flex min-h-[72px] items-center gap-3 px-4 sm:px-7">
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close workspace menu" : "Open workspace menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="text-ink border-line grid size-10 shrink-0 place-items-center rounded-lg border md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
            <div className="hidden min-w-0 flex-1 items-center gap-4 sm:flex">
              <label className="border-line bg-bg flex h-10 max-w-[360px] flex-1 items-center gap-2 rounded-full border px-3.5">
                <Search className="text-muted size-4 shrink-0" aria-hidden="true" />
                <span className="sr-only">Search this page</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => onSearch(event.target.value)}
                  placeholder="Search this page…"
                  className="text-ink placeholder:text-muted min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </label>
            </div>
            <div className="ml-auto flex items-center gap-2 sm:ml-0">
              <div className="relative">
                <Button
                  variant="outline"
                  aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
                  aria-expanded={notificationsOpen}
                  aria-controls="notification-panel"
                  className="relative size-10 rounded-full p-0"
                  onClick={() => setNotificationsOpen((open) => !open)}
                >
                  <Bell className="size-[18px]" aria-hidden="true" />
                  {unreadCount ? (
                    <span className="bg-forest absolute -top-1 -right-1 grid size-5 place-items-center rounded-full text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  ) : null}
                </Button>
                {notificationsOpen ? (
                  <div
                    id="notification-panel"
                    aria-label="Notifications"
                    className="border-line absolute top-12 right-0 z-40 w-[min(340px,calc(100vw-2rem))] rounded-xl border bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-base">Notifications</h2>
                      <button
                        type="button"
                        onClick={onMarkAllRead}
                        className="text-forest text-xs font-semibold hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {notifications.length ? (
                        notifications.slice(0, 5).map((notification) => (
                          <li key={notification.id} className="border-line rounded-lg border p-3">
                            <p className="text-sm font-semibold">{notification.title}</p>
                            <p className="text-muted mt-0.5 text-xs">{notification.detail}</p>
                          </li>
                        ))
                      ) : (
                        <li className="text-muted py-4 text-center text-sm">
                          You’re all caught up.
                        </li>
                      )}
                    </ul>
                    <p className="text-muted mt-3 text-[11px]">
                      Sample alerts only. No messages are sent.
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="border-line hidden items-center gap-2.5 border-l pl-3 sm:flex">
                <span className="bg-sage/40 text-forest grid size-9 place-items-center rounded-full text-sm font-bold">
                  {session.name.slice(0, 1).toUpperCase()}
                </span>
                <div className="hidden min-w-0 lg:block">
                  <p className="text-ink max-w-36 truncate text-sm font-semibold">{session.name}</p>
                  <p className="text-muted text-xs">{ROLE_LABELS[role]}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="hidden sm:inline-flex md:hidden"
              >
                Sign out
              </Button>
            </div>
          </div>
          <div className="border-line border-t px-4 py-2 sm:hidden">
            <label className="bg-bg border-line flex h-10 items-center gap-2 rounded-lg border px-3">
              <Search className="text-muted size-4" aria-hidden="true" />
              <span className="sr-only">Search this page</span>
              <input
                type="search"
                value={search}
                onChange={(event) => onSearch(event.target.value)}
                placeholder="Search this page…"
                className="text-ink min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </label>
          </div>
          {mobileMenuOpen ? (
            <div className="border-line border-t bg-white px-4 py-4 md:hidden">
              <p className="text-muted mb-2 px-3 text-xs font-semibold uppercase">
                {ROLE_LABELS[role]}
              </p>
              <NavigationList role={role} page={page} onNavigate={() => setMobileMenuOpen(false)} />
              <Button variant="outline" onClick={logout} className="mt-3 w-full justify-start">
                <LogOut className="size-4" aria-hidden="true" />
                Sign out
              </Button>
            </div>
          ) : null}
        </header>

        <main id="dashboard-main" className="mx-auto max-w-[1450px] px-4 py-6 sm:px-7 sm:py-8">
          <div className="bg-cream/60 text-deep mb-6 flex items-start gap-2 rounded-lg px-3.5 py-2.5 text-xs sm:items-center sm:text-sm">
            <span className="bg-forest mt-1 size-2 shrink-0 rounded-full sm:mt-0" />
            <p>
              Demo workspace · Sample data saved on this device only. This is not a secure account
              or a live veterinary record system.
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

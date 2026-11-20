import { useSyncExternalStore } from "react";

const subscribe = (listener: () => void) => {
  window.addEventListener("popstate", listener);
  return () => window.removeEventListener("popstate", listener);
};

const getSnapshot = () => `${window.location.pathname}${window.location.search}`;

export function useRoute() {
  return useSyncExternalStore(subscribe, getSnapshot, () => "/");
}
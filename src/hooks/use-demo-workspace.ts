import { useSyncExternalStore } from "react";
import {
  getWorkspaceSnapshot,
  parseWorkspace,
  subscribeWorkspace,
} from "@/data/demo-workspace";

export function useDemoWorkspace() {
  const snapshot = useSyncExternalStore(
    subscribeWorkspace,
    getWorkspaceSnapshot,
    () => JSON.stringify({}),
  );
  return parseWorkspace(snapshot);
}

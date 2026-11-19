export function navigate(path: string, replace = false) {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("Only same-origin application routes are supported.");
  }

  if (replace) {
    window.history.replaceState(null, "", path);
  } else {
    window.history.pushState(null, "", path);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));
}
// Small fetch wrapper for talking to the backend API.
//
// In dev, Vite proxies `/api/*` to the backend (see vite.config.js),
// so this can stay a relative path. In production, set
// VITE_API_BASE_URL (e.g. https://api.yourdomain.com) at build time
// if the API is deployed on a different origin than the frontend.

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  let body = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body (e.g. 204) — leave body as null
  }

  if (!res.ok) {
    const error = new Error(body?.error || `Request failed: ${res.status}`);
    error.status = res.status;
    error.details = body?.details;
    throw error;
  }

  return body;
}

export const api = {
  getProjects: () => request("/api/projects"),
  getExperience: () => request("/api/experience"),
  getWritings: () => request("/api/writings"),
  getWriting: (slug) => request(`/api/writings/${slug}`),
  submitContact: (data) =>
    request("/api/contact", { method: "POST", body: JSON.stringify(data) }),
};

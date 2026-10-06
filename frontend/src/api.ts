export const API_URL = "http://localhost:3000";

export const getToken = () => localStorage.getItem("token");

interface Options {
    method?: string;
    body?: unknown;
    auth?: boolean;
}

export async function api(path: string, options: Options = {}) {
    const { method = "GET", body, auth = false } = options;

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (auth) headers.Authorization = `Bearer ${getToken()}`;

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.msg || data.message || "Request failed");
    }
    return data;
}
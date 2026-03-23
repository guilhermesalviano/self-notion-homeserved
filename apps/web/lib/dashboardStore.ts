const INTERVAL_MS = 20 * 60 * 1000;
const STALE_MS    = 30 * 60 * 1000;

type Status = "idle" | "loading" | "success" | "error";

interface StoreSlice<T> {
  data: T | null;
  status: Status;
  lastFetchedAt: number;
}

interface DashboardStore {
  weather: StoreSlice<any>;
  news: StoreSlice<any>;
  stocks: StoreSlice<any>;
}

type Listener = () => void;

let store: DashboardStore = {
  weather: { data: null, status: "idle", lastFetchedAt: 0 },
  news:    { data: null, status: "idle", lastFetchedAt: 0 },
  stocks:  { data: null, status: "idle", lastFetchedAt: 0 },
};

const listeners = new Set<Listener>();

function setState(patch: Partial<DashboardStore>) {
  store = { ...store, ...patch };
  listeners.forEach((l) => l());
}

function setSlice<K extends keyof DashboardStore>(
  key: K,
  patch: Partial<StoreSlice<any>>
) {
  setState({ [key]: { ...store[key], ...patch } });
}

async function fetchWeather() {
  setSlice("weather", { status: "loading" });
  try {
    const res = await fetch("/api/weather");
    if (!res.ok) throw new Error();
    const { data } = await res.json();
    setSlice("weather", { data, status: "success", lastFetchedAt: Date.now() });
  } catch {
    setSlice("weather", { status: "error" });
  }
}

async function fetchNews() {
  setSlice("news", { status: "loading" });
  try {
    const res = await fetch("/api/news");
    if (!res.ok) throw new Error();
    const { data } = await res.json();
    setSlice("news", { data, status: "success", lastFetchedAt: Date.now() });
  } catch {
    setSlice("news", { status: "error" });
  }
}

const fetchStocks = async () => {
  setSlice("stocks", { status: "loading" });
  try {
    const res = await fetch("/api/stocks");
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const { data } = await res.json();
    setSlice("stocks", { data, status: "success", lastFetchedAt: Date.now() });
  } catch {
    setSlice("stocks", { status: "error" });
  }
};

export async function fetchAll() {
  await Promise.all([fetchWeather(), fetchNews(), fetchStocks()]);
}

let intervalId: ReturnType<typeof setInterval> | null = null;
let subscriberCount = 0;

function startScheduler() {
  if (intervalId) return;
  fetchAll();
  intervalId = setInterval(fetchAll, INTERVAL_MS);

  document.addEventListener("visibilitychange", handleVisibility);
}

function stopScheduler() {
  if (intervalId) { clearInterval(intervalId); intervalId = null; }
  document.removeEventListener("visibilitychange", handleVisibility);
}

function handleVisibility() {
  if (document.visibilityState !== "visible") return;
  const now = Date.now();
  const weatherStale   = now - store.weather.lastFetchedAt > STALE_MS;
  const stocksStale    = now - store.stocks.lastFetchedAt  > STALE_MS;
  const newsStale      = now - store.news.lastFetchedAt    > STALE_MS;

  const tasks: Promise<void>[] = [];
  if (weatherStale) tasks.push(fetchWeather());
  if (stocksStale)  tasks.push(fetchStocks());
  if (newsStale)    tasks.push(fetchNews());

  if (tasks.length) {
    Promise.all(tasks);
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
    intervalId = setInterval(fetchAll, INTERVAL_MS);
  }
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  subscriberCount++;
  if (subscriberCount === 1) startScheduler();

  return () => {
    listeners.delete(listener);
    subscriberCount--;
    if (subscriberCount === 0) stopScheduler();
  };
}

export function getSnapshot(): DashboardStore {
  return store;
}
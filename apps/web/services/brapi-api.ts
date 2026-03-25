import { EXTERNAL_APIS_CONFIG } from "@/constants";
import { BrapiResponse } from "@/types/services";

export async function fetchBrapiAPI(stocks: string): Promise<BrapiResponse> {
  const API_KEY = process.env.BRAPI_TOKEN;

  const response = await fetch(`${EXTERNAL_APIS_CONFIG.BRAPI_BASE_URL}/quote/${stocks}?token=${API_KEY}`, {
    next: { revalidate: EXTERNAL_APIS_CONFIG.UPDATE_INTERVAL_MS }
  });
  const responseJson = await response.json();

  return responseJson;
}
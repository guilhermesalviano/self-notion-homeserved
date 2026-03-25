import { EXTERNAL_APIS_CONFIG } from "@/constants";
import { LocationResponse, NominatimProps } from "@/types/services";

export async function fetchNominatimAPI({latitude, longitude}: NominatimProps): Promise<LocationResponse> {
  const response = await fetch(`${EXTERNAL_APIS_CONFIG.NOMINATIM_BASE_URL}/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`, {
    next: { revalidate: EXTERNAL_APIS_CONFIG.UPDATE_INTERVAL_MS },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar dados da API externa 'Nominatim'");
  }

  const responseJson = await response.json();

  return responseJson;
}
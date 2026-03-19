export interface SerpApiGoogleNewsResponse {
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  top_stories_link: TopStoriesLink;
  news_results: NewsResult[];
  menu_links: MenuLink[];
}

interface SearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_news_url: string;
  raw_html_file: string;
  total_time_taken: number;
}

interface SearchParameters {
  engine: string;
  gl: string;
  hl: string;
}

interface TopStoriesLink {
  topic_token: string;
  serpapi_link: string;
}

interface NewsResultHighlight {
  title?: string;
  source?: string;
  link?: string;
}

export interface NewsResult {
  position: number;
  title: string;
  highlight?: NewsResultHighlight;
  stories?: string;
  source: string;
  link?: string;
  thumbnail?: string;
  snippet?: string;
  thumbnail_small?: string;
  story_token: string;
  serpapi_link: string;
  date: string;
  iso_date?: string;
}

interface MenuLink {
  title: string;
  topic_token: string;
  serpapi_link: string;
}

export async function fetchGoogleNewsAPI(): Promise<SerpApiGoogleNewsResponse> {
  const SERPAPI_KEY = process.env.SERPAPI_KEY;
 
  const response = await fetch(
    `https://serpapi.com/search?engine=google_news_light&api_key=${SERPAPI_KEY}&q=breaking+news+world`,
    { next: { revalidate: 1 * 60 * 60 } }
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar dados da API externa 'serpapi'");
  }

  const responseJson = await response.json();

  return responseJson;
}
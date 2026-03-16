import { fetchGoogleNewsAPI } from "@/services/google-news-api";
import { fetchMediastackAPI } from "@/services/mediastack-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const googleNewsData = await fetchGoogleNewsAPI();

    if (googleNewsData) {
      const { news_results, menu_links } = googleNewsData;

      const news = news_results
        .map((article, index) => {
          const currentMenu = menu_links[index];
          const isLocalNews = currentMenu?.title === "Suas notícias locais";

          return {
            id: index,
            source: article.source?.name ?? null,
            title: article.title,
            tag: isLocalNews ? menu_links[index - 1]?.title : currentMenu?.title,
            url: article.link,
          };
        })
        .filter((_, index) => menu_links[index]?.title !== "Suas notícias locais");

      return NextResponse.json(
        { message: "News data retrieved successfully from serpapi", data: news },
        { status: 200 }
      );
    }

    const mediastackData = await fetchMediastackAPI();

    const news = mediastackData.data.map((article, index) => ({
      id: index,
      source: article.source,
      title: article.title,
      tag: article.category,
      url: article.url,
    }));

    return NextResponse.json({ message: "News data retrieved successfully from mediastack", data: news }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: "Failed to retrieve news data" }, { status: 500 });
  }
}
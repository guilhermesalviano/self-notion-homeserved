export interface ExternalPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function fetchExternalPosts(): Promise<ExternalPost[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar dados da API externa");
  }

  return response.json();
}
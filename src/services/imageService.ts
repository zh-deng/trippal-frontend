export type ImageData = {
  id: number,
  urlSmall: string,
  altDescription: string
}

export const fetchImages = async (searchTerm: string): Promise<ImageData[]> => {
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=10`, {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    },
  });
  const data = await res.json();
  
  const images: ImageData[] = data.results.map((image: any) => ({
    id: image.id,
    urlSmall: image.urls.small,
    altDescription: image.alt_description
  }))

  return images;
};
export default interface lerMangasInterface {
    title?: string;
    description?: string;
    typeManga?: string;
    link?: string;
    imageUrl?: string;
    rating?: string;
    alternativeName?: string;
    genres?: string[];
    status?: string;
    releaseYear?: string;
    releaseDate?: string;
    chapters?: {
        title?: string;
        link?: string;
        releaseDate?: string
    }[];
}

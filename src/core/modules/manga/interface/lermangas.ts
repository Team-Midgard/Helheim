export default interface lerMangasInterface {
    title?: string;
    link?: string;
    imageUrl?: string;
    rating?: string;
    alternativeName?: string;
    genres?: string[];
    status?: string;
    releaseYear?: string;
    chapters?: {
        title?: string;
        link?: string;
    }[];
}

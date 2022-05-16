export interface ShortenedData {
  originalUrl: string;
  targetUrl: string;
}

export interface ShortenedSchema {
  _id: string;
  originalUrl: string;
  targetUrl: string;
}

export const COLLECTION_NAME = "shortened";

export const URL_SIZE = 8;

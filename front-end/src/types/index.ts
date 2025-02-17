// src/types/index.ts

export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    duration: number;
    views: number;
    createdAt: string;
    categoryId: string;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface VideoSection {
    title: string;
    videos: Video[];
}
export interface Product {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    tags: string[];
    images?: string | undefined;
    favoriteCount?: number;
}

export interface User {
    id: number;
    nickname: string;
    image: string | null;
}

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    writer: User;
}

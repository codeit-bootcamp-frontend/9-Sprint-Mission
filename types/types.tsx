interface Writer {
    nickname: string;
    id: number;
}

export interface Article {
    id: number;
    title: string;
    content: string;
    image: string | null;
    writer: Writer;
    likeCount: number;
    createdAt: string;
    updatedAt: string;
}

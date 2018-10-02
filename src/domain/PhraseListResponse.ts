export interface PhraseListResponse {
    type: string;
    value: Array<{
        id: number;
        joke: string;
    }>;
}
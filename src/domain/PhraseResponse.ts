export interface PhraseResponse {
    type: string;
    value: Array<{
        id: number;
        joke: string;
    }>;
}
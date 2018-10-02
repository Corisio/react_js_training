import {AxiosInstance, AxiosResponse} from 'axios';
import { Phrase } from '../domain/Phrase';
import { PhraseListResponse } from '../domain/PhraseListResponse';
import { PhraseResponse} from '../domain/PhraseResponse';
import { API_URL, API_MOST_IMPORTANT_URL} from '../infrastructure/configuration';

class PhraseService {
    private httpClient:AxiosInstance;

    constructor(httpClient:AxiosInstance){
        this.httpClient = httpClient;
    }

    async getRandomPhrases(number: number): Promise<Array<Phrase>>{
        const response: AxiosResponse<PhraseListResponse> = await this.httpClient.get(API_URL + number.toString());
        
        return parsePhraseList(response.data);
    }

    async getMostImportantPhrase(): Promise<Phrase>{
        const response: AxiosResponse<PhraseResponse> = await this.httpClient.get(API_MOST_IMPORTANT_URL);
        
        return parsePhrase(response.data);
    }
}

function parsePhraseList(phraseResponse: PhraseListResponse) : Array<Phrase>{
    const result: Array<Phrase> = phraseResponse.value.map(
        phraseObject => ({id: phraseObject.id.toString(), text: phraseObject.joke}));
    
    return result;
}

function parsePhrase(phraseResponse: PhraseResponse) : Phrase{
    const result: Phrase = {id: phraseResponse.value.id.toString(), text: phraseResponse.value.joke};
    
    return result;
}

export default PhraseService;
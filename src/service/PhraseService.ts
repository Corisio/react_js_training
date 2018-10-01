import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { Phrase } from '../domain/Phrase';
import { PhraseResponse } from '../domain/PhraseResponse';

const API_URL = 'http://api.icndb.com/jokes/random/';

class PhraseService {
    private httpClient:AxiosInstance;

    constructor(httpClient:AxiosInstance){
        this.httpClient = httpClient;
    }

    async getRandomPhrases(number: number): Promise<Array<Phrase>>{
        const response: AxiosResponse<PhraseResponse> = await this.httpClient.get(API_URL + number.toString());
        
        return parse(response.data);
    }
}

function parse(phraseResponse: PhraseResponse) : Array<Phrase>{
    const result: Array<Phrase> = phraseResponse.value.map(
        phraseObject => ({id: phraseObject.id.toString(), text: phraseObject.joke}));
    
    return result;
}

export default PhraseService;
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import MockAdapter from 'axios-mock-adapter';

const API_URL = 'http://api.icndb.com/jokes/random/';
const PHRASES = [
    { id: '39', text: 'Chuck Norris can win at solitaire with only 18 cards.'}
];

const httpClient = axios.create();
const axiosMocked = new MockAdapter(httpClient);

function parse(phraseResponse: PhraseResponse) : Array<Phrase>{
    const result: Array<Phrase> = [{ id: phraseResponse.value.id.toString(), text: phraseResponse.value.joke }];

    return result;
}

class PhraseService {
    private httpClient:AxiosInstance;

    constructor(httpClient:AxiosInstance){
        this.httpClient = httpClient;
    }

    async getRandomPhrases(number: number): Promise<Array<Phrase>>{
        //throw new Error('Undefined');
        //return Promise.resolve([new PhraseImpl(){ text: PHRASES[0].text, id: PHRASES[0].id}]);
        const response: AxiosResponse<PhraseResponse> = await this.httpClient.get(API_URL);
        
        return parse(response.data);
    }
}

interface Phrase{
    text: string,
    id: string
}

interface PhraseResponse{
    type: string,
    value: {
        id: number,
        joke: string
    }
}

describe('PhraseService', function(){
    it('get phrases', async function(){

            axiosMocked.onGet(API_URL).reply(200, { "type": "success", "value": { "id": PHRASES[0].id, "joke": PHRASES[0].text, "categories": [] } });

            const expectedPhrases: Array<Phrase> = [{ id : PHRASES[0].id, text: PHRASES[0].text }]

            const phraseService: PhraseService = new PhraseService(httpClient);

            const phrases: Array<Phrase> = await phraseService.getRandomPhrases(1);

            expect(phrases).toEqual(expectedPhrases);
    })
})
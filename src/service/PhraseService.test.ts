import axios, {AxiosInstance, AxiosResponse} from 'axios';
import MockAdapter from 'axios-mock-adapter';

const API_URL = 'http://api.icndb.com/jokes/random/';
const PHRASES = [
    { id: '39', text: 'Chuck Norris can win at solitaire with only 18 cards.'},
    { id: '40', text: 'Chuck Norris? roundhouse kick is so powerful, it can be seen from outer space by the naked eye.'},
    { id: '41', text: 'Using his trademark roundhouse kick, Chuck Norris once made a fieldgoal in RJ Stadium in Tampa Bay from the 50 yard line of Qualcomm stadium in San Diego.'},
    { id: '42', text: "When Chuck Norris throws exceptions, it's across the room."},
    { id: '43', text: 'Chuck Norris uses a night light. Not because Chuck Norris is afraid of the dark, but the dark is afraid of Chuck Norris.'}

];

const httpClient = axios.create();
const axiosMocked = new MockAdapter(httpClient);

function parse(phraseResponse: PhraseResponse) : Array<Phrase>{
    const result: Array<Phrase> = phraseResponse.value.map(function(phraseObject) {
        return {id: phraseObject.id.toString(), text: phraseObject.joke};
    })

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
        const response: AxiosResponse<PhraseResponse> = await this.httpClient.get(API_URL + number.toString());
        
        return parse(response.data);
    }
}

interface Phrase{
    text: string,
    id: string
}

interface PhraseResponse{
    type: string,
    value: Array<{
        id: number,
        joke: string
    }>
}

class PhraseImpl implements Phrase {
    public text: string;
    public id: string;

    public constructor(init?:Partial<PhraseImpl>) {
        Object.assign(this, init);
    }
}

describe('PhraseService', function(){
    it('get phrases', async function(){

        const phraseCount: number = 5;

        axiosMocked.onGet(API_URL + phraseCount.toString()).reply(200, 
            { "type": "success", "value": [
                    { "id": PHRASES[0].id, "joke": PHRASES[0].text, "categories": [] } ,
                    { "id": PHRASES[1].id, "joke": PHRASES[1].text, "categories": [] } ,
                    { "id": PHRASES[2].id, "joke": PHRASES[2].text, "categories": [] } ,
                    { "id": PHRASES[3].id, "joke": PHRASES[3].text, "categories": [] } ,
                    { "id": PHRASES[4].id, "joke": PHRASES[4].text, "categories": [] } 
                ]
            });

        const expectedPhrases: Array<Phrase> = PHRASES;

        const phraseService: PhraseService = new PhraseService(httpClient);

        const phrases: Array<Phrase> = await phraseService.getRandomPhrases(phraseCount);

        expect(phrases).toEqual(expectedPhrases);
    });
});
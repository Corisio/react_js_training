import axios, {AxiosInstance, AxiosResponse} from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PhraseService from '../service/PhraseService';
import { Phrase } from '../domain/Phrase';
import { RandomPhrases } from './fixtures/services/randomPhrases';
import { API_URL } from '../infrastructure/configuration';

const httpClient = axios.create();
const axiosMocked = new MockAdapter(httpClient);

describe('PhraseService', function(){
    it('get phrases', async function(){
        const phraseCount: number = 5;
        const jokes = RandomPhrases.slice(0, phraseCount).map(phrase => ({"id": phrase.id, "joke": phrase.text}));
        axiosMocked.onGet(API_URL + phraseCount.toString()).reply
            (200, { "type": "success", "value": jokes});
        const phraseService: PhraseService = new PhraseService(httpClient);

        const actualPhrases: Array<Phrase> = await phraseService.getRandomPhrases(phraseCount);

        expect(actualPhrases).toEqual(RandomPhrases);
        expect(actualPhrases.length).toEqual(phraseCount);
        expect(actualPhrases).toMatchSnapshot();
    });
});
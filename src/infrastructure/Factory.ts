import axios, {AxiosInstance} from 'axios';
import PhraseService from '../service/PhraseService';

const httpClient  : AxiosInstance = axios.create();
export const phraseService : PhraseService = new PhraseService(httpClient);
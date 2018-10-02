import * as React from 'react';
import * as enzyme from 'enzyme';
import App from './App';
import {phraseService} from './infrastructure/Factory';
import {RandomPhrases} from './tests/fixtures/services/randomPhrases';
import { MostImportantPhrase } from './tests/fixtures/services/mostImportantPhrase';
import PhraseListComponent from './Components/PhraseListComponent';
import PhraseComponent from './Components/PhraseComponent';

describe ('App', ()=>{
    let wrapper: enzyme.ShallowWrapper;
    beforeEach( () => {
        phraseService.getRandomPhrases = jest.fn(() => {
            return RandomPhrases;
        });
        phraseService.getMostImportantPhrase = jest.fn(() => {
            return MostImportantPhrase;
        });

        wrapper = enzyme.shallow(<App />)
    })

    it ('gets random phrases', () =>{
        expect(phraseService.getRandomPhrases).toHaveBeenCalledWith(5);
    })

    it ('displays random phrases', () => {
        const actualPhrases = wrapper.find(PhraseListComponent);
        expect(actualPhrases.length).toEqual(1);
    })

    it ('gets most important phrase', () =>{
        expect(phraseService.getMostImportantPhrase).toHaveBeenCalledTimes(1);
    })

    it('displays most important phrase', () => {
        const mostImportantPhrase = wrapper.find(PhraseComponent);
        expect(mostImportantPhrase.length).toEqual(1);
    })
})
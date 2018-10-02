import * as React from 'react';
import * as enzyme from 'enzyme';
import App from './App';
import {phraseService} from './infrastructure/Factory';
import {RandomPhrases} from './tests/fixtures/services/randomPhrases';
import PhraseListComponent from './Components/PhraseListComponent';

describe ('App', ()=>{
    let wrapper: enzyme.ShallowWrapper;
    beforeEach( () => {
        phraseService.getRandomPhrases = jest.fn(() => {
            return RandomPhrases;
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
})
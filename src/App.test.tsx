import * as React from 'react';
import * as enzyme from 'enzyme';
import App from './App';
import {phraseService} from './infrastructure/Factory'
import {RandomPhrases} from './tests/fixtures/services/randomPhrases'
import PhraseComponent from './Components/PhraseComponent'

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
        const number = 5;
        expect(phraseService.getRandomPhrases).toHaveBeenCalledWith(number);
        const actualPhrases = wrapper.find(PhraseComponent);
        expect(actualPhrases.length).toEqual(5);
    })
})
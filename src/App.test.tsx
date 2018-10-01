import * as React from 'react';
import * as enzyme from 'enzyme';
import App from './App';
import {phraseService} from './infrastructure/Factory'

describe ('App', ()=>{
    it ('gets random phrases', () =>{
        phraseService.getRandomPhrases = jest.fn();
        const wrapper: enzyme.ShallowWrapper = enzyme.shallow(<App />)
        expect(phraseService.getRandomPhrases).toHaveBeenCalledWith(5);
    })
})
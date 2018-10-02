import * as React from 'react';
import * as enzyme from 'enzyme';

import {RandomPhrases} from './fixtures/services/randomPhrases';

import PhraseListComponent from '../Components/PhraseListComponent';
import PhraseComponent from '../Components/PhraseComponent';

describe('PhraseListComponent', ()=>{
    it('display list of phrases', ()=>{
        let wrapper: enzyme.ShallowWrapper;
        wrapper = enzyme.shallow(<PhraseListComponent phrases={RandomPhrases} />)
        const phraseList = wrapper.find(PhraseComponent);
        expect(phraseList).not.toBeNull();
        expect(phraseList.length).toEqual(RandomPhrases.length);
        RandomPhrases.forEach((phrase, index) => {
            const item = phraseList.at(index);
            expect(item.props().text).toEqual(phrase.text);
        });
    });
});
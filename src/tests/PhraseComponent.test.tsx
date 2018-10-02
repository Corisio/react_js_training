import * as React from 'react';
import * as enzyme from 'enzyme';

import PhraseComponent from '../Components/PhraseComponent';

describe('PhraseComponent', ()=>{
    it('display phrase', ()=>{
        let wrapper: enzyme.ShallowWrapper;
        wrapper = enzyme.shallow(<PhraseComponent key="test_key" text="test_text" />)
        const container = wrapper.find('li');
        expect(container).not.toBeNull();
        expect(container.text()).toEqual("test_text");
    });
});
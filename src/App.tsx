import * as React from 'react';
import {phraseService} from './infrastructure/Factory'


class Hello extends React.Component<any, any> {
    async componentDidMount(){
        await phraseService.getRandomPhrases(5);
    }

    render (){
       return null;
    }
    
}

export default Hello;

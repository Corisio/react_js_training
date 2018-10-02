import * as React from 'react';
import { Phrase } from '../domain/Phrase';
import PhraseComponent from './PhraseComponent';

interface Props{
    phrases : Array<Phrase>
}

class PhraseListComponent extends React.Component<Props, {}> {
    render() {
        const phrases = this.props.phrases.map(phrase => <PhraseComponent key={phrase.id} text={phrase.text}/>);
        return <div className="phraseListContainer list-group list-group-flush">
            <ul>
                {phrases}
            </ul>
        </div>;       
    }
    
}

export default PhraseListComponent;

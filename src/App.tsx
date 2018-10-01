import * as React from 'react';
import {phraseService} from './infrastructure/Factory'
import {Phrase} from './domain/Phrase'
import PhraseComponent from './Components/PhraseComponent'

interface State {
    phrases: Array<Phrase>;
}

class App extends React.Component<any, State> {
    state: Readonly<State> = {
        phrases: []
    }
    async componentDidMount(){
        const phrases = await phraseService.getRandomPhrases(5);
        this.setState({phrases})
    }
    
    render() {
        const phrases = this.state.phrases.map(phrase => <PhraseComponent key={phrase.id} text={phrase.text}/>);
        
        return (<div className="phrase-container">
            <div className="phrase-title"><h1>Chuck Norris's random phrases</h1></div>
            <ul className="phrase-list">
                {phrases}
            </ul>
        </div>);
    }
    
}

export default App;

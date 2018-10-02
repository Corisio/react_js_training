import * as React from 'react';
import {phraseService} from './infrastructure/Factory'
import {Phrase} from './domain/Phrase'
import PhraseListComponent from './Components/PhraseListComponent';
import PhraseComponent from './Components/PhraseComponent';

interface State {
    phrases: Array<Phrase>;
    mostImportantPhrase: Phrase;
}

class App extends React.Component<any, State> {
    state: Readonly<State> = {
        phrases: [],
        mostImportantPhrase: { id: "", text: ""} 
    }
    async componentDidMount(){
        const phrases = await phraseService.getRandomPhrases(5);
        this.setState({phrases})
        const mostImportantPhrase = await phraseService.getMostImportantPhrase();
        this.setState({mostImportantPhrase});
    }
    
    render() {
        return (
        <div className="phrase-container">
            <div className="jumbotron jumbotron-fluid">
                <div className="container text-center">
                    <h1 className="display-4">Norris facts</h1>
                    <p className="lead">This React.js app shows five random Chuck Norris facts.</p>
                </div>
            </div> 
            <ul className="phrase-list">
                <PhraseListComponent phrases={this.state.phrases} />
            </ul>
            <ul className="most_important_phrase">
                <h1>Most important Norris fact</h1>
                <PhraseComponent key={this.state.mostImportantPhrase.id} text={this.state.mostImportantPhrase.text} />
            </ul>
        </div>);
    }
    
}

export default App;

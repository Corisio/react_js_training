import * as React from 'react';
import {phraseService} from './infrastructure/Factory'
import {Phrase} from './domain/Phrase'
import PhraseListComponent from './Components/PhraseListComponent';

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
        return (
        <div className="phrase-container">
            <div className="jumbotron jumbotron-fluid">
                <div className="container text-center">
                    <h1 className="display-4">Chuck Norris's random phrases</h1>
                    <p className="lead">This React.js app shows five random Chuck Norris phrases.</p>
                </div>
            </div> 
            <ul className="phrase-list">
                <PhraseListComponent phrases={this.state.phrases} />
            </ul>
        </div>);
    }
    
}

export default App;

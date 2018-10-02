import * as React from 'react';

interface Props{
    key : string,
    text: string
}

class PhraseComponent extends React.Component<Props, {}> {
    render() {
        return <li className="phrase">{this.props.text}</li>
    }
    
}

export default PhraseComponent;

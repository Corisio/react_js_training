import * as React from 'react';

interface Props{
    key : string,
    text: string
}

class PhraseComponent extends React.Component<Props, {}> {
    render() {
        return <li className="phrase list-group-item"><span>{this.props.text}</span></li>
    }
    
}

export default PhraseComponent;

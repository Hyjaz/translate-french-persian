import React from 'react'
import  { translate , saveText, getText} from '../../api/translate'
import { Form, Table } from 'semantic-ui-react'

export default class Translate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myTranslatedText: '',
      value: '',
      myTranslatedWords: []
    }

    getText().then(result => {
      this.setState({
        myTranslatedWords:result.data
      });
    });

    this.translate = this.translate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTable = this.handleTable.bind(this);
  }
  
  translate(e) {
    e.persist();
    translate(e.target.value).then((result) => {
      console.log(result.translatedText);
      let myTranslatedText = result.translatedText;
      let value = e.target.value;
      this.setState({
        myTranslatedText: myTranslatedText,
        value: value,
      })
    });
  }

  handleTable() {
    getText().then(result => {
      this.setState({
        myTranslatedWords:result.data
      });
    });
    
  }
  
  handleSubmit(e) {
    const payload = {
      "francais": this.state.value,
      "perse": this.state.myTranslatedText
    }
    e.persist();
    saveText(payload).then(() => {
      this.handleTable();
    })
  }
  
  render() {
    let rows = []
    this.state.myTranslatedWords.map((a, i) => {
      rows.push( <Table.Row key={i}> 
                    <Table.Cell>{a.francais}</Table.Cell>
                    <Table.Cell>{a.perse}</Table.Cell>
                  </Table.Row>
                )
    })

    return (
      <div style={divStyle}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input type="text" placeholder='Entrez un mot pour traduire' onChange={this.translate} size='massive'/>
            <Form.Input placeholder='Traduction...' value={this.state.myTranslatedText} size='massive' disabled/>
            <Form.Button size='massive'>Sauvegarder</Form.Button>
          </Form.Group>
        </Form>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Francais</Table.HeaderCell>
              <Table.HeaderCell>Perse</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const divStyle = {
    marginLeft: 200,
    marginRight:200,
    marginTop: 100
}

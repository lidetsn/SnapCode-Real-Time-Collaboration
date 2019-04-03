import React from 'react'
import ReactQuill from 'react-quill';
import Button from 'react-bootstrap/Button';

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: '', 
      newTitle: '',
      myKey: '',
      editorActive: false,
      doc_id: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleNewDocTitle = this.handleNewDocTitle.bind(this)
    this.handleDocUpdate = this.handleDocUpdate.bind(this)
  }
  // updadates state of text when keys are pressed within editor text input field
  handleChange(value) {
    this.setState({ text: value })
  }

  // updates the state of title when keys are pressed in the title input field
  handleChangeTitle(event) {
    this.setState({ newTitle: event.currentTarget.value })
  }
  

  // handles new title form submit
  handleNewDocTitle(event) {
      event.preventDefault()
      alert(this.state.newTitle)
      let title = this.state.newTitle;
      this.setState({ editorActive: true} );
      this.props.handleNewDocTitleParent(title);
  }


 // gets called when button is clicked to save document
  // simply grabs text value of form and
  // passes it to parent (app) as data
  handleDocUpdate() {
    let doc_id = this.props.doc_id;
    // let title = this.state.newTitle;
    let data = this.state.text;
    this.props.handleUpdate(doc_id, data); 
    // console.log(`Doc ID from editor ${doc_id}`);
  }

  render() {
    let editorActive = this.state.editorActive;

    return (
      <React.Fragment>
          {/* title input component */}
          {!editorActive ? (
            <form onSubmit={this.handleNewDocTitle}>
              <input type="text" 
                    value={this.state.meyKey}
                    onChange={this.handleChangeTitle}  />
              <input type="submit" value="Submit" />
            </form>
            ) : (
              null
            )}
            
          {/* document editor component*/}
          {editorActive ? (
            <ReactQuill   value={this.state.text}
                          onChange={this.handleChange}
                          doc_id={this.props.doc_id}></ReactQuill>
          ) : (
            null
          )}
          {/* update document button component */}
          <Button       variant="success" 
                        onClick={this.handleDocUpdate}
                        doc_id={this.props.doc_id}
                        >Save Document</Button>
      </React.Fragment>
    )
  }
}

export default Editor;
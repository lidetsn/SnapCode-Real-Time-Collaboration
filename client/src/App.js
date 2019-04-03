import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Editor from "./components/quill";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      title: "",
      text: "",
      editorActive: false,
      doc_id: ""
    };
    this.handleNewDocTitleParent = this.handleNewDocTitleParent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
    // .then(res => res.text())          // convert to plain text
    // // .then(text => console.log(text))
    // .then(function(text) {
    //     let returnedData= JSON.parse(text);
    //     console.log(returnedData)
    // });// then log it out
  };

  // is called by ./components/quill/editor makeSave function
  // receives quill editor data as 'data'
  handleNewDocTitleParent(title) {
    this.setState(
      {
        title: title
        // text: data
      },
      () => {
        // our put method that uses our backend api
        axios
          .post("http://localhost:8080/api/putData", {
            title: this.state.title
            // content: this.states.text
          })
          .then(response => {
            /* here */
            /* now i have the id of the newly-created document */
            /* need to pass this id as a param to editor somehow so that */
            /* it can render editor as a non-generic component */
            this.setState({ doc_id: response.data._id });
          });
      }
    );
  }

  /* here */
  handleUpdate(doc_id, data) {
    this.setState(
      {
        doc_id: doc_id,
        text: data
      },
      () => {
        console.log(`This.state.text: ${this.state.text}`);
        console.log(`This.state.doc_id: ${this.state.doc_id}`);
        // our put method that uses our backend api
        axios.post("http://localhost:8080/api/updateData", {
          _id: this.state.doc_id,
          content: this.state.text
        });
      }
    );
  }

  render() {
    const { data } = this.state;

    return (
      <Router>        
        <div>
            <Route path="/" exact component={Login} />
            <Route path="/editor"  render={props => (<Editor {...props}
                  handleNewDocTitleParent={this.handleNewDocTitleParent}
                  handleUpdate={this.handleUpdate}
                  doc_id={this.state.doc_id}
                />)}  />
            <Route path="/dashboard" exact component={Dashboard} />
        </div>

                {/* this renders our list of all docs in the db */}
                {/* and their content */}
        {/* <div>
          <ul>
            {data.length <= 0? "NO DB ENTRIES YET": data.map(data => (
                <li style={{ padding: "10px" }} key={data.title}>
                   <span style={{ color: "gray" }}> Title: </span> {data.title}{" "}
                    <br />
                   <span style={{ color: "gray" }}> data: </span>{" "}
                    {data.content}
                  </li>
               ))}
          </ul>
        </div> */}
   </Router>
    );
  }
}

export default App;

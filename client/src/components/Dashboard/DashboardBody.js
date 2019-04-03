import React, { Component } from "react";
import brace from 'brace';
import  AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/twilight';
import 'brace/ext/settings_menu'
import 'brace/ext/searchbox'
// import ReactQuill from 'react-quill';
// import snapLogo from '../assets/snap.png';
import openSocket from 'socket.io-client';
import './Home.css'
require('es6-promise').polyfill();
require('isomorphic-fetch');

const  socket = openSocket('http://localhost:8000');
class DashboardBody extends Component {
  class = {};

  render() {
	const retrievedEmail = localStorage.getItem('email')

    return (
      <div>
      <div className="container">
        <h1>Hello, {retrievedEmail} </h1>
      </div>
        <AceEditor
              
        // var editor = brace.edit("editor")
        // brace.require('brace/ext/settings_menu').init(editor);
        // editor.setTheme("brace/theme/twilight");
        // editor.session.setMode("brace/mode/html");
        // editor.commands.addCommands([{
        // name: "showSettingsMenu",
        // bindKey: {win: "Ctrl-q", mac: "Ctrl-q"},
        // exec: function(editor) {
        //   editor.showSettingsMenu();
        // },
        // readOnly: true
        // }]);
        
                      commands={[{
                      name: "showSettingsMenu",
                      bindKey: {win: "Ctrl-q", mac: "Ctrl-q"},
                      exec: function(editor) {
                        editor.showSettingsMenu();
                      },
                      readOnly: true
                    }]}
                
        
                    placeholder="Placeholder Text"
                    mode="javascript"
                    theme="twilight"
                    name="blah2"
                    ext="searchbox"
                  //onLoad={tonLoad}
                    onChange={this.onChange}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={`function onLoad(editor) {
                    console.log("i've loaded");
                  }`}
                    setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                    }}
          />
          </div>
    );
  }
}

export default DashboardBody;









  
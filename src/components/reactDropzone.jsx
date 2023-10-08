'use client'
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

export default class MyDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  onDrop = (acceptedFiles) => {
    this.setState({
      files: acceptedFiles,
    });
  };

  render() {
    return (
      <div>
        <h1>Dropzone</h1>
        <Dropzone onDrop={this.onDrop} />
        <ul>
          {this.state.files.map((file) => (
            <li key={file.name}>
              <img src={URL.createObjectURL(file)} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

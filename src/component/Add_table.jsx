import React, {Fragment} from "react";
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Grid,Form,Button, Input } from 'semantic-ui-react'
import Navbar from "./Navbar";


class Add_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      table_title:"",
      table_autor:"",
      table_text:""
    }
  };

  _addTable = async(e) => {
    const { table_title, table_autor,table_text } = this.state;
    e.preventDefault();

    const res = await axios('/add/table', {
      method : 'POST',
      data : { 
        'table_title' : table_title,
        'table_autor' : table_autor,
        'table_text' : table_text
     },
      headers: new Headers()
    });

    if(res.data) {
      alert('등록되었습니다.');
      return window.location.href="/";
    }
  }
  
  _titleUpdate(e) {
    this.setState({ table_title : e.target.value })
  }
  _autorUpdate(e) {
    this.setState({ table_autor : e.target.value })
  }
  _textUpdate(data) {
    this.setState({ table_text : data })}

  
  render() {
      return(
        <Fragment>
          <Navbar/>
          <Grid>
              <Grid.Column floated='center'>
              <Form onSubmit={this._addTable}>
                <Form.Field required>
                  <label>제목</label>
                  <Input placeholder='제목' onChange={(e) => this._titleUpdate(e)}/>
                </Form.Field>
                <Form.Field required>
                  <label>글쓴이</label>
                  <Input placeholder='글쓴이' onChange={(e) => this._autorUpdate(e)}/>
                </Form.Field>
                <CKEditor
                        editor={ ClassicEditor }
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            this._textUpdate(data);
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                <Button type="submit">
                  등록
                </Button>
              </Form>
              </Grid.Column>
          </Grid>
        </Fragment>
      )
  };
};

export default Add_table;
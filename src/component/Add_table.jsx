import React, {Fragment} from "react";
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Grid,Form,Button, Input, Segment } from 'semantic-ui-react'
import Navbar from "./Navbar";
import '../style/Add_table.css'


class Add_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      table_title:"",
      table_text: ""
    }
  };

  _addTable = async(e) => {
    const { table_title,table_text } = this.state;
    e.preventDefault();

    const res = await axios('/add/table', {
      method : 'POST',
      data : { 
        'table_title' : table_title,
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
  _textUpdate(data) {
    this.setState({ table_text: data })
  }
  
  render() {
      return(
        <Fragment>
          <Navbar/>
          <Grid id="mylayoutAdd_table">
              <Grid.Column className="addtableClm">
              <Form onSubmit={this._addTable} >
                <Form.Field required>
                  <label>제목</label>
                  <Input placeholder='제목' onChange={(e) => this._titleUpdate(e)}/>
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
                    <Segment textAlign='center' className="addbtnSegment">
                      <Button fluid type="submit" size='huge' color='blue' >
                        등록
                      </Button>
                    </Segment>
              </Form>
              </Grid.Column>
          </Grid>
        </Fragment>
      )
  };
};

export default Add_table;
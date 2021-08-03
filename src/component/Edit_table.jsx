import React, {Fragment} from "react";
import axios from 'axios';
import Navbar from "./Navbar.jsx";
import { Grid, Input, Form, Button} from 'semantic-ui-react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../style/Edit_table.css'


class Edit_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        table:[],
        newTable:[],
        id:props.match.params.id
    }
  };
  componentDidMount() {
    this._getData();
  }

  _getData = async () => {
    const res = await axios.get('/table/'+this.state.id);
    this.setState({ 
      table : res.data
    })
  }

  titleChange = (e) => {
      console.log('asdasd',this.state.table)
      this.setState({
        ...this.state,
        table:{
          ...this.state.table,
          table_title: e.target.value
        }
      });
  };
  autorChange = (e) => {
    console.log('asdasd',this.state.table)
    this.setState({
      ...this.state,
      table:{
        ...this.state.table,
        table_autor: e.target.value
      }
    });
  };
  textChange = (data) => {
    console.log('asdasd',this.state.table)
    this.setState({
      ...this.state,
      table:{
        ...this.state.table,
        table_text: data
      }
    });
  };

_save = async () => {
    const table_title = this.state.table;

    const modify = {
        table_title: table_title,
        id: this.state.id
    }

    const res = await axios('/save/table_data', {
        method: 'POST',
        data: {
            'modify': modify,
        },
        headers: new Headers()
    })
    console.log('res',res.data);
    if (res.data) {
        alert('저장하였습니다.')
        return window.location.href = '/table/'+this.state.id;
    }
}

  
  render() {
    const { table } = this.state;
      return(
        <Fragment>
          <Navbar/>
          <Grid id="mylayoutEdit_table">
          <Grid.Row columns={1}>
            <Grid.Column id="editBtn">
              <Button onClick={()=>this._save() }>
                완료
              </Button>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row columns={1}>
              {table != null ?
                    <Fragment>
                      <Grid.Column floated='center' width={16} className="addtableClm">
                      <Form onSubmit={this._addTable}>
                        <Form.Field required>
                          <label>제목</label>
                          <Input placeholder='제목' id="table_title" name="table_title" onChange={this.titleChange} value={table.table_title}/>
                        </Form.Field>
                        <Form.Field required>
                          <label>글쓴이</label>
                          <Input placeholder='글쓴이' id="table_autor" name="table_autor" onChange={this.autorChange} value={table.table_autor}/>
                        </Form.Field>
                        <CKEditor
                            editor={ ClassicEditor }
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                this.textChange(data);
                                console.log( { event, editor, data } );
                            } }
                            data={table.table_text}
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                      </Form>
                      </Grid.Column>
                    </Fragment>
              : <Fragment>데이터가 없습니다.</Fragment>}
            </Grid.Row>
          </Grid>
        </Fragment>
      )
  };
};

export default Edit_table;
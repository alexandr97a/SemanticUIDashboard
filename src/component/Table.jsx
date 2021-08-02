import React, {Fragment} from "react";
import axios from 'axios';
import Navbar from "./Navbar.jsx";
import { Segment, Grid, Header, Form, Button, TextArea,Icon } from 'semantic-ui-react'
import Moment from 'react-moment';
import '../style/Table.css'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      table:[],
      coment:[],
      coment_autor:"",
      coment_text:"",
      id:props.match.params.id
    }
  };

  componentDidMount() {
    this._getData();
  }

  _addTable = async(e) => {
    const { coment_autor, coment_text } = this.state;
    e.preventDefault();

    const res = await axios('/add/coment', {
      method : 'POST',
      data : { 
        'coment_autor' : coment_autor,
        'coment_text' : coment_text,
        'table_id' : this.state.id
     },
      headers: new Headers()
    });

    if(res.data) {
      alert('등록되었습니다.');
      return window.location.reload();
    }
  }

  _autorUpdate(e) {
    this.setState({ coment_autor : e.target.value })
  }
  _textUpdate(e) {
    this.setState({ coment_text : e.target.value })
  }

  _getData = async () => {
    const res = await axios.get('/table/'+this.state.id);
    const res1 = await axios.get('/get/coment/'+this.state.id);
    this.setState({ 
      table : res.data,
      coment: res1.data
    })
  }
  editlink(){
    const edit_view_url = '/edit_table/'+this.state.id;
    return window.location.href=edit_view_url;
  }


  
  render() {
    const { table,coment } = this.state;
      return(
        <Fragment>
          <Navbar/>
          <Grid>
          <Grid.Row columns={1}>
          <Grid.Column >
            <Button animated='fade' onClick={() => this.editlink()}>
              <Button.Content visible>수정</Button.Content>
              <Button.Content hidden>
                <Icon name='edit' />
              </Button.Content>
            </Button>
          </Grid.Column >
          </Grid.Row>
          <Grid.Row columns={1}>
            {table != null ?
                  <Grid.Column width={16} >
                    <Grid.Row columns={1}>
                    <Segment attached>
                      <Header
                        as='h3'
                      >{table.table_title}</Header>
                      <Header.Subheader>
                        {table.table_autor} | <Moment format="YYYY-MM-DD" date={table.createdAt}/>
                      </Header.Subheader>
                    </Segment>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                    <Segment attached>
                      {table.table_text}  
                    </Segment>
                    </Grid.Row>
                  </Grid.Column>
              
            : <Fragment>데이터가 없습니다.</Fragment>}
          </Grid.Row>
          </Grid>
          <Grid centered>
          <Grid.Row columns={1}>
          <Grid.Column width={16} >
            <Segment padded attached>
                <Header as='h3' >
                  댓글
                </Header>
                <Form onSubmit={this._addTable}>
                <Form.Field>
                  <label>이름</label>
                  <input placeholder='이름' onChange={(e) => this._autorUpdate(e)}/>
                </Form.Field>
                <Form.Field
                  control={TextArea}
                  label='내용'
                  placeholder='주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다.'
                  onChange={(e) => this._textUpdate(e)}
                />
                <Button type='submit'>등록</Button>
              </Form>
            </Segment>
            <Segment padded attached>
              {coment.length !== 0 ? 
                coment.map( (el, key) => {
                  // const edit_view_url = 'edit_table/'+el.id;
                  // const editlink = () =>{
                  //   return window.location.href=edit_view_url;
                  // }
                  // console.log('el',el)
                  return(
                    <Fragment>
                      <Header as='h3' attached='top'>{el.coment_autor}
                      <Header.Subheader><Moment format="YYYY-MM-DD" date={el.createdAt}/></Header.Subheader>
                      </Header>
                      
                      <Segment  attached>{el.coment_text}</Segment>
                    </Fragment>
                  )
                })
                : <Fragment>댓글이 없습니다.</Fragment>}
            </Segment>
          </Grid.Column>
          </Grid.Row>
          </Grid>
        </Fragment>
      )
  };
};

export default Main;
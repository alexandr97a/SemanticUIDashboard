import React, {Fragment} from "react";
import { Link } from 'react-router-dom'
import { Icon,Grid,Table,Button, Menu } from 'semantic-ui-react'
import axios from 'axios';
import Moment from 'react-moment';
import Navbar from "./Navbar";
import '../style/Main.css'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      table : [],
    }
  };

  componentDidMount() {
    this._getData();
  }

  _getData = async () => {
    const res = await axios.get('/get/table');
    this.setState({ 
      table : res.data
    })
  }

  _delete = async (el) => {
    const remove = window.confirm(el.table_title + '을 삭제하시겠습니까?');

    if(remove) {
      const target = { id : el.table_id }
      const res = await axios('/delete/table', {
        method : 'POST',
        data : { 'delete' : target },
        headers: new Headers()
      })
      
      if(res.data) {
        alert('데이터를 삭제했습니다.')
        return window.location.reload();
      }
    }
  }
  render() {
    const { table } = this.state
      return(
        <Fragment>
          <Navbar/>
          <Grid id="mylayoutMain">
            <Grid.Row columns={1}>
              <Grid.Column id="addBtn">
                <Button animated='fade' as={Link} to='/add_table'>
                  <Button.Content visible>글쓰기</Button.Content>
                  <Button.Content hidden>
                    <Icon name='add' />
                  </Button.Content>
                </Button>
              </Grid.Column >
            </Grid.Row>
            <Grid.Row columns={1} >   
              <Grid.Column width={16} id="addBtn" className='wrapper'>
              <Table selectable>
                <Table.Header>
                  <Table.Row className="tableRow">
                    <Table.HeaderCell className="tableNumber">번호</Table.HeaderCell>
                    <Table.HeaderCell>제목</Table.HeaderCell>
                    <Table.HeaderCell>글쓴이</Table.HeaderCell>
                    <Table.HeaderCell>등록일</Table.HeaderCell>
                    <Table.HeaderCell>삭제</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {table.length !== 0 ? 
                    table.map( (el, key) => {
                      const view_url = 'table/'+el.table_id;
                      const link = () =>{
                        return window.location.href=view_url;
                      }
                      // const edit_view_url = 'edit_table/'+el.id;
                      // const editlink = () =>{
                      //   return window.location.href=edit_view_url;
                      // }
                      // console.log('el',el)
                      return(
                          <Table.Row key={key} className="tableRow">
                          <Table.Cell className="tableNumber" onClick={link}>{el.table_id}</Table.Cell>
                          <Table.Cell onClick={link}>{el.table_title}</Table.Cell>
                          <Table.Cell onClick={link}>{el.table_autor}</Table.Cell>
                          <Table.Cell onClick={link}><Moment format="YYYY-MM-DD" date={el.createdAt}/></Table.Cell>
                          <Table.Cell>
                            <Button animated='fade' onClick={() => this._delete(el)}>
                              <Button.Content visible>Delete</Button.Content>
                              <Button.Content hidden>
                                <Icon name='delete' />
                              </Button.Content>
                            </Button>
                          </Table.Cell>
                        </Table.Row>

                      )
                    })
                    : <Fragment>데이터가 없습니다.</Fragment>}
                </Table.Body>
                <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='5'>
                    <Menu floated='right' pagination>
                      <Menu.Item as='a' icon>
                        <Icon name='chevron left' />
                      </Menu.Item>
                      <Menu.Item as='a'>1</Menu.Item>

                      <Menu.Item as='a' icon>
                        <Icon name='chevron right' />
                      </Menu.Item>
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
              </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Fragment>
      )
  };
};

export default Main;
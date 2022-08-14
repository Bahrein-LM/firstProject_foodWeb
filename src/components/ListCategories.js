import React, { Component } from 'react';
import {Col, ListGroup} from 'react-bootstrap';
import { API_URL } from '../utils/constant';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUtensils, faCoffee, faCheese} from '@fortawesome/free-solid-svg-icons';
import '../index.css';


const Icon = ({nama}) => {
  if(nama === 'Makanan'){
    return <FontAwesomeIcon icon={faUtensils} />
  }
  if(nama === 'Minuman'){
    return <FontAwesomeIcon icon={faCoffee} />
  }
  if(nama === 'Cemilan'){
    return <FontAwesomeIcon icon={faCheese} />
  }
}

export default class ListCategories extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       categories: []
    };
  };
  
  componentDidMount(){
    //cara menggunakan API JSON dengan axios metode GET
    axios.get(API_URL + "/categories")
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
    }).catch(error => {
      console.log(error);
    })
  }
  
  render() {
    const {categories} = this.state;
    const {changeCategory, chooseCategory} = this.props;
    return (
      <Col md={2} mt={2}>
        <h4><strong>Daftar Kategori</strong></h4>
        <hr />
        <ListGroup 
        style={{textAlign: 'left', backgroundColor: 'rgb(59, 37, 2)', color: 'white'}}>
          {categories && categories.map((category) => (
            <>
              <ListGroup.Item 
                key={category.id} 
                onClick={() => {changeCategory(category.nama)}}
                className={chooseCategory === category.nama && "list-category"}
                style={{cursor: 'pointer'}}
                >
                <h5>
                  <Icon nama={category.nama} /> {category.nama}
                </h5>
              </ListGroup.Item>
            </>
          ))}
        </ListGroup>
      </Col>
    );
  }
}

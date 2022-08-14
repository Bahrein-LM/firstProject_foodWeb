import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from 'react-bootstrap';
import  numberWithCommas  from '../utils/utils';
import { API_URL } from "../utils/constant";
import axios from 'axios';

export default class TotalBayar extends Component {

  submitTotalBayar = (totalBayar) =>{
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjang
    }
    const history = useNavigate();
    axios.post(API_URL+'/pesanans', pesanan).then(res => {
      history('/sukses');
    })
  }
  render() {
    const totalBayar = this.props.keranjang.reduce(function (result, item) {
        return result + item.total_harga;
      }, 0);
    return (
      <>
      {/* Web */}
      <div className='fixed-bottom d-none d-md-block'>
        <Row>
            <Col md={{span: 3, offset: 9}} className='px-4'>
                <h4>Total Harga:<strong>Rp. {numberWithCommas(totalBayar)}</strong></h4>
                <Button 
                  className='mb-2 mt-4 mr-2'
                  block
                  type='primary'
                  style={{backgroundColor: '#543824', borderColor: '#543824', width: '100%'}}
                  onClick={ () => this.submitTotalBayar(totalBayar)}>
                  <FontAwesomeIcon icon={faShoppingCart} /><strong>Bayar</strong>
                </Button>
            </Col>
        </Row>
      </div>
      {/* Mobile */}
      <div className='d-sm-block d-md-none'>
      <Row>
          <Col md={{span: 3, offset: 9}} className='px-4'>
              <h4>Total Harga:<strong>Rp. {numberWithCommas(totalBayar)}</strong></h4>
              <Button 
                className='mb-2 mt-4 mr-2'
                block
                type='primary'
                style={{backgroundColor: '#543824', borderColor: '#543824', width: '100%'}}
                onClick={ () => this.submitTotalBayar(totalBayar)}>
                <FontAwesomeIcon icon={faShoppingCart} /><strong>Bayar</strong>
              </Button>
          </Col>
      </Row>
      </div>
      </>    
    );
  }
}

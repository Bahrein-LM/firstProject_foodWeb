import React, { Component } from 'react';
import {Badge, Col, ListGroup, Row, Card} from 'react-bootstrap';
import numberWithCommas from '../utils/utils';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';
import { API_URL } from '../utils/constant';
import axios from 'axios';
import swal from 'sweetalert';
import '../index.css';


export default class Hasil extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showModal: false,
       keranjangDetail: false,
       jumlah: 0,
       keterangan: '',
       totalHarga: 0
    };
  };
  
  handleShow = (menuKeranjang) =>{
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga
    })
  }

  handleClose = () =>{
    this.setState({
      showModal: false
    })
  }

  tambah = () =>{
    this.setState({
      jumlah: this.state.jumlah+1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah+1)
    })
  }

  kurang = () =>{
    if(this.state.jumlah !== 1){
      this.setState({
        jumlah: this.state.jumlah-1,
        totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah-1)
      })
    }
  }

  changeHandler = (event) =>{
    this.setState({
      keterangan: event.target.value
    })
  }

  handleSubmit = (event) =>{
    event.preventDefault();

      const data = {
        jumlah: this.state.jumlah,
        total_harga: this.state.totalHarga,
        product: this.state.keranjangDetail.product,
        keterangan: this.state.keterangan
      }
  
      axios.put(API_URL+"/keranjangs/"+this.state.keranjangDetail.id, data)
        .then(res => {
          this.props.getListKeranjang();
          swal({
            title: "Success Update Notification",
            text: "Barang "+data.product.nama+" Telah di Update !",
            icon: "success",
            button: false,
            timer: 1500,
          });
      }).catch(error => {
        console.log(error);
      })
  }

  hapusPesanan = (id) =>{
      this.handleClose();
      axios.delete(API_URL+"/keranjangs/"+id)
        .then(res => {
          this.props.getListKeranjang();
          swal({
            title: "Success Delete Notification",
            text: "Barang "+this.state.keranjangDetail.product.nama+" Telah di Hapus !",
            icon: "error",
            button: false,
            timer: 1500,
          });
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    const { keranjang } = this.props;
    return (
      <Col md={3} mt={2}>
        <h4><strong>Hasil</strong></h4>
        <hr />
        {keranjang.length !== 0 && (
          <Card className='overflow-auto hasil' style={{height: '400px'}}>
            <ListGroup variant="flush">
            {keranjang.map((menuKeranjang) => (
                <ListGroup.Item style={{cursor: 'pointer'}} 
                key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                  <Row>
                    <Col>
                      <h4>
                        <Badge bg="dark">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong>Rp. {numberWithCommas(menuKeranjang.total_harga)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
            ))}
            <ModalKeranjang 
            handleClose={this.handleClose} {...this.state} 
            tambah={this.tambah} kurang={this.kurang}
            changeHandler={this.changeHandler} handleSubmit={this.handleSubmit}
            hapusPesanan={this.hapusPesanan}/>
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjang={keranjang} {...this.props}/>
      </Col>
    );
  }
}

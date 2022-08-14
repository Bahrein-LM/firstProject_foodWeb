import { Row, Col, Container } from 'react-bootstrap';
import '../index.css';
import Hasil from '../components/Hasil';
import ListCategories from '../components/ListCategories';
import Menus from '../components/Menus';
import { API_URL } from '../utils/constant';
import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: [],
       chooseCategory: 'Makanan',
       keranjang: [],
    };
  };

  componentDidMount(){
    //cara menggunakan API JSON dengan axios metode GET
    axios.get(API_URL+"/products?category.nama="+this.state.chooseCategory)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
    }).catch(error => {
      console.log(error);
    })

    this.getListKeranjang();
  }

  changeCategory = (value) => {
    this.setState({
      chooseCategory: value,
      menus: []
    })

    axios.get(API_URL+"/products?category.nama="+value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
    }).catch(error => {
      console.log(error);
    })
  }

  masukKeranjang = (value) => {

    axios.get(API_URL+"/keranjangs?product.id="+value.id)
      .then(res => {
        if(res.data.length === 0){
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }
      
          axios.post(API_URL+"/keranjangs/", keranjang)
            .then(res => {
              this.getListKeranjang();
              swal({
                title: "Success Notification",
                text: "Barang "+keranjang.product.nama+" Telah Masuk Keranjang!",
                icon: "success",
                button: false,
                timer: 1500,
              });
          }).catch(error => {
            console.log(error);
          })
        }else{
          const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value
          }
          axios.put(API_URL+"/keranjangs/"+res.data[0].id, keranjang)
            .then(res => {
              this.getListKeranjang();
              swal({
                title: "Success Notification",
                text: "Barang "+keranjang.product.nama+" Telah Masuk Keranjang!",
                icon: "success",
                button: false,
                timer: 1500
              });
          }).catch(error => {
            console.log(error);
          })
        }
    }).catch(error => {
      console.log(error);
    })
  }

  // componentDidUpdate(prevState){
  //   if(!this.state.keranjang !== prevState.keranjang){
  //     axios.get(API_URL+"/keranjangs")
  //       .then(res => {
  //         const keranjang = res.data;
  //         this.setState({ keranjang });
  //     }).catch(error => {
  //       console.log(error);
  //     })
  //   }
  // }

  getListKeranjang = () =>{
    axios.get(API_URL+"/keranjangs")
      .then(res => {
        const keranjang = res.data;
        this.setState({ keranjang });
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    const { menus, chooseCategory, keranjang } = this.state
    return (
        <div className='mt-3'>
          <Container fluid>
            <Row>
              <ListCategories changeCategory={this.changeCategory} chooseCategory={chooseCategory} />
              <Col>
                <h4><strong>Daftar Produk</strong></h4>
                <hr />
                <Row className='overflow-auto menu'>
                  {menus && menus.map((menu) => (
                    <>
                      <Menus key={menu.id} menu={menu} masukKeranjang={this.masukKeranjang}/>
                      <br />
                    </>
                  ))}
                </Row>
              </Col>
              <Hasil keranjang={keranjang} {...this.props} getListKeranjang={this.getListKeranjang}/>
            </Row>
          </Container>
        </div>
    );
  }
}
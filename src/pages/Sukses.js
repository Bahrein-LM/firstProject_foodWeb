import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/constant';
import axios  from "axios";

class Sukses extends Component {
    
    componentDidMount(){
        axios.get(API_URL+"/keranjangs")
        .then((res) => {
            const keranjang = res.data;
            keranjang.map(function(item){
                return axios
                .delete(API_URL+"/keranjangs"+item.id)
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
            });
        }).catch(error => {
        console.log(error);
        })
    }
    render() {
        return (
            <div className='mt-4 text-center'>
                <Image src="./assets/images/order_confirmed.png" width={500}/>
                <h2>Sukses</h2>
                <p>Terima Kasih Sudah Memasan!</p>
                <Button 
                style={{backgroundColor: '#543824', borderColor: '#543824'}} 
                type='primary' 
                as={Link} 
                to='/'>
                    Kembali
                </Button>
            </div>
        );
    }
}

export default Sukses;

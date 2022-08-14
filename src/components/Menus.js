import React from 'react';
import { Col, Card } from 'react-bootstrap';
import '../index.css';
import numberWithCommas from '../utils/utils';

const Menus = ({menu, masukKeranjang}) => {
    return (
        <div style={{width: '240px', height: '330px'}}>
            <Col md={4} xs={6} className='mb-4'>
                <Card className='shadow' style={{width: '220px', height: '300px', cursor: 'pointer'}} onClick={() => masukKeranjang(menu)}>
                    <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
                        <Card.Body>
                            <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
                            <Card.Text>
                            Rp. {numberWithCommas(menu.harga)}
                            </Card.Text>
                        </Card.Body>
                </Card>
            </Col>
        </div>
    );
}

export default Menus;

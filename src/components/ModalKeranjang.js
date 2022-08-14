import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import numberWithCommas from "../utils/utils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus, faTrash} from '@fortawesome/free-solid-svg-icons';

const ModalKeranjang = ({
    showModal, 
    handleClose, 
    keranjangDetail, 
    jumlah, 
    keterangan, 
    tambah, 
    kurang,
    changeHandler,
    handleSubmit,
    totalHarga,
    hapusPesanan}) => {
    if(keranjangDetail){
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    {keranjangDetail.product.nama} {" "}
                    <strong>(Rp. {numberWithCommas(keranjangDetail.product.harga)})</strong>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Harga: </Form.Label>
                            <p>
                                <strong>Rp. {numberWithCommas(totalHarga)}</strong>
                            </p>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Jumlah: </Form.Label>
                            <br />
                            <Button variant='primary' 
                            style={{backgroundColor: '#543824', borderColor: '#543824', marginRight: '5px'}} 
                            size='sm'
                            onClick={() => kurang()}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </Button>
                            <strong>{jumlah}</strong>
                            <Button variant='primary' 
                            style={{backgroundColor: '#543824', borderColor: '#543824', marginLeft: '5px'}} 
                            size='sm'
                            onClick={() => tambah()}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea2">
                            <Form.Label>Keterangan: </Form.Label>
                            <Form.Control 
                            as='textarea' 
                            rows={3} 
                            name='keterangan' 
                            placeholder='Contoh: Tambah Sambal ...'
                            value={keterangan}
                            onChange={(event) => changeHandler(event)}>

                            </Form.Control>
                        </Form.Group>
                        <Button variant='primary' style={{backgroundColor: '#543824', borderColor: '#543824', marginTop: '20px'}} 
                        onClick={handleClose} type='submit'>
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
                    <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }else{
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    Kosong
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" style={{backgroundColor: '#543824', borderColor: '#543824'}} 
                onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
    }
}

export default ModalKeranjang;

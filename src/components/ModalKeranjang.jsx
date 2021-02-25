import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({ showModal, handleClose, keranjangDetail, jumlah, keterangan, kurangiPesanan, tambahPesanan, handleChangeKeterangan, handleSubmit, totalHarga, hapusPesanan }) => {
    if (keranjangDetail) {
        return (
            <div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {keranjangDetail.product.nama}
                            <p> Rp. {numberWithCommas(keranjangDetail.product.harga)}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Total Harga</Form.Label>
                                {<p> Rp. {numberWithCommas(totalHarga)}</p>}
                                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Jumlah</Form.Label>
                                <br />
                                <Button variant="primary" className="mr-2" onClick={() => kurangiPesanan()}>
                                    <FontAwesomeIcon icon={faMinus} size="sm" />
                                </Button>
                                <strong>{jumlah}</strong>
                                <Button variant="primary" className="ml-2" onClick={() => tambahPesanan()}>
                                    <FontAwesomeIcon icon={faPlus} size="sm" />
                                </Button>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>keterangan</Form.Label>
                                <Form.Control as="textarea" rows="3" name="keterangan" value={keterangan} onChange={(e) => handleChangeKeterangan(e)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Simpan
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
                            <FontAwesomeIcon icon={faTrash} />Hapus Pesanan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    } else {
        return (
            <div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Kosong
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Kosong
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default ModalKeranjang;

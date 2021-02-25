import React, { Component } from 'react';
import { Row, Col, ListGroup, Badge, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import TotalBayar from './TotalBayar';
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../utils/contants";
import axios from "axios";
import swal from "sweetalert";

class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            totalHarga: 0
        }
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga
        })
    }
    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    tambahPesanan = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    kurangiPesanan = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }
    }

    handleChangeKeterangan = (e) => {
        this.setState({
            keterangan: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.handleClose()

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        }
        axios
            .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then((res) => {
                swal({
                    title: 'Success',
                    text: "Diupdate!",
                    icon: 'success',
                    button: false,
                    timer: 1500
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    hapusPesanan = (id) => {

        this.handleClose()

        axios
            .delete(API_URL + "keranjangs/" + id)
            .then((res) => {
                swal({
                    title: 'Success',
                    text: "Dihapus!",
                    icon: 'success',
                    button: false,
                    timer: 1500
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} mt="2">
                <h3>Hasil</h3>
                <hr />
                {keranjangs.length > 0 && (
                    <Card className="overflow-auto hasil">
                        <ListGroup variant="flush">
                            {keranjangs.map((menuKeranjang) => (
                                <ListGroup.Item key={menuKeranjang.id + 1} onClick={() => this.handleShow(menuKeranjang)}>
                                    <Row>
                                        <Col xs={2}>
                                            <h4>
                                                <Badge pill variant="success">
                                                    {menuKeranjang.jumlah}
                                                </Badge>
                                            </h4>
                                        </Col>
                                        <Col>
                                            <h5>{menuKeranjang.product.nama}</h5>
                                            <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                                        </Col>
                                        <Col>
                                            <strong><p className="float-right">Rp. {numberWithCommas(menuKeranjang.total_harga)}</p></strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}

                            <ModalKeranjang handleClose={this.handleClose} {...this.state} tambahPesanan={this.tambahPesanan} kurangiPesanan={this.kurangiPesanan} handleSubmit={this.handleSubmit} handleChangeKeterangan={this.handleChangeKeterangan} hapusPesanan={this.hapusPesanan} />
                        </ListGroup>
                    </Card>
                )}
                {keranjangs.length < 1 && <h6>Belum Ada Pesanan</h6>}
                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        );
    }
}

export default Hasil;

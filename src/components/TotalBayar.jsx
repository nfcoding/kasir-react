import React, { Component, Fragment } from 'react';
import { numberWithCommas } from "../utils/utils";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/contants";

class TotalBayar extends Component {
    submitPesanan = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios
            .post(API_URL + "pesanans", pesanan)
            .then((res) => {
                this.props.history.push('/sukses')
            })
    }
    render() {
        const totalBayar = this.props.keranjangs.reduce((result, item) => {
            return result + item.total_harga
        }, 0)
        return (
            <Fragment>
                {/* web */}
                <div className="fixed-bottom d-none d-md-block">
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4">
                            <h4>
                                Total Harga : {" "}
                                <strong className="float-right mr-2">
                                    Rp. {numberWithCommas(totalBayar)}
                                </strong>
                            </h4>
                            <Button variant="primary" block size="lg" className="mb-2 mt-4 mr-2" onClick={() => this.submitPesanan(totalBayar)}>
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                <strong>Bayar</strong>
                            </Button>
                        </Col>
                    </Row>
                </div>

                {/* {mobile} */}
                <div className="d-sm-block d-md-none">
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4">
                            <h4>
                                Total Harga : {" "}
                                <strong className="float-right mr-2">
                                    Rp. {numberWithCommas(totalBayar)}
                                </strong>
                            </h4>
                            <Button variant="primary" block size="lg" className="mb-2 mt-4 mr-2" onClick={() => this.submitPesanan(totalBayar)}>
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                <strong>Bayar</strong>
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        );
    }
}

export default TotalBayar;
{/* <div className="fixed-bottom">
    <Row>
        <col md={{span: 3, offset: 9}}>
            <h4>asdasd</h4>
        </col>
    </Row>
</div> */}


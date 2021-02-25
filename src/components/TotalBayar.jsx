import React, { Component } from 'react';
import { numberWithCommas } from "../utils/utils";
import { Button } from "react-bootstrap";
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
            <div>
                <h4>Total Harga : Rp. {numberWithCommas(totalBayar)} </h4>
                <Button variant="primary" block onClick={() => this.submitPesanan(totalBayar)}>
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                    <strong>Bayar</strong>
                </Button>
            </div>
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


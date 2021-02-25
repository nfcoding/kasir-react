import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from "axios";
import { API_URL } from "../utils/contants";

class Sukses extends Component {

    componentDidMount() {
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data
                keranjangs.map((item) => {
                    return axios.delete(API_URL + "keranjangs/" + item.id)
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="mt-5 text-center">
                <Image src="assets/images/success_buy.png" width="500"></Image>
                <h2>Sukses Pesan</h2>
                <p>Terima Kasih</p>
                <Button variant="primary" as={Link} to="/">Kembali</Button>
            </div>
        );
    }
}

export default Sukses;

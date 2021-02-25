import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import React, { Component } from "react";
import { API_URL } from "../utils/contants";
import axios from "axios";
import swal from "sweetalert";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: [],
            selectedCategory: 'Makanan',
            keranjangs: []
        };
    }
    componentDidMount() {
        axios
            .get(API_URL + "products?category.nama=" + this.state.selectedCategory)
            .then((res) => {
                const menus = res.data;
                this.setState({ menus });
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data
                this.setState({ keranjangs })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(prevState) {
        if (this.state.keranjangs !== prevState.keranjangs) {
            axios
                .get(API_URL + "keranjangs")
                .then((res) => {
                    const keranjangs = res.data
                    this.setState({ keranjangs })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    changeCategory = (value) => {
        this.setState({
            selectedCategory: value,
            menu: [],
        })
        axios
            .get(API_URL + "products?category.nama=" + value)
            .then((res) => {
                const menus = res.data;
                this.setState({ menus });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    masukKeranjang = (value) => {
        axios
            .get(API_URL + "keranjangs?product.id=" + value.id)
            .then((res) => {
                if (res.data.length === 0) {
                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value
                    }
                    axios
                        .post(API_URL + "keranjangs", keranjang)
                        .then((res) => {
                            swal({
                                title: 'Success',
                                text: keranjang.product.nama + " Ditambahkan!",
                                icon: 'success',
                                button: false,
                                timer: 2000
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value
                    }
                    axios
                        .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
                        .then((res) => {
                            swal({
                                title: 'Success',
                                text: keranjang.product.nama + " Ditambahkan!",
                                icon: 'success',
                                button: false,
                                timer: 2000
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        const { menus, selectedCategory, keranjangs } = this.state;
        return (

            <div className="mt-3">
                <Container fluid>
                    <Row>
                        <ListCategories changeCategory={this.changeCategory} selectedCategory={selectedCategory} />
                        <Col>
                            <h3>Daftar Produk</h3>
                            <Row className="overflow-auto menu">
                                {
                                    menus && menus.map((menu) => (
                                        <Menus key={menu.id + 1} menu={menu} masukKeranjang={this.masukKeranjang} />
                                    ))
                                }
                            </Row>
                        </Col>
                        <Hasil keranjangs={keranjangs} {...this.props} />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;

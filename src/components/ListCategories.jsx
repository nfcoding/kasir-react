import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap'
import axios from "axios";
import { API_URL } from "../utils/contants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
    if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-2" />
    if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />

    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
}

class ListCategories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "categories")
            .then((res) => {
                const categories = res.data;
                this.setState({ categories });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        const { categories } = this.state
        const { changeCategory, selectedCategory } = this.props
        return (
            <Col md={2} mt="4">
                <h3>Kategori</h3>
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item
                            key={category.id + 1} onClick={() => changeCategory(category.nama)}
                            className={selectedCategory === category.nama && "category-aktif"}
                            style={{ cursor: 'pointer' }}
                        >
                            <h6>
                                <Icon nama={category.nama} /> {category.nama}
                            </h6>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col >
        );
    }
}

export default ListCategories;

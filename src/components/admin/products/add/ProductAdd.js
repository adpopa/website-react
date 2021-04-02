import React, { Component } from "react";
import { Form, FormGroup, Button, FormLabel, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../../../actions/productActions";
import classnames from "classnames";

class DashAddProduct extends Component {

  constructor() {
    super();
    this.state = {
      productGender: "",
      productBrand: "",
      productType: "",
      productName: "",
      productPrice: "",
      productColours: [],
      errors: {
        productColours: {
          productColour: {},
          productVariations: {
            productQuantity: {},
            productSize: {}
          }
        }
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hook
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  createColoursUI() {
    const { errors } = this.state;

    return this.state.productColours.map((colour, indexOne) => (
      <Card key={indexOne}>
        <Card.Body>
          <FormGroup >
            <FormGroup>
              <Form.Control
                type="text"
                placeholder="Colour"
                value={colour.productColour}
                onChange={this.onChangeColour.bind(this, indexOne, "productColour")}
                className={classnames({"is-invalid": errors.productColours.productColour[indexOne]})}
              />
              {
                errors.productColours.productColour[indexOne] && (
                <div className="invalid-feedback" variant="danger">
                  {errors.productColours.productColour[indexOne]}
                </div>
                )
              }
            </FormGroup>
            {
              colour.productVariations.map((variation, indexTwo) => (
                <div key={indexTwo}>
                  <Form.Row>
                    <FormGroup as={Col}>
                      <Form.Label>Product Size</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Size"
                        value={variation.productSize}
                        onChange={this.onChangeVariation.bind(this, indexOne, indexTwo, "productSize")}
                        className={classnames({"is-invalid": errors.productColours.productVariations.productSize[indexOne.toString() + indexTwo.toString()]})}
                      />
                      {
                        errors.productColours.productVariations.productSize[indexOne.toString() + indexTwo.toString()] && (
                        <div className="invalid-feedback" variant="danger">
                          {errors.productColours.productVariations.productSize[indexOne.toString() + indexTwo.toString()]}
                        </div>
                        )
                      }
                    </FormGroup>
                    <FormGroup as={Col}>
                      <Form.Label>Product Quantity</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Quantity"
                        value={variation.productQuantity}
                        onChange={this.onChangeVariation.bind(this, indexOne, indexTwo, "productQuantity")}
                        className={classnames({"is-invalid": errors.productColours.productVariations.productQuantity[indexOne.toString() + indexTwo.toString()]})}
                      />
                      {
                        errors.productColours.productVariations.productQuantity[indexOne.toString() + indexTwo.toString()] && (
                        <div className="invalid-feedback" variant="danger">
                          {errors.productColours.productVariations.productQuantity[indexOne.toString() + indexTwo.toString()]}
                        </div>
                        )
                      }
                    </FormGroup>
                    <FormGroup as={Col}>
                      <Button 
                        variant="primary" size="sm" 
                        onClick={this.removeVariationClick.bind(this, indexOne, indexTwo)}
                        >
                        remove variation
                      </Button>
                    </FormGroup>
                  </Form.Row>
                </div>
              ))}
          </FormGroup>
          <Button 
            variant="primary" size="sm" 
            onClick={this.addVariationClick.bind(this, indexOne)}
            >
            Add variation
          </Button>
          <Button 
            variant="primary" size="sm" 
            onClick={this.removeColourClick.bind(this, indexOne)}
          >
            Remove colour
          </Button>
        </Card.Body>
      </Card>
    ));
  }

  onChangeColour(index, field, event) {
    let productColours = [...this.state.productColours];
    productColours[index][field] = event.target.value;
    this.setState({ productColours: productColours });
  }

  onChangeVariation(indexOne, indexTwo, field, event) {
    let productColours = [...this.state.productColours];
    productColours[indexOne].productVariations[indexTwo][field] = event.target.value;
    this.setState({ productColours: productColours });
  }

  addColourClick() {
    const colour = {
      productColour: "",
      productVariations: [{
        productSize: "",
        productQuantity: ""
        }]
    };
    this.setState(prevState => ({
      productColours: [...prevState.productColours, colour]
    }));
  }

  addVariationClick(index) {
    let productColours = [...this.state.productColours];
    
    const variation = {
      productSize: "",
      productQuantity: ""
    };

    productColours[index]["productVariations"].push(variation);

    this.setState({productColours: productColours})
  }

  removeColourClick(index) {
    let productColours = [...this.state.productColours];
    productColours.splice(index, 1);
    this.setState({ productColours });
  }

  removeVariationClick(indexOne, indexTwo) {
    let productColours = [...this.state.productColours];
    productColours[indexOne]["productVariations"].splice(indexTwo, 1);
    this.setState({ productColours });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newProduct = {
      productGender: this.state.productGender,
      productBrand: this.state.productBrand,
      productType: this.state.productType,
      productName: this.state.productName,
      productPrice: this.state.productPrice,
      productColours: this.state.productColours
    };
    this.props.addProduct(newProduct, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1>Dash Products</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <FormLabel>Gender</FormLabel>
            <Form.Control
              as="select"
              name="productGender"
              className={classnames({ "is-invalid": errors.productGender })}
              value={this.state.productGender}
              onChange={this.onChange}
            >
              <option value="Select gender">Select gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </Form.Control>
            {errors.productGender && (
              <div className="invalid-feedback" variant="danger">
                {errors.productGender}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Form.Label>Product brand</Form.Label>
            <Form.Control
              type="text"
              className={classnames({ "is-invalid": errors.productBrand })}
              placeholder="Enter product name"
              name="productBrand"
              value={this.state.productBrand}
              onChange={this.onChange}
            />
            {errors.productBrand && (
              <div className="invalid-feedback" variant="danger">
                {errors.productBrand}
              </div>
            )}
            <Form.Text className="text-muted">
              Bla bla blaa instructons.
            </Form.Text>
          </FormGroup>
          <FormGroup>
            <Form.Label>Product type</Form.Label>
            <Form.Control
              type="text"
              className={classnames({ "is-invalid": errors.productType })}
              placeholder="Enter product type"
              name="productType"
              value={this.state.productType}
              onChange={this.onChange}
            />
            {errors.productType && (
              <div className="invalid-feedback" variant="danger">
                {errors.productType}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Form.Label>Product name</Form.Label>
            <Form.Control
              type="text"
              className={classnames({ "is-invalid": errors.productName })}
              placeholder="Enter product name"
              name="productName"
              value={this.state.productName}
              onChange={this.onChange}
            />
            {errors.productName && (
              <div className="invalid-feedback" variant="danger">
                {errors.productName}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Form.Label>Product price</Form.Label>
            <Form.Control
              type="text"
              className={classnames({ "is-invalid": errors.productPrice })}
              pattern="[0-9.]*"
              placeholder="Enter product price"
              name="productPrice"
              value={this.state.productPrice}
              onChange={this.onChange}
            />
            {errors.productPrice && (
              <div className="invalid-feedback" variant="danger">
                {errors.productPrice}
              </div>
            )}
          </FormGroup>
          {this.createColoursUI()}
          <Button onClick={this.addColourClick.bind(this)}>Add colour</Button>
          <hr />
          <Button className="float-right" variant="dark" type="submit">
            Add product
          </Button>
        </Form>
      </div>
    );
  }
}

DashAddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addProduct })(DashAddProduct);

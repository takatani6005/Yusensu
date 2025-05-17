import React from 'react';
import { Container, Table, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice 
  } = useCart();

  const handleCheckout = () => {
    alert('Thank you for your order! Your delicious sushi is on the way!');
    clearCart();
  };

  return (
    <Container className="py-5 mt-5">
      <h1 className="display-4 mb-5 text-center">Your Cart</h1>

      {cartItems.length > 0 ? (
        <Row>
          <Col lg={8}>
            <Table responsive className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <img src={item.image} alt={item.name} className="me-3" />
                        <div>
                          <h6 className="mb-0">{item.name}</h6>
                          <small className="text-muted">{item.category}</small>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">${item.price.toFixed(2)}</td>
                    <td className="align-middle">
                      <div className="quantity-control d-flex align-items-center">
                        <Button 
                          variant="light" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <input 
                          type="text" 
                          value={item.quantity} 
                          readOnly 
                        />
                        <Button 
                          variant="light" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </div>
                    </td>
                    <td className="align-middle fw-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="align-middle">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Header className="bg-dark text-white">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <span>Items Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Delivery Fee:</span>
                  <span>$5.00</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax:</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3 fw-bold fs-5">
                  <span>Total:</span>
                  <span>
                    ${(getTotalPrice() + 5 + getTotalPrice() * 0.08).toFixed(2)}
                  </span>
                </div>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100 mt-3"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline-secondary"
                  size="sm"
                  className="w-100 mt-3"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="text-center py-5">
          <Alert variant="info">
            <h4>Your cart is empty</h4>
            <p className="mb-0">You haven't added any items to your cart yet.</p>
          </Alert>
          <Link to="/menu">
            <Button variant="primary" className="mt-3">Browse Menu</Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Cart; 
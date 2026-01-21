import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";

const FeaturedHotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:2323/api/hotels")
      .then(res => setHotels(res.data))
      .catch(err => console.log("Error fetching hotels:", err));
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Featured Hotels</h2>
      <Row>
        {hotels.map((hotel) => (
          <Col key={hotel.hotel_id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={hotel.image_url || "https://via.placeholder.com/400"} />
              <Card.Body>
                <Card.Title>{hotel.hotel_name}</Card.Title>
                <Card.Text>{hotel.city_name}</Card.Text>
                <Card.Text className="text-muted">₹{hotel.price_per_night} / night</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedHotels;

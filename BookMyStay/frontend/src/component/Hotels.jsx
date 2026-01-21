import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Dropdown, Spinner } from "react-bootstrap";
import NavigationBar from "../component/Navbar";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import "../Css/hotels.css"

const Hotels = () => {
  const baseURL = "http://localhost:2323";
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
    fetchHotels();
  }, []);

  const fetchCities = async () => {                   //loads cities for dropdown.y
    try {
      const res = await axios.get("http://localhost:2323/api/cities");
      setCities(res.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchHotels = async (cityId) => {   //loads all hotels from backend.
    try {
      setLoading(true);
      const url = cityId
        ? `http://localhost:2323/api/hotels/city/${cityId}`
        : "http://localhost:2323/api/hotels";
      const res = await axios.get(url);
      setHotels(res.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (cityId, cityName) => {
    setSelectedCity(cityName);
    fetchHotels(cityId !== "all" ? cityId : null);
  };

   const handleBookNow = (hotelId) => {
    navigate(`/rooms/${hotelId}`);
  };

  const getHotelImage = (hotelName) => {
    const imagePath= "http://localhost:2323" + hotelName;
    return imagePath;
  };

  return (
    <>
      <NavigationBar />

      <Container className="hotels-container my-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary">Explore Hotels</h2>
          <Dropdown>
            <Dropdown.Toggle variant="primary">{selectedCity}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCitySelect("all", "All Cities")}>
                All Cities
              </Dropdown.Item>
              {cities.map((city) => (
                <Dropdown.Item
                  key={city.city_id}
                  onClick={() => handleCitySelect(city.city_id, city.city_name)}
                >
                  {city.city_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            {hotels.length === 0 ? (
              <p className="text-center mt-5">No hotels found.</p>
            ) : (
              hotels.map((hotel) => (
                <Col key={hotel.hotel_id} xs={12} sm={6} lg={4} className="mb-4">
                  <Card className="hotel-card shadow-sm border-0">
                    <div className="hotel-image-wrapper">
                      <img
                        src={getHotelImage(hotel.image_url)}
                        alt={hotel.name}
                        className="d-block w-100 hero-img"
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="fw-bold text-dark">{hotel.name}</Card.Title>
                      <p className="text-muted city-name mb-1">{hotel.city_name}</p>
                      <Card.Text className="text-secondary description">
                        {hotel.description}
                      </Card.Text>
                       <button
                        className="btn btn-primary w-100 rounded-pill"
                        onClick={() => handleBookNow(hotel.hotel_id)}
                      >
                        Book Now
                      </button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Hotels;

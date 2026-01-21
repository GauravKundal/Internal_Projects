// 📁 src/pages/Rooms.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import NavigationBar from "../component/Navbar";
import Footer from "../component/Footer";
import "../Css/hotels.css"

const Rooms = () => {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `http://localhost:2323/api/rooms/hotels/${hotelId}`
      );
      setRooms(res.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

   const getRoomImage = (roomType) => {
        // switch (hotelId) {
        //  case 15:
        //   switch (roomType) {
        //     case "Family Room":
        //       return "../public/assets/Rooms/Family Room.jfif";
        //     case "Single Room":
        //       return "../public/assets/Rooms/Single Room.jfif";
        //     default:
        //       return "../src/assets/rooms/hotel15-default.jpg";
        //   }
        // }
        switch (roomType) {
            case "Family Room":
                return "../src/assets/Rooms/family.jpg";
            case "Single Room":
                return "../src/assets/Rooms/single.jpg";
            case "Double Room":
                return "../src/assets/Rooms/double.jpg";
            case "Single Room":
                return "../src/assets/Rooms/f2 Room.jfif";
            case "Delux Room":
                return "../src/assets/Rooms/deluxe.jpeg";
            case "Room":
                return "../src/assets/Rooms/luxury.jpg";
        }
    };

  return (
    <>
      <NavigationBar />
      <Container className="my-5 pt-5">
        <h2 className="fw-bold text-primary mb-4 text-center">
          Available Rooms
        </h2>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            {rooms.length === 0 ? (
              <p className="text-center mt-5">
                No rooms available for this hotel.
              </p>
            ) : (
              rooms.map((room) => (
                <Col key={room.room_id} xs={12} sm={6} lg={4} className="mb-4">
                  <Card className="room-card shadow-sm border-0">
                    <Card.Img
                      variant="top"
                      src={getRoomImage(room.room_type)}
                      alt={room.room_type}
                    />
                    <Card.Body>
                      <Card.Title>{room.room_type}</Card.Title>
                      <p className="text-muted">Status: {room.status}</p>
                      <p className="fw-bold text-success">
                        ₹{room.price} / night
                      </p>
                      <button
                        className="btn btn-primary w-100 rounded-pill"
                        onClick={() =>
                          navigate(`/book/${hotelId}/${room.room_id}`, {
                            state: {
                              hotelId,
                              roomId: room.room_id,
                              hotelName: rooms[0]?.hotel_name || "Hotel",
                              roomType: room.room_type,
                              price: room.price,
                            },
                          })
                        }
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

export default Rooms;

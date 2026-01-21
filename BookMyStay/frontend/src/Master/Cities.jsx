import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { toast, Bounce } from "react-toastify";
import { api } from "../api";
import "../Css/Master/CityMaster.css";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch cities from API
  const fetchCities = async () => {
    try {
      const res = await api.get("/cities");
      setCities(Array.isArray(res.data) ? res.data : []); // use res.data
    } catch (error) {
      toast.error("Failed to load cities.", { theme: "colored", transition: Bounce });
      console.error("fetchCities error:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // ✅ Add new city
  const handleAddCity = async (e) => {
    e.preventDefault();
    if (!cityName.trim()) return toast.warn("Please enter a city name.");
    setLoading(true);
    try {
      await api.post("/cities", { name: cityName });
      toast.success("City added successfully!", { theme: "colored", transition: Bounce });
      setShowModal(false);
      setCityName("");
      fetchCities(); // refresh list
    } catch (error) {
      toast.error("Error adding city.", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center mb-3">
        <Col>
          <h3 className="text-primary fw-bold">City Master</h3>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => setShowModal(true)}>
            ➕ Add City
          </Button>
        </Col>
      </Row>

      {/* City Table */}
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>City Name</th>
          </tr>
        </thead>
        <tbody>
          {cities.length > 0 ? (
            cities.map((city, index) => (
              <tr key={city.city_id || index}>
                <td>{index + 1}</td>
                <td>{city.city_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No cities found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add City Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New City</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddCity}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>City Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city name"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add City"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

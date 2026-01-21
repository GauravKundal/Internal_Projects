import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { toast, Bounce } from "react-toastify";
import { api } from "../api"; // your fetch wrapper
import "../Css/Master/Hotels.css";

export default function Hotels() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    hotel_id:0,
    name: "",
    city_id: "",
    address: "",
    rating: "",
    contact: "",
  });

  const handleFile = (e) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  // Load hotels
  const fetchHotels = async () => {
    try {
      const res = await api.get("/hotels");
      setHotels(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load hotels", { transition: Bounce });
    }
  };

  // Load cities for dropdown
  const fetchCities = async () => {
    try {
      const res = await api.get("/cities");
      setCities(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load cities", { transition: Bounce });
    }
  };

  const onDelete=  async (hotel_id) => {
    try {
      const res =   await api.delete(`/hotels/${hotel_id}`);
     
     if(res){
        toast.success("deleted successfully",{ transition: Bounce });
        fetchHotels();
      }  
    } catch (err) {
         if(err.response.data.code=="BOOKING_ALREADY_EXISTS"){
        toast.success("Hotel already has booking thats why it not deleted",{ transition: Bounce });
        fetchHotels();
      }
      else{
           toast.error("Failed to load cities", { transition: Bounce });
      }
     
    }
  }

  useEffect(() => {
    fetchHotels();
    fetchCities();
  }, []);

  const openAddModal = () => {
    setFormData({ hotel_id:0, name: "", city_id: "", address: "", description: "" });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onEdit= (hotel)=>{
    let city_id=cities.filter(c=>c.city_name==hotel.city_name)[0].city_id;
    setFormData({
      hotel_id:hotel.hotel_id,
      name:hotel.name,
      city_id:city_id,
      address:hotel.address,
      description:hotel.description,
      image:hotel.image_url
    })
    setShowModal(true);
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
  if (!formData.name || !formData.city_id) return toast.warn("Please provide hotel name and city");
  setLoading(true);
  try {
    const fd = new FormData();
    fd.append("hotel_id",formData.hotel_id);
    fd.append("name", formData.name);
    fd.append("city_id", formData.city_id);
    fd.append("address", formData.address || "");
    fd.append("description", formData.description || "");
    if (file) fd.append("image", file);

    const res = await api.post("/hotels", fd);

    if (!res) throw new Error(await res.text());
    toast.success("Hotel added successfully");
    setShowModal(false);
    fetchHotels();
    } catch (err) {
      toast.error("Failed to add hotel", { transition: Bounce });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container className="mt-5">
      <Row className="align-items-center mb-3">
        <Col>
          <h3 className="text-primary fw-bold">Hotel Master</h3>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={openAddModal}>➕ Add Hotel</Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>Sr No</th>
            <th>Hotel Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length > 0 ? hotels.map((h, i) => (
            <tr key={h.hotel_id || i}>
              <td>{i + 1}</td>
              <td>{h.name}</td>
              <td>{h.city_name || h.city}</td>
              <td>{h.address}</td>
              <td>{h.description}</td>
              <td>
                <button className="btn btn-sm btn-success" onClick={() => onEdit(h)}>Edit</button>
              </td>
              <td>
                 <button
                          className="btn btn-sm btn-danger"
                          onClick={() => onDelete(h.hotel_id)}
                        >
                          Delete
                        </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" className="text-center">No hotels found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add Hotel Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Hotel</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleAddHotel}>
          <Modal.Body>

            <Form.Control
              type="hidden"
              name="hotel_id"
              value={formData.hotel_id}
              onChange={handleChange}
            />

            <Form.Group className="mb-3">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Select name="city_id" value={formData.city_id} onChange={handleChange} required>
                <option value="">-- Select City --</option>
                {cities.map(c => (
                  <option key={c.city_id} value={c.city_id}>{c.city_name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control name="address" value={formData.address} onChange={handleChange} />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" onChange={handleFile} />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Hotel"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

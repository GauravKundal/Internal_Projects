import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { registerUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
// import { EyeFill, EyeSlashFill } from "react-bootstrap-icons"; // 👁 Import icons
import { EyeFill,EyeSlashFill } from "react-bootstrap-icons";
import "../Css/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👁 Toggle state

  // ✅ Simple regex patterns
  const nameRegex = /^[A-Za-z ]{2,}$/; // only letters, min 2 chars
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // standard email
  const passwordRegex = /^(?=.*[0-9]{4,})(?=.*[!@#$%^&*]).{5,}$/; // 4 numbers + 1 special char
  const phoneRegex = /^[0-9]{10}$/; // 10 digits only

  // ✅ Handle input change and instant validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let message = "";
    switch (name) {
      case "name":
        message = nameRegex.test(value)
          ? ""
          : "Enter a valid name (only letters)";
        break;
      case "email":
        message = emailRegex.test(value)
          ? ""
          : "Enter a valid email address";
        break;
      case "password":
        message = passwordRegex.test(value)
          ? ""
          : "Password must have 4 numbers & 1 special character";
        break;
      case "phone":
        message =
          value === "" || phoneRegex.test(value)
            ? ""
            : "Phone must be 10 digits";
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: message });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameRegex.test(formData.name)) {
      toast.error("Please enter a valid name!");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must have 4 numbers & 1 special character!");
      return;
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be 10 digits!");
      return;
    }

    try {
      const res = await registerUser(formData);

      if (res.status === 201) {
        toast.success("🎉 Registration successful! Please login.", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Bounce,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2200);
      } else {
        toast.error("Registration failed! Please try again.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4 text-primary">User Registration</h3>
          <Form onSubmit={handleSubmit}>
            {/* ✅ Name */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            {/* ✅ Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* ✅ Password with Eye Toggle */}
            <Form.Group className="mb-3 position-relative">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.password}
                  placeholder="Enter password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </span>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* ✅ Phone */}
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-primary">
              Login
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
} from "react-bootstrap";
import { loginUser, storeToken, getToken ,storeRole} from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import "../Css/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9]{4,})(?=.*[!@#$%^&*]).{5,}$/;

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let message = "";
    if (name === "email") {
      message = emailRegex.test(value) ? "" : "Enter a valid email address";
    } else if (name === "password") {
      message = passwordRegex.test(value)
        ? ""
        : "Password must have 4 numbers & 1 special character";
    }
    setErrors({ ...errors, [name]: message });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format!");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must have 4 numbers & 1 special character!");
      return;
    }

    try {
      const res = await loginUser(formData);
      if (res.status === 200) {
        storeToken(res.data.token);
		    storeRole(res.data.role);
        toast.success("🎉 Login successful!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Bounce,
        });
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials!", {
          position: "top-right",
          theme: "colored",
        });
      } else {
        toast.error("Server error! Try again later.");
      }
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col md={5} lg={4}>
          <Card className="shadow-lg p-4 rounded-4 border-0">
            <Card.Body>
              <h3 className="text-center text-primary mb-4 fw-bold">
                Welcome Back
              </h3>
              <p className="text-center text-muted mb-4">
                Please login to your account
              </p>

              <Form onSubmit={handleSubmit}>
                {/* ✅ Email Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* ✅ Password Field with Eye Icon */}
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      value={formData.password}
                      required
                      isInvalid={!!errors.password}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      className="border-0 bg-transparent"
                      type="button"
                    >
                      {showPassword ? (
                        <EyeSlashFill size={20} />
                      ) : (
                        <EyeFill size={20} />
                      )}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 py-2 fw-semibold"
                >
                  Login
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted">
                  Don’t have an account?{" "}
                  <a href="/register" className="text-primary fw-semibold">
                    Register
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

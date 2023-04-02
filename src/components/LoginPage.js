import { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:8080/authenticate", {
      username,
      password,
    });
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else {
      setErrorMessage(response.data.message);
    }
  };

  return (
    <div class="login">
      <Container>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            class="btn btn-primary btn-block btn-large"
          >
            Let me in.
          </Button>

          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;

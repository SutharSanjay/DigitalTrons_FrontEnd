//import all require dependencies

import "./style/index.css";
import { useState, useEffect, useReducer } from "react";
import {
  Navbar,
  Container,
  Modal,
  Row,
  Button,
  Form,
  FloatingLabel,
  Col,
} from "react-bootstrap";
import LoadingScreen from "react-loading-screen";
// load default initialSlots from initialSlots.json file
import initialSlots from "./initialSlots.json";

//import all API functions
import { getAllSlot, deleteSlot, updateSlot, createSlot } from "../api";

function App() {
  // useState
  const [editPart, setEditPart] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [modelData, setModelData] = useState("");

  useEffect(() => {
    preload();
  }, []);

  //preload function is used to check initialSlots and booked slots and merge them
  const preload = async () => {
    var Response = await getAllSlot();
    if (Response.err) {
    } else {
      Response.map(async (data) => {
        for (let j = 0; j < initialSlots.length; j++) {
          if (data.startTime === initialSlots[j].startTime) {
            initialSlots[j] = data;
            initialSlots[j]["booked"] = true;
          }
        }
      });

      //used to re-render
      forceUpdate();
    }
  };

  const handleModel = (data) => {
    setModelData(data);
    setEditPart(true);
  };

  // handleDeletSlot used to delete slot individual
  const handleDeletSlot = async (e) => {
    e.preventDefault();

    // model loading used to show loading flash screen
    setModelLoading(true);
    var Response = await deleteSlot(modelData._id);
    if (Response.err) {
      setModelLoading(false);
    } else {
      setModelLoading(false);
      setEditPart(false);
      window.location.reload(1);
    }
  };

  // main submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setModelLoading(true);
    //formdata is used to send and bind data in multidata format
    let formdata = new FormData();
    formdata.set("startTime", modelData.startTime);
    formdata.set("contactFirstName", modelData.contactFirstName);
    formdata.set("contactLastName", modelData.contactLastName);
    formdata.set("contactPhone", modelData.contactPhone);

    // check that selected slot is already created or not if not call create api
    if (modelData._id) {
      var Response = await updateSlot(modelData._id, formdata);
      if (Response.err) {
      } else {
        setModelLoading(false);
        window.location.reload(1);
      }
    } else {
      var Response = await createSlot(formdata);
      if (Response.err) {
      } else {
        setModelLoading(false);
        window.location.reload(1);
      }
    }
  };

  // contact info change function
  const handleChange = (name) => (event) => {
    setModelData({ ...modelData, [name]: event.target.value });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#">DIGITAL TRONS</Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <Container fluild>
        <div className="card_flex">
          {initialSlots &&
            initialSlots.map((data) => {
              if (data.booked) {
                return (
                  <div
                    onClick={() => handleModel(data)}
                    key={data.id}
                    className="card_main red"
                  >
                    <h5>{data.startTime}</h5>
                  </div>
                );
              } else {
                return (
                  <div
                    key={data.id}
                    onClick={() => handleModel(data)}
                    className="card_main"
                  >
                    <h5>{data.startTime}</h5>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Modal
        size="lg"
        show={editPart}
        onHide={() => setEditPart(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <LoadingScreen
          loading={modelLoading}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          text="Please Wait..."
        ></LoadingScreen>
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">Details</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="First Name"
                  className="mb-3"
                >
                  <Form.Control
                    value={modelData.contactFirstName}
                    required
                    onChange={handleChange("contactFirstName")}
                    type="text"
                    placeholder="firstname"
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Last Name"
                  className="mb-3"
                >
                  <Form.Control
                    value={modelData.contactLastName}
                    onChange={handleChange("contactLastName")}
                    required
                    type="text"
                    placeholder="lastname"
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Phone Number"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="tel"
                    value={modelData.contactPhone}
                    onChange={handleChange("contactPhone")}
                    pattern="[6-7-8-9][0-9]{9}"
                    placeholder="phone number"
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditPart(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeletSlot}>
              Delete
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default App;

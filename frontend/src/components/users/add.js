import { PostApiDetails, RoleGetApiDetails } from "@/pages/api/AxiosRequest";
import { useEffect, useState } from "react";
import { ModalButton, ModalPopup } from "../common/modal";
import { toast } from "react-toastify";
import LoadingPage from "../common/loadingPage";

const { Button, Form, Row, Col } = require("react-bootstrap");

const AddUser = ({ reloadData }) => {
  const [file, setFile] = useState([]);
  const [PersonNameError, setPersonNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [userError, setUserError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const [ContactInfoError, setContactInfoError] = useState("");
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [roledata, setRoleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [AllData, setAlldata] = useState({
    Person_name: "",
    email: "",
    user_name: "",
    Contact_Info: "",
    password: "",
    confirm_password: "",
    Profile_Picture: "",
  });
  const handleAllChange = (event) => {
    setAlldata({ ...AllData, [event.target.name]: event.target.value });
  };
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Person_name: AllData.Person_name,
      email: AllData.email,
      user_name: AllData.user_name,
      Contact_Info: AllData.Contact_Info,
      password: AllData.password,
      confirmpassword: AllData.confirm_password,
      Profile_Picture: file,
    };
    console.log(AllData);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else if (AllData.password !== AllData.confirm_password) {
      setConfirmPasswordError(
        "The confirm password and new password must match"
      );
    } else {
      setLoading(true);
      return PostApiDetails(data)
        .then((resp) => {
          console.log(resp);
          handleClose();
          setAlldata("");
          reloadData();
          setValidated(false);
          setLoading(false);
          toast.success(resp.data.message);
          setPersonNameError("");
          setEmailError("");
          setUserError("");
          setContactInfoError("");
          setPasswordError("");
          setConfirmPasswordError("");
        })
        .catch((error) => {
          console.log(error);
          // if (AllData.first_name === '' || AllData.last_name === '' || AllData.email === '' || AllData.phone_number === '' || AllData.password === '' || AllData.confirm_password === '' || AllData.roleselect === '' || AllData.password !== AllData.confirm_password) {
          setLoading(false);
          setPersonNameError(
            error?.response?.data.error.errors?.Person_name?.message
          );
          setUserError(error?.response?.data.error.errors?.user_name?.message);
          setEmailError(error?.response?.data.error.errors?.email?.message);
          setPasswordError(
            error?.response?.data.error.errors?.password?.message
          );
          setConfirmPasswordError(
            error?.response?.data.error.errors?.confirmpassword?.message
          );
          setContactInfoError(
            error?.response?.data.error.errors?.Contact_Info?.message
          );
          // }
        });
    }
  };
  return (
    <>
      <Button className="btn btn-success" onClick={handleShow}>
        <i className="fa fa-plus mt-1"></i> <span>Add New User</span>
      </Button>
      <ModalPopup
        title="Add Users"
        show={show}
        handleClose={() => {
          {
            setShow(false);
            setValidated(false);
            setPersonNameError("");
            setEmailError("");
            setUserError("");
            setContactInfoError("");
            setPasswordError("");
            setConfirmPasswordError("");
          }
        }}
      >
        {loading ? <LoadingPage /> : null}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col className="col">
              <Form.Group>
                <Form.Label>
                  Person Name<span className="text-danger"> * </span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="Person_name"
                  value={AllData.Person_name || ""}
                  onChange={handleAllChange}
                  placeholder="First Name"
                />
                <Form.Control.Feedback type="invalid">
                  <label className="validation-invalid-label">
                    Enter Person name
                  </label>
                </Form.Control.Feedback>
                <label className="error-msg">{PersonNameError}</label>
              </Form.Group>
            </Col>
            <Col className="rowcol">
              <Form.Group>
                <Form.Label>
                  Email<span className="text-danger"> * </span>
                </Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={AllData.email || ""}
                  onChange={handleAllChange}
                  placeholder="Email"
                />
                <Form.Control.Feedback type="invalid">
                  <label className="validation-invalid-label">
                    Email is required
                  </label>
                </Form.Control.Feedback>
                <label className="error-msg">{EmailError}</label>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="col">
              <Form.Group>
                <Form.Label>
                  User Name<span className="text-danger"> * </span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="user_name"
                  value={AllData.user_name || ""}
                  onChange={handleAllChange}
                  placeholder="First Name"
                />
                <Form.Control.Feedback type="invalid">
                  <label className="validation-invalid-label">
                    Enter user name
                  </label>
                </Form.Control.Feedback>
                <label className="error-msg">{userError}</label>
              </Form.Group>
            </Col>
            <Col className="col">
              <Form.Group>
                <Form.Label>
                  Contact Info<span className="text-danger"> * </span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="Contact_Info"
                  value={AllData.Contact_Info || ""}
                  onChange={handleAllChange}
                  placeholder="Contact Info"
                />
                <Form.Control.Feedback type="invalid">
                  <label className="validation-invalid-label">
                    Enter contact info
                  </label>
                </Form.Control.Feedback>
                <label className="error-msg">{ContactInfoError}</label>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="rowcol">
              <Form.Group>
                <Form.Label>
                  Password<span className="text-danger"> * </span>
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  value={AllData.password || ""}
                  onChange={handleAllChange}
                  placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">
                  <label className="validation-invalid-label">
                    Password is required
                  </label>
                </Form.Control.Feedback>
                <label className="error-msg">{PasswordError}</label>
              </Form.Group>
            </Col>
            <Col className="rowcol">
              <Form.Group>
                <Form.Label>
                  Confirm Password<span className="text-danger"> * </span>
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="confirm_password"
                  value={AllData.confirm_password || ""}
                  onChange={handleAllChange}
                  placeholder="Confirm Password"
                />
                <Form.Control.Feedback type="invalid">
                  <label className="validation-invalid-label">
                    Enter confirm password
                  </label>
                </Form.Control.Feedback>
                <label className="error-msg">{ConfirmPasswordError}</label>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="rowcol">
              <Form.Group>
                <Form.Label>
                  Profile Picture <span className="text-danger"> * </span>
                </Form.Label>
                <Form.Control
                required
                  type="file"
                  name="file"
                  onChange={onFileChange}
                  placeholder="Profile Picture"
                />
                <Form.Control.Feedback type="invalid">
                  <label className="validation-invalid-label">
                    Upload Profile Picture
                  </label>
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <ModalButton
            handleClose={() => {
              {
                setShow(false);
                setValidated(false);
                setPersonNameError("");
                setEmailError("");
                setUserError("");
                setContactInfoError("");
                setPasswordError("");
                setConfirmPasswordError("");
              }
            }}
          />
        </Form>
      </ModalPopup>
    </>
  );
};

export default AddUser;

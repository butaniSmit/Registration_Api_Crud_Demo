import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import AddUser from "./add";
import {
  Api,
  DeleteApiDetails,
  GetDetailsById,
  RoleGetApiDetails,
  UpdateApiDetails,
} from "@/pages/api/AxiosRequest";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { ModalButton, ModalPopup } from "../common/modal";
import DataTable from "../common/customDataTable";
const UserList = () => {
  const [file, setFile] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showw, setShoww] = useState(false);
  const handleClosee = () => setShoww(false);
  const [PersonNameError, setPersonNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [userError, setUserError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const [ContactInfoError, setContactInfoError] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalReacodes] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [datalenght, setDatalenght] = useState("0");
  const [filterinput, setFilterInput] = useState("");
  const [input, setInput] = useState({
    Person_name: "",
    email: "",
    user_name: "",
  });
  const [sorting, setSorting] = useState({
    column: "Person_name",
    order: "asc",
  });
  const fieldName = [
    { value: "Person_name ", name: ["Person name "], input: input.name },
    { value: "email", name: ["Email"], input: input.email },
    { value: "user_name", name: ["Username"], input: input.role },
  ];
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
  const renderUsersData = ({ item, index }) => {
    return (
      <tr role="row" className="odd" key={index}>
        {/* <td className="sorting_1">{index + 1}</td> */}
        <td>{item.Person_name}</td>
        <td>{item.email}</td>
        <td>{item.user_name}</td>
        <td>
          <span
            className="fa fa-eye logoicon viewicon view"
            onClick={() => ViewItem(item._id)}
          />
          <span
            className="fa fas fa-edit logoicon editicon edit"
            onClick={() => handleShow(item)}
          ></span>

          <span
            className="fa fa-trash logoicon deleteicon delete"
            onClick={() => DeleteItem(item._id)}
          />
        </td>
      </tr>
    );
  };
  const onPageChanged = (page) => {
    setPage(page);
  };
  const onChangeRecordsPerPage = (event) => {
    setRecordsPerPage(parseInt(event.target.value));
    setPage(1);
  };
  const fetchData = async () => {
    setLoading(true);
    return Api(
      "users",
      recordsPerPage,
      page,
      sorting.column,
      sorting.order,
      filterinput
    )
      .then((resp) => {
        setUserData(resp.data.document);
        setLoading(false);
        const totalPages = Math.ceil(resp.data.result / recordsPerPage);
        setTotalPages(totalPages);
        setTotalReacodes(resp.data.result);
        setDatalenght(resp.data.datalength);
        if (resp.data.result === 0) {
          setTotalPages(Math.ceil(resp.data.result / 0));
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const handleShow = (item) => {
    setShow(true);
    setId(item._id);
    setAlldata({
      Person_name: item.Person_name,
      email: item.email,
      user_name: item.user_name,
      Contact_Info: item.Contact_Info,
    });
  };
  const ViewItem = (id) => {
    return GetDetailsById(id).then((resp) => {
      setAlldata(resp.data.document);
      setFile(resp.data.document.Profile_Picture);
      setShoww(true);
    });
  };
  const DeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const resp = await DeleteApiDetails(id);
      toast.success(resp.data.message);
      fetchData();
      setPage(1);
    }
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else if (
      AllData.password !== AllData.confirm_password &&
      AllData.password !== ""
    ) {
      setConfirmPasswordError(
        "The confirm password and new password must match."
      );
    } else {
        const data = {
            Person_name: AllData.Person_name,
            email: AllData.email,
            user_name: AllData.user_name,
            Contact_Info: AllData.Contact_Info,
          };
          if(file){
              data.Profile_Picture = file
          }
          if (AllData.password) {
            data.password = AllData.password;
            data.confirmpassword= AllData.confirm_password;
          }
      return UpdateApiDetails(data, id)
        .then((resp) => {
          fetchData();
          handleClose();
          setValidated(false);
          toast.success(resp.data.message);
          setPersonNameError("");
          setEmailError("");
          setUserError("");
          setContactInfoError("");
          setPasswordError("");
          setConfirmPasswordError("");
        })
        .catch((error) => {
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
        });
    }
  };
  useEffect(() => {
    fetchData();
  }, [recordsPerPage, page, filterinput, sorting]);
  const reloadData = () => {
    fetchData();
  };
  return (
    <>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    <b>Users</b>
                  </h2>
                </div>
                <div className="col-sm-6 ms-auto">
                  <AddUser reloadData={reloadData} />
                </div>
              </div>
            </div>
            <DataTable
              loading={loading}
              Users={userData}
              recordsPerPage={recordsPerPage}
              fieldName={fieldName}
              input={input}
              renderUsersData={renderUsersData}
              page={page}
              totalPages={totalPages}
              onPageChanged={onPageChanged}
              datalenght={datalenght}
              totalRecords={totalRecords}
              onChangeRecordsPerPage={onChangeRecordsPerPage}
              setSorting={setSorting}
              sorting={sorting}
              setFilterInput={setFilterInput}
              filterinput={filterinput}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
      <Modal show={showw} onHide={handleClosee} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">PersonName</th>
                <td>{AllData ? AllData.Person_name : null}</td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td>{AllData ? AllData.email : null}</td>
              </tr>
              <tr>
                <th scope="row">UserName</th>
                <td>{AllData ? AllData.user_name : null}</td>
              </tr>
              <tr>
                <th scope="row">Profile_Picture</th>
                <td>
                  <img
                    src={`${file}`}
                    className="w-32px h-32px rounded-pill"
                    alt="img"
                    width={34}
                    height={34}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClosee}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalPopup
        title="Edit User"
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
export default UserList;

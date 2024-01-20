import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Reportpreview(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={props.handlePreview}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={inputs.username || null}
            className="form-control"
          />
          <br></br>
          <label>Leave Type</label>
          <input
            type="text"
            name="leaveType"
            onChange={handleChange}
            value={inputs.leaveType || null}
            className="form-control"
          />
          <br></br>

          <label>Status</label>
          <select
            className="form-select"
            name="status"
            onChange={handleChange}
            value={inputs.status || ""}
          >
            <option></option>
            <option name="NEW">NEW</option>
            <option name="APPROVED">APPROVED</option>
            <option name="REJECTED">REJECTED</option>
          </select>
          <br></br>
          <button type="submit" className="form-control btn btn-primary">Preview</button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Reportpreview;
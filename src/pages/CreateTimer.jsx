import { useState, useEffect, useRef } from "react";
import { Timer } from "timer-node";
import { useTimeContext } from "../contexts/TimeContext";
import axios from "axios";
import { nanoid } from "nanoid";
import { Alert, Button, Dropdown, Modal } from "react-bootstrap";

import Navbar from "../components/Navbar";

function CreateTimer() {
  const [time, setTime] = useState('')
  const { projects, setProjects } = useTimeContext();
  const { tasks, setTasks } = useTimeContext();
  const [label, setLabel] = useState("");
  const [project, setProject] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ok, setOk] = useState(false);
  const date = new Date();
  const categorys = tasks.map((task) => task.category);
  const betterCategory = [...new Set(categorys)];

  async function saveToServer(label, project) {
    try {
      const res = await axios.post("http://localhost:3000/tasks", {
        id: nanoid(),
        title: label,
        category: project,
        dateCategory: date.toDateString(),
        date: date.toString(),
        time: time,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
    console.log(time);
  }

  const intervalRef = useRef();
  const timeRef = useRef(new Timer());
  const timer = timeRef.current;

  const start = () => {
    timer.start();
    getTime();
    console.log(date);
    console.log(date.toDateString());
  };

  const pause = () => {
    timer.pause();
  };

  const resume = () => {
    timer.resume();
  };

  const stop = () => {
    timer.stop();
    stopTime();
  };

  const getTime = () => {
    const id = setInterval(() => {
      setTime(timer.format());
    }, 100);
    intervalRef.current = id;
  };

  const stopTime = () => {
    clearInterval(intervalRef.current);
    setTime(timer.format());
  };

  function clear() {
    timer.clear();
    setTime("");
    setLabel("");
    setProject("");
  }

  const save = () => {
      saveToServer(label, project);
      setOk(false);
      console.log(`Time is set at ${time}`);
      console.log(timer.format());
      setTime('')
    
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <h3>Timer</h3>
      {!ok ? (
        <div>
          <Button variant="secondary" onClick={handleShow}>
            Create
          </Button>

          {/* Modal to create */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Dropdown for prev projects */}
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Previous projects
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {betterCategory.map((category) => (
                    <Dropdown.Item
                      key={category}
                      onClick={() => [
                        setProject(category),
                        setProjects(category),
                      ]}
                    >
                      {category}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <input
                type="text"
                onChange={(e) => [
                  setProject(e.target.value),
                  setProjects(e.target.value),
                ]}
                value={project}
                placeholder="Project name"
              />
              <input
                type="text"
                onChange={(e) => setLabel(e.target.value)}
                value={label}
                placeholder="Task name"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={project && label ? () => [setOk(true), handleClose()] : null}
              >
                Save
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        // timer
        <div>
          <Button onClick={start} variant="success">
            Start
          </Button>
          <Button onClick={timer.isPaused() ? resume : pause} variant="warning">
            {timer.isPaused() ? "Resume" : "Pause"}
          </Button>
          <Button onClick={stop} variant="danger">
            Stop
          </Button>
          <p>{time}</p>
          <Button onClick={time ? () => [setShow(true)] : () => [setShow(true)]} variant="secondary">
            Save
          </Button>
          <Button onClick={clear} variant="secondary">
            Clear Time
          </Button>
          <Button onClick={() => [setOk(false), setShowModal(false)]}>Back</Button>


          {/* Alert */}
          <Alert show={show} variant={!time ? "danger" : "success"}>
            <Alert.Heading>
              <h4>{!time ? "Uh-oh!" : "Gr8 succes"}</h4>
              <Button
                onClick={
                  !time ? () => setShow(false) : () => [setShow(false), save(), clear(), setOk(false)]
                }
                variant={!time ? "outline-danger" : "outline-success"}
              >
                X
              </Button>
            </Alert.Heading>
            {!time ? <p>You cant save untimed stuff! :C</p> : <p>Saved AF</p>}
            <hr />
            <div className="d-flex justify-content-end"></div>
          </Alert>
        </div>
      )}
      <Navbar />
    </div>
  );
}

export default CreateTimer;

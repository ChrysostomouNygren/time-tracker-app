import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useTimeContext } from "../contexts/TimeContext";
import { Nav, Navbar as Navi, Container } from "react-bootstrap";

function Overview() {
  const { tasks, setTasks } = useTimeContext();
  const [projectButton, setProjectButton] = useState(false);
  const [tasksButton, setTasksButton] = useState(false);
  const getTasks = async () => {
    const res = await axios({
      method: "get",
      url: "http://localhost:3000/tasks",
    });
    return setTasks(res.data);
  };

  const deleteTask = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:3000/tasks/${id}`,
    });
    return getTasks();
  };

  const deleteProject = (category) => {
    const deleteArr = tasks.filter((task) => task.category === category);
    console.log(tasks);
    const deleteId = deleteArr.map(({ id }) => id);
    console.log(deleteId);

    deleteId.forEach((id) =>
      axios({
        method: "delete",
        url: `http://localhost:3000/tasks/${id}`,
      })
    );
    return getTasks();
  };

  const projectButtonOn = () => {
    if (!projectButton) {
      setProjectButton(true);
      setTasksButton(false);
    }
  };
  const categorys = tasks.map((task) => task.category);
  const betterCategory = [...new Set(categorys)];

  const taskButtonOn = () => {
    if (!tasksButton) {
      setTasksButton(true);
      setProjectButton(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <Navi bg="light" variant="light" fixed="top">
        <Container>
          <Navi.Brand>Overview</Navi.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <button onClick={projectButtonOn}>Projects</button>
            </Nav.Link>
            <Nav.Link>
              <button onClick={taskButtonOn}>Tasks</button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navi>
      <div style={{ marginTop: "70px", marginBottom: "50px" }}>
        {projectButton ? (
          <div>
            {betterCategory.map((category) => (
              <div key={category}>
                <p>
                  {category}
                  <button onClick={() => deleteProject(category)}>X</button>
                </p>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
        {tasksButton ? (
          <div>
            {tasks.map((task) => (
              <div key={task.id}>
                <p>
                  {task.title}
                  <button onClick={() => deleteTask(task.id)}>X</button>
                </p>
                <p>{task.time}</p>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Navbar />
    </div>
  );
}

export default Overview;

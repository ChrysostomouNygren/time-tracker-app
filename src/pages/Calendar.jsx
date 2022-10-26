import { useEffect, useState } from "react";
import Navigationbar from "../components/Navbar";
import axios from "axios";
import { useTimeContext } from "../contexts/TimeContext";
import { Dropdown, Nav, Navbar as Navi, Container } from "react-bootstrap";

// använd samma funktion som i history => categorys, fast för datum.
// ta bort en tidtagning

function Calendar() {
  const { tasks, setTasks } = useTimeContext();
  const [date, setDate] = useState("");
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

  const dateCategory = tasks.map((task) => task.dateCategory);
  const betterDateCategory = [...new Set(dateCategory)];
  const found = tasks.filter((task) => task.dateCategory === date);

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <Navi bg="light" variant="light" fixed="top">
        <Container>
          <Navi.Brand>Calendar</Navi.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Timed dates
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {betterDateCategory.map((date) => (
                    <Dropdown.Item
                      key={date}
                      onClick={() => [setDate(date), console.log(date)]}
                    >
                      {date}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
          </Nav>
        </Container>
      </Navi>
      <div style={{ marginTop: "70px", marginBottom: "50px" }}>
        <h4>{date}</h4>
        {found.map((task) => (
          <div key={task.id}>
            <p style={{ margin: "0" }}>{task.title}:</p>
            <p>
              {task.time}
              <button
                style={{ padding: "0", marginLeft: "6px" }}
                onClick={() => deleteTask(task.id)}
              >
                X
              </button>
            </p>
          </div>
        ))}
      </div>
      <Navigationbar />
    </div>
  );
}

export default Calendar;

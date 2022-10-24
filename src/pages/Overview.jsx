import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useTimeContext } from "../contexts/TimeContext";
import { Dropdown } from "react-bootstrap";

// använd samma funktion som i history => categorys, fast för datum.
// ta bort en tidtagning

function Overview() {
  const { tasks, setTasks } = useTimeContext();
  const [date, setDate] = useState("");
  const getTasks = async () => {
    const res = await axios({
      method: "get",
      url: "http://localhost:3000/tasks",
    });
    return setTasks(res.data);
  };

  const dateCategory = tasks.map((task) => task.dateCategory);
  const betterDateCategory = [...new Set(dateCategory)];
  const found = tasks.filter((task) => task.dateCategory === date);

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <h2>{date}</h2>
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
      {found.map((task) => (
        <div key={task.id}>
          <p>{task.title}</p>
        </div>
      ))}

      <p>här ska jag väl försöka ha en kalender?</p>
      <Navbar />
    </div>
  );
}

export default Overview;

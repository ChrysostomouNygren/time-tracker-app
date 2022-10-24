import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
// import { getTasks } from "../api";
import axios from "axios";
import { useTimeContext } from "../contexts/TimeContext";

function History() {
  const {tasks, setTasks} = useTimeContext();
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
      <h3>History</h3>
      <button onClick={projectButtonOn}>Projects</button>
      <button onClick={taskButtonOn}>Tasks</button>
      <div>
        {projectButton ? (
          <div>
            {betterCategory.map((category) => (
              <div key={category}>
                <p>{category}</p>
                <button onClick={() => deleteProject(category)}>X</button>
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
                  {task.title}: {task.time}
                </p>
                <button onClick={() => deleteTask(task.id)}>X</button>
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

export default History;

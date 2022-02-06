import "../App.css";
import { useState, useEffect } from "react";

const axios = require("axios");
export const Todo = () => {
  const [Todo, setTodo] = useState([]);
  const [Text, setText] = useState("");
  const [Title, setTitle] = useState("");
  const [Page, setPage] = useState(1);
  useEffect(() => {
    getData();
    axios
      .get(
        `https://fake-api-project-for-masai.herokuapp.com/tasks?_page=${Page}&_limit=5`
      )
      .then((res) => {
        let total = res.headers["x-total-count"];
        // console.log('total:', total)
        let totalPage = Math.ceil(total / 5);
        // console.log('totalPage:', totalPage)

        document.querySelector(".next").disabled = false;
        if (Page === totalPage) {
          document.querySelector(".next").disabled = true;
        }
        document.querySelector(".prev").disabled = false;
    if (Page === 1) {
      document.querySelector(".prev").disabled = true;
    }
      });
    
  }, [Page]);

  const getData = async () => {
    return axios
      .get(
        `https://fake-api-project-for-masai.herokuapp.com/tasks?_page=${Page}&_limit=5`
      )
      .then((res) => {
        setTodo(res.data);
      });
  };
  const deleteTodod = (idx) => {
    axios
      .delete(`https://fake-api-project-for-masai.herokuapp.com/tasks/${idx}`)
      .then((res) => {
        getData();
      });
  };
  // useEffect(() => {deleteTodod()}, []);
  return (
    <div id="todo_div">
      <h1 className="title">Todo...</h1>
      <div id="input">
        <input
          type="text"
          placeholder="Add title"
          className="inputTitle"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Add Task..."
          className="inputBody"
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button
          className="addBtn"
          onClick={() => {
            axios
              .post("https://fake-api-project-for-masai.herokuapp.com/tasks", {
                title: Title,
                task: Text,
              })
              .then(getData);
          }}
        >
          Add
        </button>
      </div>
      <div id="list">
        {Todo.map((e) => {
          return (
            <li className="container" key={e.id}>
              {e.title} {e.task}
              <span>
                <button
                  className="delBtn"
                  onClick={() => {
                    deleteTodod(e.id);
                  }}
                >
                  DELETE
                </button>
              </span>
            </li>
          );
        })}
      </div>
      <div id="pageBtn">
        <button
          className="prev"
          onClick={() => {
            setPage(Page - 1);
          }}
        >
          Prev
        </button>
        <button
          className="next"
          onClick={() => {
            console.log("hii");
            setPage(Page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

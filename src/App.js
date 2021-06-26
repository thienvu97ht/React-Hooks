import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import BetterClock from "./components/BetterClock";
import Clock from "./components/Clock";
import Pagination from "./components/Pagination";
import PostFiltersForm from "./components/PostFiltersForm";
import MagicBox from "./components/MagicBox";
// import TodoList from "./components/TodoList/index";
// import TodoForm from "./components/TodoForm/index";
import PostList from "./components/PostList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: uuidv4(), title: "I love Easy Frontend! 😍 " },
    { id: uuidv4(), title: "We love Easy Frontend! 🥰 " },
    { id: uuidv4(), title: "They love Easy Frontend! 🚀 " },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: "",
  });

  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    async function fetchPostList() {
      // ...
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;

        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.error("Failed to dfetch post list: ", error);
      }
    }
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log(newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: uuidv4(),
      ...formValues,
    };

    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFiltersChange(newFilters) {
    console.log(newFilters);

    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  return (
    <div className="app">
      <h1>React hooks - MagicBox</h1>
      <MagicBox />

      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      {/* 
      {showClock && <Clock />}
      <BetterClock />
      <button onClick={() => setShowClock(!showClock)}>Hide Clock</button>

      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
    </div>
  );
}

export default App;

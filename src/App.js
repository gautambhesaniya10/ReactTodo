import React, { useState, useEffect } from 'react';
import List from './components/List';
import Alert from './components/Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
}

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  // const [check, setCheck] = useState(false);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please Enter Value");
    }
    else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "Value Changed");
    }
    else {
      showAlert(true, "success", "Item Added To a List");
      const newItem = { id: Math.random(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  }
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item is Removed !");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(editItem.title);
  };
  const clearList = () => {
    showAlert(true, "danger", "Empty List !!");
    setList([]);
  };

  // const checkItem = (id) => {
  //   // const check11 = list.map((item) => item.id === id);
  //   // setCheck(check11);
  //   // console.log("checkItem", check11);

  // }

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Todo List</h3>
        <div className="mb-3 form">
          <input type="text" className="form-control" placeholder="Enter a Text" onChange={(e) => setName(e.target.value)} value={name} />
          <button type="submit" className="btn btn-success">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <List items={list} removeItem={removeItem} editItem={editItem}  />
          <div className="text-center">
            <button className="btn btn-warning" onClick={clearList}>Clear Item</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateForm = props => {
  const initialItem = {
    id: props.match.params.id,
    title: "",
    director: "",
    metascore: ""
  };

  console.log("props", props);
  const [item, setItem] = useState(initialItem);
  const [stars, setStars] = useState([]);
  console.log("item", item);

  const changeHandler = e => {
    e.preventDefault();
    let value = e.target.value;

    setItem({
      ...item,
      [e.target.name]: value
    });
  };

  const changeHandlerStars = e => {
    e.preventDefault();

    setStars({
      ...stars,
      [e.target.name]: [e.target.value]
      // stars is an array so it needs its own changeHandler
    });
  };

  const movieInfo = {
    ...item,
    ...stars
    // stars is an array so you need to add this
  };
  console.log("movie info", movieInfo);
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${item.id}`, movieInfo)
      // .then(res => {
      //you dont need this in a put request
      //   console.log("put response", res);
      //   setItem(initialItem);
      //   // props.updateItems(res.data);
      //   props.history.push("/");
      // })
      .catch(err => console.log(err));
    props.history.push("/");
    window.location.href = window.location.href;
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="array"
          name="stars"
          onChange={changeHandlerStars}
          placeholder="Stars"
        />
        <div className="baseline" />

        <button className="md-button form-button">Update </button>
      </form>
    </div>
  );
};

export default UpdateForm;

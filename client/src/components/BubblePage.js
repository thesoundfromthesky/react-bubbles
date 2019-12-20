import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "./axiosWithAuth";

// ### Stage 2 - Consuming the API

// - [ ] When `BubblePages` renders, make a GET request to fetch the color data for your bubbles.
// - [ ] In `ColorList.js`, complete the `saveEdit` and `deleteColor` functions to make AJAX requests to the API to edit/delete data
// - [ ] Watch and enjoy as your app responds to updates in the data. Check out `Bubbles.js` to see how this is built.
const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth.get("/api/colors").then(({ data }) => {
      setColorList(data);
    });
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

import React, { useState } from "react";
import axiosWidthAuth from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};
// - [ ] In `ColorList.js`, complete the `saveEdit` and `deleteColor` functions to make AJAX requests to the API to edit/delete data
const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWidthAuth
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(({ data }) => {
        updateColors(prev => prev.map(c => (c.id === data.id ? data : c)));
      })
      .catch(console.error);
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWidthAuth
      .delete(`/api/colors/${color.id}`)
      .then(({ data }) => {
        updateColors(prev => prev.filter(c => c.id !== data));
      })
      .catch(console.error);
  };

  const addColor = e => {
    e.preventDefault();
    console.log(colorToEdit);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWidthAuth
      .post(`/api/colors`, colorToEdit)
      .then(({ data }) => {
        updateColors(prev => data);
        resetColor();
      })
      .catch(console.error);
  };

  const resetColor = () => {
    setColorToEdit(initialColor);
  };
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                resetColor();
              }}
            >
              cancel
            </button>
          </div>
        </form>
      )}
      <div className="spacer">
        {/* stretch - build another form here to add a color */}
        {!editing && (
          <form onSubmit={addColor}>
            <legend>add color</legend>
            <label>
              color name:
              <input
                onChange={e =>
                  setColorToEdit({ ...colorToEdit, color: e.target.value })
                }
                value={colorToEdit.color}
              />
            </label>
            <label>
              hex code:
              <input
                onChange={e =>
                  setColorToEdit({
                    ...colorToEdit,
                    code: { hex: e.target.value }
                  })
                }
                value={colorToEdit.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">save</button>
              <button type="button" onClick={resetColor}>
                cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ColorList;

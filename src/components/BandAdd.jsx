import React, { useState } from "react";

export const BandAdd = ({ createBand }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length > 0) {
      createBand(value);
      setValue("");
    }
  };
  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </>
  );
};

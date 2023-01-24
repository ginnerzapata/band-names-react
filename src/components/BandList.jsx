import React from "react";
import { useState, useEffect } from "react";

export const BandList = ({ data, vote, deleteBand, updateBandName }) => {
  const [bands, setBands] = useState(data);
  console.log(data);

  useEffect(() => {
    setBands(data);
  }, [data]);
  const handleName = (e, id) => {
    const updatedBands = bands.map((b) => {
      if (b.id === id) b.name = e.target.value;
      return b;
    });
    setBands(updatedBands);
  };

  const handleBlur = (id, name) => {
    console.log({ name, id });
    updateBandName(id, name);
  };
  const createRows = () => {
    return bands.map((b) => (
      <tr key={b.id}>
        <td>
          <button className="btn btn-primary" onClick={() => vote(b.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form form-control"
            value={b.name}
            onChange={(e) => handleName(e, b.id)}
            onBlur={(e) => handleBlur(b.id, b.name)}
          />
        </td>
        <td>
          <h3>{b.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteBand(b.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};

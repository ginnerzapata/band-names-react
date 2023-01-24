import React from "react";
import { useState, useEffect } from "react";

export const BandList = ({ data }) => {
  const [bands, setBands] = useState(data);
  console.log(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const createRows = () => {
    return bands.map((b) => (
      <tr key={b.id}>
        <td>
          <button className="btn btn-primary">+1</button>
        </td>
        <td>
          <input type="text" className="form form-control" value={b.name} />
        </td>
        <td>
          <h3>{b.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger">Borrar</button>
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

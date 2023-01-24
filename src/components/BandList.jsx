import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  const handleName = (e, id) => {
    const updatedBands = bands.map((b) => {
      if (b.id === id) b.name = e.target.value;
      return b;
    });
    setBands(updatedBands);
  };

  const handleBlur = (id, name) => {
    updateBandName(id, name);
  };
  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
    return () => socket.off("current-bands");
  }, [socket]);

  const vote = (id) => {
    socket.emit("vote-band", id);
  };

  const deleteBand = (id) => {
    socket.emit("delete-band", id);
  };

  const updateBandName = (id, name) => {
    socket.emit("update-name", { name, id });
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

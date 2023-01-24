import { useMemo, useState, useEffect } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  const socket = useMemo(
    () =>
      io.connect(serverPath, {
        transports: ["websocket"],
      }),
    [serverPath]
  );
  useEffect(() => {
    console.log({ socket });
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);
  const [online, setOnline] = useState(false);
  return { socket, online };
};

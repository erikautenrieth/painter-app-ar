import { useEffect, useState } from "react";

const Metaverse = () => {
  const [socketClient, setSocketClient] = useState(null);
  const [clients, setClients] = useState({});

  useEffect(() => {
    // On mount initialize the socket connection
    setSocketClient(io());

    // Dispose gracefuly
    return () => {
      if (socketClient) socketClient.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketClient) {
      socketClient.on("move", (clients) => {
        setClients(clients);
      });
    }
  }, [socketClient]);
  return <></>;
};

export default Metaverse;

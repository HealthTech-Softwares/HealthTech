import styles from "../../general/inicio_sesion/inicio.module.css";
import logoMental from "../../../assets/logo_mentalsync.png";
import { useState, useRef, useEffect } from "react";

export function FuncionChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const socketRef = useRef(null);

  // Conectar Websocket
  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:3001");
    socketRef.current = ws;

    ws.onmessage = async (event) => {
      const receivedMessage = await event.data.text();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: receivedMessage, isReceived: true}
      ]);
    };

    return () => {
      ws.close();
    };
  }, []);

  
  const sendMessage = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      socketRef.current?.send(inputValue);
      setMessages([...messages, { text: inputValue, isReceived: false }]);
      setInputValue("");
    }
  };

  const pressEnter = (event) => {
    if (event.key === "Enter") {
      sendMessage(event);      
    }
  }

  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`container-fluid ${styles.containerFluid}`}>
      <div className="row align-items-center justify-content-center vh-100">
        <div
          className="col-6 text-center rounded shadow h-75"
          style={{ padding: "0" }}
        >
          <div
            className="d-flex align-items-center"
            style={{
              height: "10%",
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
              backgroundColor: "rgb(228, 228, 227)",
            }}
          >
            <div className="col-12 d-flex align-items-center px-3">
              <img
                src={logoMental}
                alt="Especialista"
                className="rounded-circle"
                style={{ height: "40px", objectFit: "cover" }}
              />
              <p className="mb-0 ms-2">Nombre del especialista</p>
            </div>
          </div>

          <div
            className="bg-light d-flex flex-column shadow"
            style={{
              height: "80%",
              overflowY: "auto",
              width: "100%"
            }}
          > 
            {messages.map((message, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-start"
                style={{
                  height: "10%",
                  boxShadow: "0 1px 1px rgba(0, 0, 1, 0.5)",
                  padding: "10px",
                  backgroundColor: message.isReceived ? "rgb(228, 228, 227)" : "white",
                }}
              >
                <p className="m-0">{message.text}</p>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <div
            className="shadow d-flex align-items-center"
            style={{
              height: "10%",
              borderBottomLeftRadius: "0.5rem",
              borderBottomRightRadius: "0.5rem",
              backgroundColor: "rgb(228, 228, 227)",
            }}
          >
            <div className="col d-flex align-items-center px-3">
              <input
                type="text"
                placeholder="Escribe un mensaje"
                className="form-control me-3"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={pressEnter}
              />
              <button className="btn btn-primary" onClick={sendMessage}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

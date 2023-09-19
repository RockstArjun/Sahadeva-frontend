import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs/index";
import "./global.css";

function Chatbot({ axiosClient }) {
  const [text, setText] = useState("");

  const [msg, setMsg] = useState([
    {
      role: "assistant",
      content: "Hey! How can i help you?",
    },
  ]);

  const msgUpdate = async (event) => {
    event.preventDefault();
    const newMessages = [
      ...msg,
      {
        role: "user",
        content: text,
      },
    ];
    setMsg(newMessages);
    setText("");
    await axiosClient.current
      .post("/", newMessages, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        setMsg(res.data.messages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="main-chat">
      {/* <div className='col-span-3 bg-[#272727] rounded-2xl'></div> */}
      <div
        className="col-span-12 bg-[#101010] rounded-2xl"
        style={{ height: "100%" }}
      >
        <div
          className="p-5 grid grid-rows-6 gap-5 rounded-2xl bg-[#2f2f2f] col-span-12"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="res" style={{ flexGrow: "1" }}>
            {msg.map((msg) => {
              if (msg.role === "assistant")
                return (
                  <div key={msg.content} className="msgAss">
                    <h4>Assistant:</h4>
                    <h3 className="m-3">{msg.content}</h3>
                  </div>
                );
              else {
                return (
                  <div key={msg.content} className="msgUser">
                    <h4>User:</h4>
                    <h3 className="m-3">{msg.content}</h3>
                  </div>
                );
              }
            })}
          </div>

          <div className="query-input">
            {/* <div
              className=" "
              style={{
                position: "fixed",
                left: "0",
                bottom: "0",
                width: "100%",
              }}
            > */}
            <input
              type="text"
              className="bg-[#0000] focus:outline-0 text-[#DfD7Df] w-3/4"
              placeholder="Ask your queries... "
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <BsFillSendFill className="icon" onClick={msgUpdate} />
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}

export default Chatbot;

import React, { useState, useEffect } from "react";
// import Chat from "./chat";
import ChatBotPNG from "./chatbot.png";
import { BsFillSendFill } from "react-icons/bs/index";
import "./global.css";
import axios from "axios";

function Chatbot() {
  const [start, setStart] = useState(true);
  const [text, setText] = useState("");

  const [msg, setMsg] = useState([
    {
      role: "assistant",
      content: "Hey! How can i help you?",
    },
  ]);

  const msgUpdate = async (event) => {
    event.preventDefault()
    const newMsg = [
      ...msg,
      {
        role: "user",
        content: text,
      },
    ];
    setMsg(newMsg);
    setText("");
    await axios
      .post("https://d075-206-84-225-129.ngrok-free.app/", newMsg, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then(res => {
        setMsg(res.data.messages);
        // setMsg((messages) => [...messages, res.data.messages]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setStart(false);
    }, 2000);
  }, []);
  return (
    <main className="main-chat">
      {/* <div className='col-span-3 bg-[#272727] rounded-2xl'></div> */}
      <div className="col-span-12 bg-[#101010] rounded-2xl">
        <div className="p-5 grid grid-rows-6 gap-5 rounded-2xl bg-[#2f2f2f] ">
          {start ? (
            <div className="w-full row-span-5  p-5 flex flex-col  rounded-2xl justify-center items-center">
              <img
                src={ChatBotPNG}
                alt="png image"
                styles={{ width: "400px", height: "400px" }}
              />
            </div>
          ) : (
            <div className="res">
              {msg.map(msg => {
                if (msg.role === "assistant")
                  return (
                    <div className="msgAss">
                      <h1>Assistant :</h1>
                      <h3 className="m-3">{msg.content}</h3>
                    </div>
                  );
                else {
                  return (
                    <div className="msgUser">
                      <h1>User :</h1>
                      <h3 className="m-3">{msg.content}</h3>
                    </div>
                  );
                }
              })}
            </div>
          )}

          <div className="msg">
            <div className="bg-[#181818] p-5 rounded-2xl flex justify-center items-center gap-5">
              <input
                type="text"
                className="bg-[#0000] focus:outline-0 text-[#DfD7Df] w-3/4"
                placeholder="Lets start designing... "
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <BsFillSendFill className="icon" onClick={msgUpdate} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Chatbot;

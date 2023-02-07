import './App.css';
import './normalized.css';
import { useState } from 'react'

function App() {

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "Como posso ajudar?"
  }]);

  function clearChat(){
    setChatLog([]);
  }

  async function handleSubmit(e){
    e.preventDefault();
    let chatLogNew = [...chatLog,{user: "me", message:`${input}`}]
    setInput("");
    setChatLog(chatLogNew)
    const messages = chatLogNew.map((message)=> message.message).join("")
    const response = await fetch("http://localhost:3080/",{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message:messages
    })
  });
  const data = await response.json();
  setChatLog([...chatLogNew,{user: "gpt", message:`${data.message}`}])
  console.log(data)
  }
  return (
    <div className="App">
      <div className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </div>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index)=>(
            <ChatMessage key={index} message={message}/>
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input value={input} 
              onChange={(e)=> setInput(e.target.value)}
              rows="1" 
              className="chat-input-textarea" 
              placeholder="Digite sua mensagem aqui">
            </input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({message})=>{
  if(message.user === "gpt"){
    return(
      <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
        <div className="chat-message-center">
          <div className={`avatargpt ${message.user === "gpt" && "chatgpt"}`}>AI
          </div>
          <div className="message">
            {message.message}
          </div>
        </div>
      </div>
    )
  }else if(message.user === "me"){
    return(
      <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
        <div className="chat-message-center">
          <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>ME
          </div>
          <div className="message">
            {message.message}
          </div>
        </div>
      </div>
    )
  }

  const el = document.getElementById('chat-log');
  // id of the chat container ---------- ^^^
  if (el) {
    el.scrollTop = el.scrollHeight;
  }
}


export default App;

import * as React from "react";
import NewMessage from "./components/NewMessage";
import MessagesList from "./components/MessageList";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <div id="container">
        <Sidebar users={[]} />
        <div id="main">
          <MessagesList messages={[]} />
          <NewMessage dispatch={() => {}} />
        </div>
      </div>
      <style jsx global>{`
        #container {
          display: grid;
          grid-template-columns: 1fr 5fr;
          grid-template-areas: "sidebar main";
          width: 100%;
          height: 100vh;
        }
        #main {
          grid-area: main;
        }
        #new-message {
          position: fixed;
          background-color: #fff;
          bottom: 0;
          width: 100%;
          padding: 5px;
          margin-left: 0px;
          border-top: 1px solid #3f3f3f;
          height: 20%;
        }
        #new-message > textarea {
          border: none;
          width: 100%;
          height: 100%;
          font-size: 32px;
        }
        #messages-list {
          padding: 5px 0 0 5px;
        }
        #sidebar {
          grid-area: sidebar;
          padding: 5px 0 0 5px;
          border-right: 1px solid #3f3f3f;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default App;

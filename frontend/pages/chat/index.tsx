import NewMessage from "./containers/NewMessage";
import MessagesList from "./containers/MessageList";
import Sidebar from "./containers/Sidebar";
import { NextPageContextStore } from "../../utils/with-redux-store";
import { isServer } from "../../utils/env";
import { sagaMiddleware } from "../../store";
import setupSocket from "./sockets";
import handleNewMessage from "../../sagas";
import ChatModal from "./components/ChatModal";

const Chat = () => (
  <div id="container">
    <Sidebar />
    <div id="main">
      <ChatModal />
      <MessagesList />
      <NewMessage />
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
        padding: 15px 0 0 5px;
        border-right: 1px solid #3f3f3f;
        height: 100%;
      }
      #sidebar > ul {
        padding-left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style: none;
      }
    `}</style>
  </div>
);

export default Chat;

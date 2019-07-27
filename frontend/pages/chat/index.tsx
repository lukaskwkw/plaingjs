import NewMessage from "./containers/NewMessage";
import MessagesList from "./containers/MessageList";
import Sidebar from "./containers/Sidebar";
import { NextPageContextStore } from "../../utils/with-redux-store";
import ChatModal from "./components/ChatModal";

export type ChatComponentProps = {
  firstLaunch: boolean;
};
interface ChatComponent {
  (props: ChatComponentProps);
  getInitialProps: (
    contextWithStore: NextPageContextStore
  ) => ChatComponentProps;
}

const Chat: ChatComponent = ({ firstLaunch }) => (
  <div id="container">
    <Sidebar />
    <div id="main">
      <ChatModal firstLaunch={firstLaunch} />
      <MessagesList />
      <NewMessage />
    </div>
    <style jsx global>{`
      #container {
        display: grid;
        grid-template-columns: 1fr 5fr;
        grid-template-areas: "sidebar main";
        width: 100%;
        height: 90vh;
      }
      #main {
        display: flex;
        flex-direction: column;
        grid-area: main;
      }
      #new-message {
        flex: 1;
        flex-basis: 20px;
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
        flex: 4;
        flex-basis: 200px;
        max-height: 93vh;
        overflow-y: scroll;
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

Chat.getInitialProps = ({ reduxStore }) => {
  const { users } = reduxStore.getState().chat;

  if (users.length === 0) return { firstLaunch: true };

  return { firstLaunch: false };
};

export default Chat;

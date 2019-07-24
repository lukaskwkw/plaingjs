import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { useEffect, useState, ChangeEvent } from "react";
import { NextPageContextStore } from "../../../utils/with-redux-store";
import { isServer } from "../../../utils/env";
import setupSocket from "../sockets";
import { sagaMiddleware, AppStore } from "../../../store";
import handleNewMessage from "../../../sagas/index";

const showModal = (setModal: Function) =>
  new Promise<string>(resolve => {
    setModal({ show: true, resolver: resolve });
  });

type ChatModalProps = {
  dispatch?: AppStore["dispatch"];
  firstLaunch?: boolean;
};

interface ChatModalComponent {
  (props: ChatModalProps);
  getInitialProps: (contextWithStore: NextPageContextStore) => ChatModalProps;
}

const ChatModal: ChatModalComponent = ({ dispatch, firstLaunch }) => {
  const [username, setUsername] = useState("");
  const [modal, setModal] = useState({ show: false, resolver: undefined });
  const [isNameAvailable, setIsNameAvailable] = useState(false);

  useEffect(() => {
    firstLaunch &&
      showModal(setModal).then(resolvedName => {
        return new Promise((resolve, reject) => {
          const socket = setupSocket(dispatch, resolvedName, resolve, reject);
          sagaMiddleware.run(handleNewMessage, {
            socket,
            username: resolvedName
          });
        });
      });
  }, []);

  return (
    <Modal isOpen={modal.show}>
      <ModalHeader>Your username</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Type your username..."
              invalid={isNameAvailable === false}
              value={username}
              onChange={(event: ChangeEvent) =>
                setUsername(event.target["value"])
              }
            />
            <FormFeedback invalid={isNameAvailable === false}>
              This username is not available
            </FormFeedback>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => modal.resolver(username)}>
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ChatModal.getInitialProps = ({ reduxStore }) => {
  if (!isServer()) {
    const { users } = reduxStore.getState().chat;

    if (users.length === 0)
      return { dupa: "kuap", dispatch: reduxStore.dispatch, firstLaunch: true };

    // const username =
    //   "User" +
    //   Math.random()
    //     .toString()
    //     .slice(1, 5);
    // const socket = setupSocket(reduxStore.dispatch, username);
    // sagaMiddleware.run(handleNewMessage, { socket, username });
  }
  return {};
};

export default ChatModal;

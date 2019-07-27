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
  Input,
  UncontrolledAlert
} from "reactstrap";
import { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import setupSocket from "../../../lib_chat/sockets";
import { sagaMiddleware, AppStore } from "../../../store";
import handleNewMessage from "../../../sagas/index";
import { ChatComponentProps } from "..";
import { connect } from "react-redux";

const showModal = (setModal: Function, resolver: Function) =>
  setModal(modal => ({ ...modal, show: true, resolver }));

interface ChatModalComponent {
  (props: ChatComponentProps & { dispatch?: AppStore["dispatch"] });
}

type ChatState = {
  busy: boolean;
  show: boolean;
  isNameAvailable: boolean;
  error: string;
  resolver: Function;
};

const ChatModal: ChatModalComponent = ({ dispatch, firstLaunch }) => {
  const [username, setUsername] = useState("");
  const [modal, setModal] = useState<ChatState>({
    busy: false,
    show: false,
    isNameAvailable: true,
    error: undefined,
    resolver: undefined
  });

  useEffect(() => {
    firstLaunch &&
      showModal(setModal, username => {
        setModal(modal => ({ ...modal, busy: true }));
        new Promise((resolve, reject) => {
          setupSocket(
            dispatch,
            username,
            (socket: WebSocket) => {
              sagaMiddleware.run(handleNewMessage, {
                socket,
                username
              });
              setModal(modal => ({ ...modal, show: false, busy: false }));
              resolve();
            },
            error => {
              setModal(modal => ({
                ...modal,
                busy: false,
                error,
                isNameAvailable: error ? true : false
              }));
              reject();
            }
          );
        });
      });
  }, []);

  return (
    <Modal isOpen={modal.show}>
      <ModalHeader>Your username</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(event: SyntheticEvent) => {
            event.preventDefault();
            modal.resolver(username);
          }}
        >
          <FormGroup>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Type your username..."
              invalid={modal.isNameAvailable === false}
              value={username}
              onChange={(event: ChangeEvent) =>
                setUsername(event.target["value"])
              }
            />
            {modal.isNameAvailable === false && (
              <FormFeedback invalid>
                This username is not available
              </FormFeedback>
            )}
            {modal.error && (
              <UncontrolledAlert color="danger">
                {modal.error}
              </UncontrolledAlert>
            )}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={modal.busy || username.length === 0}
          color="primary"
          onClick={() => modal.resolver(username)}
        >
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default connect(
  () => ({}),
  dispatch => ({ dispatch })
)(ChatModal);

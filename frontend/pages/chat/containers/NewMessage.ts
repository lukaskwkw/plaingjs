import { connect } from "react-redux";
import NewMessageComponent from "../components/NewMessage";
import { addMessage } from "../actions";

const mapDispatchToProps = dispatch => ({
  addMessage: (message, author) => {
    dispatch(addMessage(message, author));
  }
});

const NewMesage = connect(
  () => ({}),
  mapDispatchToProps
)(NewMessageComponent);

export default NewMesage;

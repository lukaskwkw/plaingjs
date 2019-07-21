import { connect } from "react-redux";
import MessageListComponent from "../components/MessageList";

const mapStateToProps = ({ chat: { messages } }) => ({ messages });

export default connect(mapStateToProps)(MessageListComponent);

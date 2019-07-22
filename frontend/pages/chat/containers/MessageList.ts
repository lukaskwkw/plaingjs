import { connect } from "react-redux";
import MessageListComponent from "../components/MessageList";
import { StoreState } from "../../../store";

const mapStateToProps = ({ chat: { messages } }: StoreState) => ({ messages });

export default connect(mapStateToProps)(MessageListComponent);

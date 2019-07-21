import { connect } from "react-redux";
import SidebarComponent from "../components/Sidebar";
import { Store } from "../../../store";

const Sidebar = connect(
  (state: Store) => ({ users: state.chat.users }),
  {}
)(SidebarComponent);

export default Sidebar;

import { connect } from "react-redux";
import SidebarComponent from "../components/Sidebar";
import { StoreState } from "../../../store";

const Sidebar = connect(
  (state: StoreState) => ({ users: state.chat.users }),
  {}
)(SidebarComponent);

export default Sidebar;

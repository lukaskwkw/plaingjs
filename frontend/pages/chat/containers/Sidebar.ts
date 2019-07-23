import { connect } from "react-redux";
import SidebarComponent from "../components/Sidebar";
import { StoreState } from "../../../store";

const mapStateToProps = (state: StoreState) => ({ users: state.chat.users });

const Sidebar = connect(
  mapStateToProps,
  {}
)(SidebarComponent);

export default Sidebar;

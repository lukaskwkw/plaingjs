import * as React from "react";
import { User } from "../model";

const Sidebar = ({ users }: { users: User[] }) => (
  <aside id="sidebar">
    <ul>{users && users.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>
  </aside>
);

export default Sidebar;

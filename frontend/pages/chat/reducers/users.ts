import TypeKeys, { UserActionTypes } from "../ActionTypes";
import { User } from "../model";

const users = (
  state: User[] = [],
  action: UserActionTypes
): User[] => {
  switch (action.type) {
    case TypeKeys.ADD_USER:
      return [...state, { name: action.name, id: action.id }];
    case TypeKeys.USERS_LIST:
      return action.users;
    default:
      return state;
  }
};

export default users;

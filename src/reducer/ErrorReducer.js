//first you import the action
import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function ErrorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return {};
  }
}

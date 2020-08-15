import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let unlikedIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[unlikedIndex] = action.payload;
      return {
        ...state,
      };
    case DELETE_SCREAM:
      let deletedIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      //removes n=1 elements from array[index]
      state.screams.splice(deletedIndex, 1);
      return {
        ...state,
      };
    case POST_SCREAM:
      //payload comes first because we need the new scream to render above the rest of the state
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    default:
      return state;
  }
}

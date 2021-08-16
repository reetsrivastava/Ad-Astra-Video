export const likeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_LIKES":
      return {
        ...state,
        likeList: action.payload
      }

    case "REMOVE_FROM_LIKES":
      return {
        ...state,
        likeList: state.likeList.filter(item => item._id !== action.payload)
      }

    case "RESET":
      return {
        ...state,
        likeList: []
      }

    default:
      return state;
  }
}
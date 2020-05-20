
const reducer = (state, action) => {
    switch(action.type) {
      case 'CHANGE_INTERVAL':
        return {
          ...state,
          currentInterval:state.currentInterval += action.payload
      };
      default:
        return state
    }
  }

  export default reducer;
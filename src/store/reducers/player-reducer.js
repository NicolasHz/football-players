import * as actionTypes from '../actions/actions';

const initialState = {
    footbalPlayers: []
};

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.SET_PLAYERS:
            return {
                ...state,
                footbalPlayers: action.payload
            }
        default:
            return state;
    }
}

export default reducer;
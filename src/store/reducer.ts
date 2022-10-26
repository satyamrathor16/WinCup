import * as types from './actionTypes';
const initialState = {
    MatchData: [],
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.MATCH_DATA:
            return {
                ...state,
                MatchData: action.payload
            }
    }
}

export default reducer;
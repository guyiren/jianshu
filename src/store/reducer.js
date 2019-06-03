import {combineReducers} from "redux-immutable";
// as是es6的别名，可以把reducer起个别名headerReducer
import { reducer as headerReducer} from '../common/header/store';

const Reducer = combineReducers({
    header: headerReducer
    }
);
export default Reducer;


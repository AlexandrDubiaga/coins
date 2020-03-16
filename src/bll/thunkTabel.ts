import {ThunkAction} from "redux-thunk";
import {AppState} from "../redux/store";
import {apiTabel} from "../dal/api";
import {setDataAC} from "../dal/actionCreators";
import {Dispatch} from "redux";


export const getProductsThunk = (): any => {
    return async (dispatch: Dispatch) => {
       let data = await apiTabel.getData();

        dispatch(setDataAC(data.data));
    }
};
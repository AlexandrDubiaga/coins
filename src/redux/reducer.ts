import {SET_DATA} from "../dal/actionCreators";
import {ICoins} from "../dal/api";

interface IInitialState {
    products: Array<ICoins>
}
let initialState = {
    products: []
}

export const reducer = (state: IInitialState = initialState, action: any): IInitialState => {
    switch (action.type) {
        case SET_DATA: {

            return {
                ...state,
                products: action.products
            }
        }
        default: {
            return state
        }
    }
};



import {ICoins} from "./api";
export const SET_DATA = "SET_DATA";

export interface ISetData {
    type: typeof SET_DATA,
    products: Array<ICoins>
}


export const setDataAC = (products: Array<ICoins>): ISetData => ({type: SET_DATA, products});


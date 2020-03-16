import React from 'react';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppState} from "../redux/store";
import {getProductsThunk} from "../bll/thunkTabel";
import Products from "./Products";

const client = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');

interface IMapDispatchToProps {
    getData: () => void
}

interface IMapStateToProps {
    products:any
}


class ProductsContainer extends React.Component<IMapDispatchToProps & IMapStateToProps> {
    componentDidMount(){
        this.props.getData()
    }

    render() {
        return <Products getData={this.props.getData} products={this.props.products}  />
    }
}

let mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        getData() {
            dispatch(getProductsThunk());
        }
    }
}
let mapStateToProps = (state: AppState): IMapStateToProps => {
    return {
       products:state.rootTable.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
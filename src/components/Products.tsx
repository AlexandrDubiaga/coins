import React from "react";
import style from "./Product.module.css";
import {ICoins} from "../dal/api";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

const client = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');

interface IMapStateToProps {
    products: any,
    getData:()=>void
}

interface IState {
    products: Array<ICoins>;
}

class Products extends React.Component<IMapStateToProps & IState> {
    inteval:any=0;
    arr: any = new Set();
    state: IState = {
        products: []
    };
    componentWillUpdate() {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (data:any) => {
            console.log(data.data)
            this.props.getData();
        };
    }

    getData = (e: any) => {
        clearInterval(this.inteval);
        let currentValue = e.currentTarget.value
        const runInterval=(currentValue:any)=>{
            return  this.setState({
                products: this.props.products.filter(
                    (i: any) => i.pm === currentValue
                )
            });
        }

       this.inteval = setInterval(()=>runInterval(currentValue), 1000)
    };

    setDataSelect = (e: any) => {
        clearInterval(this.inteval);
        let currentValue = e.currentTarget.value
        const runInterval=(currentValue:any)=>{
            return   this.setState({
                products: this.props.products.filter(
                    (i: any) =>{
                        if(i.q === currentValue){
                            return true
                        }else if(i.pm === currentValue) {
                            return true
                        }
                    }
                )
            });
        }

        this.inteval = setInterval(()=>runInterval(currentValue), 1000)

    };

    getAllData = () => {
        clearInterval(this.inteval);
        const runInterval=()=>{
            return   this.setState({
                products: this.props.products
            });
        }

        this.inteval = setInterval(()=>runInterval(), 1000)

    }
    setItemsInList=(arr:any)=>{
        let newListData = [];
        for(let item of arr){
            newListData.push(item)
        }
        return newListData.map((i)=>{
            return <option value={i}>{i}</option>
        })
    }
    onChangeSearch=(e:React.ChangeEvent<HTMLInputElement>)=> {
        clearInterval(this.inteval);
        const newValue = e.target.value;
        const runInterval=(newValue:any)=>{
            return  this.setState({products: this.props.products.filter((i: any) => i.b===newValue)})
        }

        this.inteval = setInterval(()=>runInterval(newValue), 1000)

    }
    priceOperations=(startPrice:any,lastPrice:any)=>{
        let proc = (startPrice * 100) / lastPrice;
        let differentStartPriceLastPrice = startPrice - lastPrice;
        let result = (differentStartPriceLastPrice * 100) / startPrice;
        let resutProcent = Math.floor(result * 100) / 100;
        if(resutProcent>0){
            return '+'+resutProcent.toString()+'%';
        }else{
            return resutProcent.toString()+'%';
        }
    }


    render() {
        let data =
            this.state.products.length === 0
                ? this.props.products
                : this.state.products;
        return (
            <div className={style.wrapper}>
                <div className={style.buttonsBlock}>
                    <div>
                        <FontAwesomeIcon icon={faStar}/>
                    </div>
                    <button onClick={this.getAllData}>
                        Margin
                    </button>
                    <button value={"BNB"} onClick={this.getData}>
                        BNB
                    </button>
                    <button value={"BTC"} onClick={this.getData}>
                        BTC
                    </button>
                    <select id="select" onChange={this.setDataSelect}>
                        <option value={'ALTS'}>ALTS</option>
                        <option value="XRP">XRP</option>
                        <option value="ETH">ETH</option>
                        <option value="TRX">TRX</option>
                    </select>
                    <select id="select" onChange={this.setDataSelect}>
                        <option>USDⓈ</option>
                        {
                            this.props.products.filter((i: any) => i.pm === 'USDⓈ').map((item: any) => {
                                this.arr.add(item.q);
                            })
                        }
                        {this.setItemsInList(this.arr)}
                    </select>
                </div>
                <div className={style.search}>
                 <input type={'text'} placeholder={'Search'} onChange={this.onChangeSearch}/>

                </div>

                <div className={style.header}>
                    <div>Pair</div>
                    <div>Last Price</div>
                    <div>Change</div>
                </div>
                <div className={style.contentData}>
                    {data.map((item: any) => {
                        return (
                            <div className={style.outerData}>
                                <div>
                                    {item.b}/{item.pn}
                                </div>
                                <div>{item.c}</div>
                                <div>{this.priceOperations(item.o,item.c)} </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Products;

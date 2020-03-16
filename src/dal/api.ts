import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://api.codetabs.com/v1/proxy?quest=https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products',
  
});
export interface ICoins {
    s: string,
    st: string,
    b: string,
    q: string,
    ba: string,
    qa: string,
    i: number,
    ts: number,
    an: string,
    qn: string,
    o: number,
    h: number,
    l: number,
    c: number,
    v: number,
    qv: number,
    y: number,
    as: number,
    pm: string,
    pn: string,
    cs: number
}


export const apiTabel = {
    async getData() {
        return await instance.get(``).then((res) => res.data);
    }
};

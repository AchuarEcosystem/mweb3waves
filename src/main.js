import ReactDOM from 'react-dom';
import React from 'react';
import { invokeScript, broadcast, nodeInteraction, waitForTx, data } from '@waves/waves-transactions'
import { stringToUint8Array, sha256, base58encode } from '@waves/waves-crypto';
import './components/app';

/*
export default class Posts extends Component {
    async componentDidMount() {
        const res = await fetch('https://nodes-testnet.wavesnodes.com/addresses/data/3N8RGScPyKYySaXd5Z3VcpnttH2uBeMpSy4')
        console.log(res)
    }
        render() {
            return (
                <div>
                    <h4>Posts</h4>
                </div>
            )
        }
    } 
*/   

/* cierro 30-03
window.wc = {
    "stringToUint8Array": stringToUint8Array,
    "sha256": sha256,
    "base58encode": base58encode
};
window.wt = {
    "nodeInteraction": nodeInteraction,
    "invokeScript": invokeScript,
    "broadcast": broadcast,
    "waitForTx": waitForTx
};
*/


/*
let key = 'Offered_Qty, balance:';
let dappaddress = '3N8RGScPyKYySaXd5Z3VcpnttH2uBeMpSy4';  // seller-01
//let dappaddress = '3N9GKCsktAL7oPFmaKsgPBoDfu3ijk23Vmm'; // seller-02
let baseUri = 'https://testnodes.wavesnodes.com';
//nodeInteraction.accountData(dappaddress, baseUri).then((v) => {
nodeInteraction.accountDataByKey(key, dappaddress, baseUri).then((v) => {
    window.dAppData = v;
    if (v) {
        window.dAppDataKeys = Object.keys(v);
        console.log("dApp Account data son:");
        console.log(v);
        console.log(JSON.stringify(v));
        //let jsonArray = JSON.stringify(v);
        //let datos = ShowData(jsonArray, 'myData');
        //document.getElementById('myData').appendChild(datos);
    }
});
*/





/*
//prueba el 22-03-2020
function ShowData(jsonArray, idTable) {
    var array = JSON.parse(jsonArray);
    var table = document.getElementById(idTable);

    for (var i=0; i<array.lenght; i++){
        var row = table.insertRow(i+1);
        var x=0;
        for(var index in array[i]) {
            var cell = row.insertCell(x);
            cell.innerHTML = array[i][index];
            x++;
        }
    }
    return table;
}
*/

/*
//desconecto 23-03-2020 con esto cargo todos los JSONs:
let dappaddress = '3N8RGScPyKYySaXd5Z3VcpnttH2uBeMpSy4';  // seller-01
//let dappaddress = '3N9GKCsktAL7oPFmaKsgPBoDfu3ijk23Vmm'; // seller-02
let baseUri = 'https://testnodes.wavesnodes.com';
nodeInteraction.accountData(dappaddress, baseUri).then((v) => {
    window.dAppData = v;
    if (v) {
        window.dAppDataKeys = Object.keys(v);
        console.log("dApp Account data son:");
        console.log(v);
        console.log(JSON.stringify(v));
    }
});
//
*/



/*
async _accountDataPattern(matches) {
    return await axios.get(`address/data/${this.dal.dApp}?matches=${matches}`, {
        baseURL: this.nodeUrl,
        validaStatus
    })
    .then(process400)
    .then(x => x.data);
}
*/
/*
//el 21-03-2020, construyo lo siguiente:
document.getElementById('formPurchase').addEventListener('submit', savePurchase);
function savePurchase(e) {
    let item = document.getElementById('item').value;
    let userName = document.getElementById('userName').value;
    let userCountry = document.getElementById('userCountry').value;
    let userDiscount = document.getElementById('userDiscount').value;
    let orderQty = document.getElementById('orderQty').value;
    console.log(userDiscount)
    let purchase = {
        item, userName, userCountry, userDiscount, orderQty
    };
if(localStorage.getItem('purchases') === null) {
    let purchases = [];
    purchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(purchases));
}else{
    let purchases = JSON.parse(localStorage.getItem('purchases'));
    purchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(purchases));
}
getPurchases();
document.getElementById('formPurchase').reset();
e.preventDefault();
}
function deletePurchase(item) {
    console.log(item)
    let purchases = JSON.parse(localStorage.getItem('purchases'));
    for(let i=0; i<purchases.length; i++){
        if(purchases[i].item == item) {
            purchases.splice(i,1);
        }
    }
    localStorage.setItem('purchases', JSON.stringify(purchases));
    getPurchases();
}
function getPurchases() {
    let purchases = JSON.parse(localStorage.getItem('purchases'));
    let purchasesView = document.getElementById('purchases');
    purchasesView.innerHTML = '';
    for(let i=0; i<purchases.length; i++){
        let item = purchases[i].item;
        let userName = purchases[i].userName;
        let userCountry = purchases[i].userCountry;
        let userDiscount = purchases[i].userDiscount;
        let orderQty = purchases[i].orderQty;
        purchasesView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
            <p>${item}-${userName}-${userCountry}-${userDiscount}-${orderQty}
            <a href="#" onclick="deletePurchase('${item}')" class="btn btn-danger ml-5">Delete</a>
            </p>
            </div>
        </div>`;
    }
}
getPurchases();
*/

console.log(ReactDOM);
console.log(React);
console.log(invokeScript);
console.log(broadcast);
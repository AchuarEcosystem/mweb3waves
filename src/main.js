import ReactDOM from 'react-dom';
import React from 'react';
import { invokeScript, broadcast, nodeInteraction, waitForTx, data } from '@waves/waves-transactions'
import { stringToUint8Array, sha256, base58encode } from '@waves/waves-crypto';
import './components/app';

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

//let key = 'Offered_Qty, balance:';
let dappaddress = '3N8RGScPyKYySaXd5Z3VcpnttH2uBeMpSy4';  // seller-01
//let dappaddress = '3N9GKCsktAL7oPFmaKsgPBoDfu3ijk23Vmm'; // seller-02
let baseUri = 'https://testnodes.wavesnodes.com';
nodeInteraction.accountData(dappaddress, baseUri).then((v) => {
//nodeInteraction.accountDataByKey(key, dappaddress, baseUri).then((v) => {
    window.dAppData = v;
    if (v) {
        window.dAppDataKeys = Object.keys(v);
        console.log("dApp Account datos son:");
        console.log(v);
        console.log(JSON.stringify(v));
    }
});

//console.log(ReactDOM);
//console.log(React);
console.log(invokeScript);
console.log(broadcast);



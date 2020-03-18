import ReactDOM from "react-dom";
import React from 'react';
import { invokeScript, broadcast } from '@waves/waves-transactions'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchase: {
                item: '',
                projectName: '',
                userData: '',
                userDiscount: '',
                orderQty: '',
                amount: '',
                txid: ''
              }
        };
        this.authFunc = this.authFunc.bind(this);
        this.baseUri = "https://testnodes.wavesnodes.com";
        this.nomPrice = 1;  //corregir a 10 waves
        this.wavelet = 100000000;
        this.dApp = '3N8RGScPyKYySaXd5Z3VcpnttH2uBeMpSy4';
        //this.explorerUrl = "https://wavesexplorer.com/testnet";
        this.explorerUrl = "https://testnet.wavesexplorer.com";
        this.purchase = this.purchase.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(scope, key, value){
        const newState = this.state[scope];
        newState[key] = value;
        this.setState(
            {
                [scope]:newState
            }
        );
    }

    authFunc(){
        const authData = {data: "Auth on my site"};
        if(window.WavesKeeper){
            window.WavesKeeper.auth(authData)
            .then(auth =>{
                console.log(auth); 
            })
            .cath(error => {
                console.error(error);
            })
        } else {
            alert("Please, utilize WavesKeeper")
        };
    };
    
    purchase() {
        if(window.confirm("Do you want investment in GreenProjects?")) {
            const params = {
                    type: 16,
                data: {
                    fee: {
                        "tokens": "0.05",
                        "assetId": "WAVES"
                    },
                    dApp: '3N8RGScPyKYySaXd5Z3VcpnttH2uBeMpSy4',
                    call: {
                            function: 'purchase',
                            args: [
                                {type:"string", value:this.state.purchase.item},
                                {type:"string", value:this.state.purchase.projectName},
                                {type:"string", value:this.state.purchase.userData},
                                {type:"integer", value:this.state.purchase.userDiscount},
                                {type:"integer", value:this.state.purchase.orderQty},
                                //{type:"integer", value:((100-this.state.purchase.userDiscount)*(this.nomPrice)*(this.wavelet))}
                            ]
                        }, payment: [{assetId: "WAVES", amount:((100-this.state.purchase.userDiscount)*(this.state.purchase.orderQty)*(this.nomPrice)*this.wavelet)/100}]
                }
            };

                window.WavesKeeper.signAndPublishTransaction(params)
                .then(data => {
                    console.log("Ура! Я выполнил скрипт!!!");
            }).catch((error) => {
                    console.error("Что-то пошло не так", error);
            });     
        };
    };
       
    render() {
        return(
            <div className="container">
                <div className="card text-left mb-4">
                    <div className="card-header">
                        <h5>Purchase Order</h5>
                    </div>
                    <div className="purchase form-group">                   
                        <div className="card-body">
                            <input className="form-control" type="text" placeholder="Project Name" onChange={(e) => this.updateValue("purchase", "projectName", e.target.value)}/>
                            <br></br>
                            <input className="form-control" type="text" placeholder="User Data" onChange={(e) => this.updateValue("purchase", "userData", e.target.value)}/>
                            <br></br>
                            <input className="form-control" type="number" step="0.5" min="0" max="12" placeholder="Discount" onChange={(e) => this.updateValue("purchase", "userDiscount", e.target.value)}/>
                            <br></br>
                            <input className="form-control" type="number" step="1" min="1" max="1000" placeholder="Order Qty" onChange={(e) => this.updateValue("purchase", "orderQty", e.target.value)}/>
                            <br></br>
                            <a className="form-text text-muted" target="_blank" href={this.state.purchase.txid}>Precio de 1 Token con descuento: {((100-this.state.purchase.userDiscount)*(this.nomPrice))/100} waves</a>
                            <br></br>    
                            <a className="form-text text-muted" target="_blank" href={this.explorerUrl + "/tx/" + this.state.purchase.txid}>Transaction / Suma a Invertir: {((100-this.state.purchase.userDiscount)*(this.state.purchase.orderQty)*(this.nomPrice))/100} waves</a>
                            <br></br>
                            <input className="btn btn-primary" type="submit" value="Buy aBitCO2 tokens" onClick={this.purchase}/>
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
};


const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}






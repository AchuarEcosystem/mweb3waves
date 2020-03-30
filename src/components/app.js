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
                txid: ''
              }
        };
        this.authFunc = this.authFunc.bind(this);
        this.baseUri = "https://testnodes.wavesnodes.com";
        this.nomPrice = 1;  //corregir a 10 waves
        this.wavelet = 100000000;
        this.dApp = '3N8RGScPyKYySaXd5Z3VcpnttH2uBeMpSy4';
        this.explorerUrl = "https://wavesexplorer.com/testnet";
        //this.explorerUrl = "https://testnet.wavesexplorer.com";
        this.purchase = this.purchase.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    /*
    componentWillMount() {
        fetch(`/api/bloggers`)
          .then(res => res.json())
          .then(body => {
            this.setState({ bloggersList: body.items });
          });
    
        fetch(`/api/votes`)
          .then(res => res.json())
          .then(body => {
            const votes = body.reduce(function(acc, item) {
              if (acc[item.value]) {
                acc[item.value] += 1;
              } else {
                acc[item.value] = 1;
              }
    
              return acc;
            }, {});
            this.setState({ votes });
          });
      }
    */


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
                                {type:"integer", value:this.state.purchase.orderQty}
                            ]
                        }, payment: [{assetId: "WAVES", amount:(((100-this.state.purchase.userDiscount)*(this.state.purchase.orderQty)*(this.nomPrice)*(this.wavelet))/100)}]
                }
            };

                window.WavesKeeper.signAndPublishTransaction(params)
                .then(data => {
                    console.log("Ура! Я выполнил скрипт!!!");
                    alert('Muchas Gracias, su Transaccion de ' + this.state.purchase.orderQty + ' tokens ha sido confirmada!');
                    //res.render('Su compra ha sido confirmada, Gracias!');
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
                            <h4 class="card-subtitle mb-2 text-muted">Warning</h4>
                            <i class="card-text">You are acquiring bit-co2 tokens which can be invested in different green Projects of your choice offerted only via this website. 
                            All kinds of investment is a risk and we will not responsible for any type of losses and/or damages that you may obtain by your participation in the projects, 
                            systems or by the uncomplice of your countries laws or exigences about financial investment and/or others. 
                            By do click in "buy/invest" you are adquiring initial tokens witch you may exchanging for new tokens, bonds or other financial instruments 
                            (in accordance with each Project's offer conditions and their individual contracts to sign with their respective legal representatives). 
                            Therefore, you are automatilly and unconditionally accepting our rules and terms specified in our
                                <a href = "#" class = "alert-link">
                                <font> Legal Notice </font>
                                </a>
                            .</i>
                            <br></br>
                            <br></br>
                            <span className="form-control" type="text">Project :    Achuar Amazonian Reserve - Ecuador</span>
                            <br></br>
                            <input className="form-control" type="text" placeholder="Your Name :" onChange={(e) => this.updateValue("purchase", "projectName", e.target.value)}/>
                            <br></br>
                            <input className="form-control" type="text" placeholder="Your Country :" onChange={(e) => this.updateValue("purchase", "userData", e.target.value)}/>
                            <br></br>
                            <span className="form-text text-muted">Discount :</span>
                            <input className="form-control" type="number" step="1" min="0" max="12" placeholder="Enter your discount, (max. 12%) :" onChange={(e) => this.updateValue("purchase", "userDiscount", e.target.value)}/>
                            <br></br>
                            <span className="form-text text-muted">Tokens request, quantity :</span>
                            <input className="form-control" type="number" step="1" min="1" max="1000" placeholder="Your order / tokens qty, units :" onChange={(e) => this.updateValue("purchase", "orderQty", e.target.value)}/>
                            <br></br>
                            <span className="form-text text-muted">Price, 1 token : {((100-this.state.purchase.userDiscount)*(this.nomPrice))/100} waves</span>
                            <br></br>    
                            <span className="form-text text-muted">Investment amount : {((100-this.state.purchase.userDiscount)*(this.state.purchase.orderQty)*(this.nomPrice))/100} waves</span>                        
                            <br></br>
                            <input className="btn btn-primary" type="submit" value="Invest / Buy tokens" onClick={this.purchase}/>
                            <br></br>
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
};

//<a className="form-text text-muted" target="_blank" href={this.explorerUrl + "/tx/" + this.state.purchase.txid}>Transaction / Suma a Invertir: {((100-this.state.purchase.userDiscount)*(this.state.purchase.orderQty)*(this.nomPrice))/100} waves</a>

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}
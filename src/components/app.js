import ReactDOM from "react-dom";
import React from 'react';
import { invokeScript, broadcast } from '@waves/waves-transactions'

class App extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    deposit: {
                      seed: '',
                      amount: '',
                      txid: ''
                    }
                };
                this.baseUri = 'https://testnodes.wavesnodes.com';
                this.wavelet = 100000000;
                this.dApp = '3N7b5RREJBhrQwb5AiKUB2upCxMSfNw4nok';
                this.explorerUrl = "https://wavesexplorer.com/testnet";
                this.deposit = this.deposit.bind(this);
                this.updateValue = this.updateValue.bind(this);
            }
            updateValue(scope, key, value) {
              const newState = this.state[scope];
              newState[key] = value;
              this.setState(
                      {
                        [scope]: newState
                      }
                );
            }
            deposit(){
              if (window.confirm("Are you sure you wish to deposit?")) {
                  const params = {
                      dApp: this.dApp,
                      call: {
                          function: "deposit",
                          args:[]
                      },
                      payment: [ {amount: this.state.deposit.amount*this.wavelet, asset:null } ],
                      chainId: 84
                  };
                  console.log(this.state.deposit);
                  console.log(params);
                  let tx = invokeScript(params, this.state.deposit.seed);
                  let res = broadcast(tx, this.baseUri);
                  res.then((v) => this.updateValue("deposit", "txid", tx.id),
                      (e) => { console.log(e); this.updateValue("deposit", "txid", '') });
              }
            }

            render() {
                return (
                    <div className="container">
                      <div className="deposit form-group">
                        <label>[Investor] Deposit</label>
                        <input className="form-control" type="text" placeholder="Seed phrase" onChange={(e) => this.updateValue("deposit", "seed", e.target.value)}/>
                        <small className="form-text text-muted">It is a demo in Waves testnet. Please keep your seed always carefully</small>
                        <input className="form-control" type="number" placeholder="WAVES - Amount" onChange={(e) => this.updateValue("deposit", "amount", e.target.value)}/>
                        <input className="btn btn-primary" type="submit" value="Deposit" onClick={this.deposit}/>
                        <br/>
                        <a className="form-text text-muted" target="_blank" href={this.explorerUrl + "/tx/" + this.state.deposit.txid}>Transaction: {this.state.deposit.txid}</a>
                        <br/>
                      </div>
                    </div>
                );
            }
        }

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}

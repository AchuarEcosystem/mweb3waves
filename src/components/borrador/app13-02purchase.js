import ReactDOM from "react-dom";
import React from 'react';
import { invokeScript, broadcast } from '@waves/waves-transactions'

class App extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                  //deposit: {   //esta es la funcion
                    purchase: {       
                      seed: '',
                      amount: '',
                      txid: ''
                    }
                };
                this.baseUri = 'https://testnodes.wavesnodes.com';
                this.wavelet = 100000000;
                //this.dApp = '3N7b5RREJBhrQwb5AiKUB2upCxMSfNw4nok';
                this.dApp = '3NCMRePzjciTxHUD4d7iSTcdJSmewj3zBT1';//cuenta: Ecosystem-01
                this.explorerUrl = "https://wavesexplorer.com/testnet";
                //this.deposit = this.deposit.bind(this);
                this.purchase = this.purchase.bind(this);
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
          //deposit(){
            purchase(){
              if (window.confirm("The amounts correspond, are you sure? Do you want to make the purchase?")) {
                  const params = {
                      dApp: this.dApp,
                      call: {
                        //function: "deposit",
                          function: "purchase",
                          args:[]
                      },
                    //payment: [ {amount: this.state.deposit.amount*this.wavelet, assetId:null } ],
                      payment: [ {amount: this.state.purchase.amount*this.wavelet, assetId:null } ],
                      chainId: 84   //chainId 87 mainnet!!! OJO
                  };
                //console.log(this.state.deposit);
                  console.log(this.state.purchase);
                  console.log(params);
                //let tx = invokeScript(params, this.state.deposit.seed);
                  let tx = invokeScript(params, this.state.purchase.seed);
                  let res = broadcast(tx, this.baseUri);
                //res.then((v) => this.updateValue("deposit", "txid", tx.id),
                  res.then((v) => this.updateValue("purchase", "txid", tx.id),
                    //(e) => { console.log(e); this.updateValue("deposit", "txid", '') });
                      (e) => { console.log(e); this.updateValue("purchase", "txid", '') });
              }
            }

            render() {
                return (
                    <div className="container">
                      <div className="purchase form-group">
                        <br></br>
                        <label>[Buyer / Cliente] Payment Order / Pagar via Waves BlockChain</label>
                        <input className="form-control" type="text" placeholder="Seed phrase" onChange={(e) => this.updateValue("purchase", "seed", e.target.value)}/>
                        <small className="form-text text-muted">Please, keep your seed always carefully</small>
                        <input className="form-control" type="number" placeholder="Suma a pagar en Waves / the WAVES amount to be paid must match with the purchase order amount" onChange={(e) => this.updateValue("purchase", "amount", e.target.value)}/>
                        <br></br>
                        <input className="btn btn-primary" type="submit" value="Purchase" onClick={this.purchase}/>
                        <a className="form-text text-muted" target="_blank" href={this.explorerUrl + "/tx/" + this.state.purchase.txid}>Datos de su transación / Transaction Data in BlockChain: {this.state.purchase.txid}</a>
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

// Product Constructor
class Product {
    constructor(name, email, nomprice, discount, discprice, investment, total) {
        this.name = name;
        this.email = email;
        this.nomprice = nomprice;
        this.discount = discount;
        this.discprice = discprice;
        this.investment = investment;
        this.total = total;
    }
}

// UI Constructor
class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');

        element.innerHTML = `
            <div class="card text-left mb-4">
                <div class="card-header">
                  <h5>Purchase Order</h5>
                </div>
                <div class="card-body">
                    <p><strong>Name</strong>: ${product.name}</p>
                    <p><strong>E-mail</strong>: ${product.email}</p>
                    <p><strong>1 Bit-CO2, nominal price</strong>: ${product.nomprice} euros</p>
                    <p><strong>Discount rate</strong>: ${product.discount} %</p>
                    <p><strong>1 Bit-CO2, offered price</strong>:  ${product.discprice} euros</p>
                    <p><strong>Bit-CO2 to adquired, units</strong>: ${product.investment}</p>
                    <p><strong>Total amount to pay</strong>: ${product.total} euros</p>
<p></p>
                    <!--<a href="#" class="btn btn-danger" name="delete">Delete</a> -->
<p></p>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Successfully', 'success');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Show in The DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        // Insert Message in the UI
        container.insertBefore(div, app);
        // Remove the Message after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function (e) {

        const name = document.getElementById('name').value,
             email = document.getElementById('email').value,
          nomprice = 10,
          discount = document.getElementById('discount').value,
         discprice = 10*(100-document.getElementById('discount').value)/100,
        investment = document.getElementById('investment').value,
             total = parseFloat(discprice*investment).toFixed(2);


        // Create a new Object Product
        const product = new Product(name, email, nomprice, discount, discprice, investment, total);

        // Calculation of a New BIT-CO2 Price




        // Create a new UI
        const ui = new UI();

        // Input User Validation
        if (name === '' || email === '' || discount === '' || investment === '') {
            ui.showMessage('Please Insert data in all fields', 'danger');
        }

        // Save Product
        ui.addProduct(product);
        ui.showMessage('Data Added Successfully', 'success');

        ui.resetForm();

        e.preventDefault();
    });

document.getElementById('product-list')
    .addEventListener('click', function (e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
        e.preventDefault();
    });

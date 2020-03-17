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
                                {type:"integer", value:this.state.purchase.amount*this.wavelet}
                            ]
                        }, payment: [{assetId: "WAVES", amount:this.state.purchase.amount*this.wavelet}]
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
                            <input className="form-control" type="number" step="0.01" placeholder="Amount" onChange={(e) => this.updateValue("purchase", "amount", e.target.value)}/>
                            <br></br>
                            <input className="btn btn-primary" type="submit" value="Buy aBitCO2 tokens" onClick={this.purchase}/>
                            <a className="form-text text-muted" target="_blank" href={this.explorerUrl + "/tx/" + this.state.purchase.txid}>Transaction: {this.state.purchase.txid}</a>
                            <br></br>
                        </div>
                                            
                    </div>
                </div>
                
                <div className="container">
                <input className="btn btn-primary" type="submit" value="Auth" onClick={this.authFunc}/></div>
            </div>
        )
    }
};

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}

/*
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
                    <p><strong>Total Amount to Pay</strong>: ${product.total} euros</p>
<p></p>
                    <!--<a href="#" class="btn btn-danger" name="delete">Delete</a> -->
<p></p>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-subtitle mb-2 text-muted">Warning</h4>
                            <i class="card-text">You are acquiring bit-co2 tokens, which can be invested in different green Projects of your choice.
                                All types of investment are a risk and we are not responsible for the losses and/or damages that you may obtain
                                by your participation in the projects. By investing in this project you are unconditionally
                                accepting our rules and terms specified in our
                                <a href = "#" class = "alert-link">
                                <font> Legal Notice </font>
                                </a>
                                .</i> <br>
                        </div>
                        <div class="card">
                            <div class="card-body">
                            <a href="#" class="card-link" name="delete">I'm not agree</a>
                            </div>
                        </div>
                    </div>
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
*/
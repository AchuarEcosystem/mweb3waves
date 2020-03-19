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
        <div class="card">
          <div class="card-body">

          <h5> Hi ${product.name}!</h5>
          <h6>Para obtener los bonos de carbono del presente proyecto es necesario tu comprencion, aceptacion y
              ejecucion de los siguientes pasos:</h6>
          <h6>1. Adquirir los tokens Bit-CO2. Para ello, tus datos: nombres, apellidos y E-mail seran inicialmente
              codificados y luego cifrados digitalmente antes de ingresar en la blockchain de la plataforma Waves,
              por ello esta informacion sera considerada de caracter oculta</h6>
          <h6>2. Cambiar tus tokens Bit-CO2 por los Bonos de Carbono del Proyecto. Para ello sera necesario cumplir
              con un procedimiento "KYC" (Know Your Custom) de comprobacion de tus datos, los cuales seran necesarios
              para la preparacion del correspondiente Contrato de Inversion y de obligatorio cumplimiento de las partes.</h6>
          <h6>El proceso de inversion empezara solamente luego de marcar en la casilla "CONTRACT / KYC" y el cumplimiento
              del punto 2.</h6>


            <i class="card-text">  Para obtener los bonos de carbono del presente proyecto es necesario la aceptacion y ejecucion de los siguientes pasos:
              1. Calcular su Inversion a traves de la tabla "Buyer/Investor".
              2. Adquirir tokens Waves. Para ello:
              2.1. Autorizar Waves Keeper en su sistema operativo o unidad digital.
              2.2. Cargar su billetera digital con la suma o cantidad necesaria de cryptomonedas o tokens aceptables para la adquisicion, compra o intercambio por Bit-CO2.
              3. Rellenar la tabla "Buyer/Investor" y presentar su "Purchase Orden"
              3.1. Para presentar su orden de compra haga click en "Start Transaction"
              3.2. Usted recibira un E-mail para la confirmacion de su direccion de correo. Luego de la verificacion de su correo, sus datos: nombres, apellidos y E-mail, seran cifrados digital y automaticamente enviados a la blockchain de la plataforma Waves para la ejecucion de su compra.
              Al concluir el proceso de transaccion Usted recibira un mensaje indicandole el estado de reserva y adquisicion de sus tokens Bit-CO2.
              4. Intercambiar sus tokens Bit-CO2 por los Bonos de Carbono del Proyecto.
              Para ello sera necesario cumplir con un procedimiento "KYC" (Know Your Custom) de comprobacion de sus datos, los cuales seran necesarios para la preparacion del correspondiente Contrato de Inversion y de obligatorio cumplimiento de las partes.
              El proceso de inversion contractual empezara luego de marcar en la casilla "CONTRACT / KYC". </i> <br><br>

              <h4 class="card-subtitle mb-2 text-muted">Warning</h4>
              <i class="card-text">You are acquiring bit-co2 tokens, which can be invested in different green Projects of your choice.
                All types of investment are a risk and we are not responsible for the losses and/or damages that you may obtain
                by your participation in the projects. By investing in this project you are unconditionally
                accepting our rules and terms specified in our
                <a href = "#" class = "alert-link">
                <font> Legal Notice </font>
                </a>
                .</i> <br><br>

              <a href="#" class = "btn btn-primary" name="keeperWaves">
               Start Transaction
              </a>

              <a href="#" class = "btn btn-danger" name="delete">
               Exit / Delete
              </a>
          </div>

          <div class="card">
            <div class="card-body">
              <a href="#" class="card-link" name="donate">I want donate</a>
              <a href="#" class="card-link" name="otherpayment">Other payment's form</a>
            </div>
          </div>

        </div>
  <p>
  <p>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title">CONGRATULATION!</h4>
            <p>
            <h6 class="card-subtitle mb-2 text-muted"></h6>
            <p class="card-text">You have acquired: ${product.investment} Bit-CO2 tokens.</p>
            <a href="#" class="card-link">Contract</a>
          </div>
        </div>
      <p>
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

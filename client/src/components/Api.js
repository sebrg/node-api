import React from 'react';


class Api extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     APIresponse: [],
     input: {productname: '', price: ''}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  
  }

makeReq = (url, method, body) => {
  try {
      const response = fetch(url, {
          headers: {"Content-Type": "application/json"}, 
          method,
          body: JSON.stringify(body)
      })
          .then(response => {
            const data = response.json()
            return data
          })

          .then(data => {
            console.log(data)
            this.setState({
                APIresponse: data
            }) 
          })
      }           
          catch(err) {
              console.error(err)
          }
}

handleChange = (event) => {
  const value = event.target.value;
  this.setState({
    input: {
      ...this.state.input,
      [event.target.name]: value, 
    } 
  });
  console.log(this.state.input)
}

handleSubmit = (event) =>  {
  this.makeReq('http://localhost:3001/api', 'POST', this.state.input)
  event.preventDefault();
}

deleteProduct = (productName) => {
  this.makeReq(`http://localhost:3001/api/${productName}`, 'DELETE')
  console.log(productName)
}

async componentDidMount() {
    this.makeReq('http://localhost:3001/api', 'GET')
}
   
    render() {
       const {APIresponse} = this.state

    return (
        <div style={bcol}>
          <div style={header}>
              Node
          </div>

            <div>
              <input name='productname' type='text' value={this.state.input.productname} onChange={this.handleChange} placeholder='product-name'></input>
              <input name='price' type='text' value={this.state.input.price} onChange={this.handleChange} placeholder='price'></input>
              <button type='submit' onClick={this.handleSubmit}>Add product</button>
            </div>

          <div style={divBox}>
            {APIresponse.map(product => (  
              <div style={proCard}>
              <h1> {product.productname} </h1>
              <h3> {product.price} kr </h3>
              <button onClick={() => this.deleteProduct(product.productname)} >Delete Product</button>
          </div>
            ))}
        </div>
      </div>
    )
  }

}

export default Api;

const header = {
    width: '100vw', 
    height: '10vh',
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '0',
    fontSize: '36px'
}

const bcol = {
    backgroundColor: 'white',
    width: '100vw', 
    height: '100%',
    
}

const proCard = {
    backgroundColor: 'Grey',
    border: '1px',
    borderRadius: '10px',
    width: '20vw',
    height: '40vh',
    margin: '10px',
    color: 'white'
    
}

const divBox = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexWrap: 'wrap'
    
}
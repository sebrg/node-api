import React from 'react';


class Api extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     APIresponse: [],
     input: {id: '', productname: '', price: ''},
     selectedProduct: [],
     hidden: false,  
     updateProduct: {id: '', productname: '', price: ''},
     jokeApiResponse: [],
     searchProduct: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
}

getExternalApi = () => {
  let headers = new Headers()
  headers.append('Content-Type', 'application/json')
  fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,racist,sexist', {
    headers: headers,
  })
  .then(response =>  {
      const data = response.json()
      return data  
  })  
  .then(data =>  {
    console.log(data)
      this.setState({
          jokeApiResponse: data  
      })
  })             
  
} 

makeReq = (url, method, body) => {
  let headers = new Headers()
  headers.append('Content-Type', 'application/json')
  try {
      const response = fetch(url, {
          headers: headers, 
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

handleOnSearch = (evt) => {
  this.setState({
    searchProduct: evt.target.value
  })
  console.log(evt)
}

getProductOnSearch = () => {
  let product = this.state.searchProduct
  this.makeReq(`http://localhost:3001/api/${product}`, 'GET')
}

viewAll = () => {
  this.makeReq('http://localhost:3001/api', 'GET')
}

handleChangeOnUpdate = (event) => {
  const value = event.target.value;
  this.setState({
    updateProduct: {
      ...this.state.updateProduct,
      [event.target.name]: value, 
    } 
  });
  console.log(this.state.updateProduct)
}

handleSubmit = (event) =>  {
  if(this.state.input.productname === '' || this.state.input.price === '') {
    alert('Product name and price are required to add a product.')
  }
  else {

    this.makeReq('http://localhost:3001/api', 'POST', this.state.input)
  }
  event.preventDefault();
}

deleteProduct = (productId) => {
  this.makeReq(`http://localhost:3001/api/${productId}`, 'DELETE')
  console.log(productId)
}

updateProduct = (selectedProduct) => {
    this.setState({
      selectedProduct: selectedProduct
    })
    this.setState({
      hidden: true
    })
}

closeBtn = () => {
  this.setState({
    hidden: false
  })
}

submitUpdate = (prodId) => {
  if(this.state.updateProduct.productname === '' || this.state.updateProduct.price === '') {
    alert('Product name and price are required to add a product.')
  }
  else {
    this.makeReq(`http://localhost:3001/api/${prodId}`, 'PUT', this.state.updateProduct)
    this.setState({
      hidden: false
    })
    console.log(prodId)
  }
}

async componentDidMount() {
    this.makeReq('http://localhost:3001/api', 'GET')
    this.getExternalApi() 
}

    render() {
       const {APIresponse} = this.state
       const {jokeApiResponse} = this.state

    return (
        <div style={bcol}>
    
          <div style={divBox}>
              <div style={jokeCard}>
              <h1> {jokeApiResponse.setup || jokeApiResponse.joke} </h1>
              <h3> {jokeApiResponse.delivery} </h3>
              </div>    
        </div>

            <div style={divBox}>
              <input style={inputs} onChange={this.handleOnSearch} placeholder='Get product(s) by name'></input> 
              <button style={buttonstyle} onClick={() => this.getProductOnSearch()} >Search</button>
              <button style={buttonstyle} onClick={() => this.viewAll()} >View all products</button>
            </div>

            <div style={divBox}>
              <input style={inputs} name='productname' type='text' value={this.state.input.productname} onChange={this.handleChange} placeholder='product-name'></input>
              <input style={inputs} name='price' type='number' value={this.state.input.price} onChange={this.handleChange} placeholder='price'></input>
              <button style={buttonstyle} type='submit' onClick={this.handleSubmit}>Add Product</button>
            </div>

              <div style={divBox}>
              <div style={{ display: (this.state.hidden ? 'flex' : 'none') }}>
              <button onClick={() => this.closeBtn()} style={buttonstyle3}>Close</button>
                <input name='productname' type='text' style={inputs} placeholder={this.state.selectedProduct.productname} onChange={this.handleChangeOnUpdate}></input>
                <input name='price' type='number' style={inputs} placeholder={this.state.selectedProduct.price} onChange={this.handleChangeOnUpdate}></input>
                <button style={buttonstyle2} onClick={() => this.submitUpdate(this.state.selectedProduct.id)} >Update</button>
              </div>
              </div>

          <div style={divBox}>
            {APIresponse.map(product => (  
              <div style={proCard}>
              <h1> {product.productname} </h1>
              <h3> {product.price} kr </h3>
              <button style={buttonstyle2} onClick={() => this.updateProduct(product)} >Update Product</button>
              <button style={buttonstyle2} onClick={() => this.deleteProduct(product.id)} >Delete Product</button>
              </div>
            ))}
        </div>
      </div>
    )
  }

}

export default Api;

const bcol = {
    backgroundColor: 'white',
    width: '100vw', 
    height: '100%',  
}

const proCard = {
    backgroundColor: 'lightblue',
    border: '1px',
    borderRadius: '10px',
    width: '20vw',
    height: '40vh',
    margin: '10px',
    color: 'white',  
}

const divBox = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
    marginBottom: '10px'  
}

const jokeCard = {
  backgroundColor: 'lightblue',
    border: '1px',
    borderRadius: '10px',
    width: '100%',
    height: '100%',
    margin: '10px',
    color: 'white',  
}

const buttonstyle = {
  width: '15vw',
  height: '5vh',
  border: '1px',
  borderRadius: '5px',
  backgroundColor: 'blue',
  color: 'white',
  cursor: 'pointer',
  margin: '5px'
}

const buttonstyle2 = {
  width: '15vw',
  height: '5vh',
  border: '1px',
  borderRadius: '5px',
  backgroundColor: 'blue',
  color: 'white',
  cursor: 'pointer',
  margin: '10px'
}
const buttonstyle3 = {
  width: '5vw',
  height: '5vh',
  border: '1px',
  borderRadius: '5px',
  backgroundColor: 'blue',
  color: 'white',
  cursor: 'pointer',
  margin: '10px'
}

const inputs = {
  width: '50%',
  padding: '12px 20px',
  margin: '8px 0',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
}
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     APIresponse: ''
    }
  }

  fetchApi = () => {
     fetch('http://localhost:3001/testApi')
    .then(response =>  {
      const data = response.json()
      return data
  }) 

  .then(data =>  {
    console.log(data)
      this.setState({
          APIresponse: data
      })   
  })             
}

async componentDidMount() {
  this.fetchApi()
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.APIresponse}
        </h1>
      </div>
    )
  }

}

export default App;

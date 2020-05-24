import React from 'react';
import Signout from './Components/Signout/Signout';
import Logo from './Components/Logo/Logo';
import Imgsearch from './Components/Imgsearch/Imgsearch';
import Rank from './Components/Rank/Rank';
import Facerecognise from './Components/Facerecognise/Facerecognise';
import Particles from 'react-particles-js';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';


const initialState = {
  input: '',
  imageUrl:'',
  box: '',
  route:'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
 }
}

class App extends React.Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onRouteChange = (route) =>{
    if (route === 'signin'){
      this.setState(initialState)
    }
    this.setState({route:route})
  }

  calculateFaceLocation = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * height,
      rightCol: width - (faceData.right_col * width),
      bottomRow: height - (faceData.bottom_row * height)
    }
  }

  faceBox = (box) => {
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    // console.log(this.state.imageUrl)
    fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: this.state.input
          })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
      }
      this.faceBox(this.calculateFaceLocation(response))
    })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'/>
        {this.state.route === 'signedin'
          ?<div>
            <Signout onRouteChange={this.onRouteChange}/>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <Imgsearch onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <Facerecognise faceBox={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
          :
            (this.state.route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;

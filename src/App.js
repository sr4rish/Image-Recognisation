import React from 'react';
import Clarifai from 'clarifai';
import Signout from './Components/Signout/Signout';
import Logo from './Components/Logo/Logo';
import Imgsearch from './Components/Imgsearch/Imgsearch';
import Rank from './Components/Rank/Rank';
import Facerecognise from './Components/Facerecognise/Facerecognise';
import Particles from 'react-particles-js';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
  apiKey: '6af74fa69edb44bda34f4f48af02f134'
 });

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: '',
      route:'signin'

    }
  }

  onRouteChange =(route) =>{
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
    console.log(this.state.imageUrl)
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.faceBox(this.calculateFaceLocation(response)))
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
            <Rank/>
            <Imgsearch onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <Facerecognise faceBox={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
          :
            (this.state.route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;

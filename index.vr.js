import React from 'react';
import {
  AppRegistry,
  AmbientLight,
  SpotLight,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Model,
  Scene,
  CylindricalLayer
} from 'react-vr';

import TheGlasses from './components/TheGlasses.vr.js'

export default class putontheglasses extends React.Component {
  constructor() {
    super();

    this.state = {
      alternateMode: false
    }

    this.toggleMode = this.toggleMode.bind(this);
  }

  render() {
    return (
      <View>
        <SpotLight
          intensity={1.5}
          style={{
            color: '#00d8ff'
          }} />
        {this.state.alternateMode ?
          <Pano source={asset('times-square-pano-alternate.jpg')} /> :
          <Pano source={asset('times-square-pano.jpg')} />
        }
        <TheGlasses onClick={this.toggleMode}/>
      </View>
    );
  }

  toggleMode() {
    this.setState({alternateMode: !this.state.alternateMode})
  }
};

AppRegistry.registerComponent('putontheglasses', () => putontheglasses);

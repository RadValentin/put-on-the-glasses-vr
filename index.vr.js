import React from 'react';
import {
  AppRegistry,
  SpotLight,
  asset,
  Pano,
  Text,
  View,
  Model,
  VrButton,
  Animated
} from 'react-vr';

import TheGlasses from './components/TheGlasses.vr.js';

export default class putontheglasses extends React.Component {
  constructor() {
    super();

    this.state = {
      showName: false,
      alternateMode: false,
      textOpacity: new Animated.Value(1),
      vrTextOpacity: new Animated.Value(1)
    };

    this.toggleMode = this.toggleMode.bind(this);
    this.showTitle = this.showTitle.bind(this);
  }

  render() {
    return (
      <View
        style={{
          layoutOrigin: [0.5, 0.5],
          alignItems: 'center'
        }}>
        <SpotLight intensity={1.5} style={{ color: '#00d8ff' }} />
        {this.state.alternateMode
          ? <Pano source={asset('teapots.jpg')} />
          : <Pano source={asset('times-square-pano.jpg')} />}
        {this.state.showName && !this.state.alternateMode
          ? <VrButton
              onClick={this.showTitle}
              style={{
                flexDirection: 'row',
                height: 0.15,
                width: 1,
                layoutOrigin: [-0.02, 0],
                transform: [{ translateY: 0.2 }, { translateZ: -1 }]
              }}>
              <Animated.Text
                style={{
                  opacity: this.state.vrTextOpacity,
                  backgroundColor: '#00d8ff80',
                  fontSize: 0.13
                }}>
                V
              </Animated.Text>
              <Animated.Text
                style={{
                  opacity: this.state.textOpacity,
                  backgroundColor: '#00d8ff80',
                  fontSize: 0.13
                }}>
                alentin
              </Animated.Text>
              <Animated.Text
                style={{
                  opacity: this.state.vrTextOpacity,
                  backgroundColor: '#00d8ff80',
                  fontSize: 0.13
                }}>
                &nbsp;R
              </Animated.Text>
              <Animated.Text
                style={{
                  opacity: this.state.textOpacity,
                  backgroundColor: '#00d8ff80',
                  fontSize: 0.13
                }}>
                adulescu
              </Animated.Text>
            </VrButton>
          : null}
        {!this.state.alternateMode && <TheGlasses onClick={this.toggleMode} />}
        {!this.state.showName && !this.state.alternateMode
          ? <VrButton
              onClick={() => this.setState({ showName: true })}
              style={{
                height: 0.15,
                width: 0.783,
                backgroundColor: '#00d8ff80',
                layoutOrigin: [-0.02, 0],
                transform: [{ translateY: -0.1 }, { translateZ: -1 }]
              }}>
              <Text>Put on the Glasses</Text>
            </VrButton>
          : null}
      </View>
    );
  }

  toggleMode() {
    this.setState({ alternateMode: !this.state.alternateMode });
  }

  showTitle() {
    Animated.sequence([
      Animated.timing(this.state.textOpacity, {
        toValue: 0,
        duration: 1000
      }),
      Animated.timing(this.state.vrTextOpacity, {
        toValue: 0,
        duration: 1000,
        delay: 500
      })
    ]).start(() => {});
  }
}

AppRegistry.registerComponent('putontheglasses', () => putontheglasses);

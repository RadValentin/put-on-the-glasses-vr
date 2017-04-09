import React from 'react';
import {
  asset,
  Model,
  VrButton,
  View,
  Animated,
  Cylinder
} from 'react-vr';

export default class TheGlasses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(1),
      xPosition: new Animated.Value(0),
      yPosition: new Animated.Value(0),
      yRotation: new Animated.Value(0),
      zPosition: new Animated.Value(-5)
    };

    this.rotateAndZoomAnimation = this.rotateAndZoomAnimation.bind(this);
    this.cycleHoverAnimation = this.cycleHoverAnimation.bind(this);
    this.enterSpinAnimation = this.enterSpinAnimation.bind(this);
    this.exitSpinAnimation = this.exitSpinAnimation.bind(this);
  }

  componentDidMount() {
    this.cycleHoverAnimation();
  }

  render() {
    return (
      <Animated.View
        style={{
          opacity: this.state.opacity,
          transform: [
            {translateX: this.state.xPosition},
            {translateY: this.state.yPosition},
            {translateZ: this.state.zPosition},
            {rotateY: this.state.yRotation},
          ]
        }}>
        <VrButton
          onClick={this.rotateAndZoomAnimation}
          onEnter={this.enterSpinAnimation}
          onExit={this.exitSpinAnimation}>
          <Model
            lit={true}
            source={{
              obj: asset('raybanz.obj'),
              mtl: asset('raybanz.mtl'),
            }}
            style={{transform: [{scale: .002}]}}
          />
          <Model
            source={{
              obj: asset('transparent-cube.obj'),
              mtl: asset('transparent-cube.mtl'),
            }}
            style={{
              transform: [
                {scale: .01}
              ]
            }}
          />
        </VrButton>
      </Animated.View>
    );
  }

  cycleHoverAnimation() {
    Animated.sequence([
      Animated.timing(this.state.yPosition, {
        toValue: .2,
        duration: 2500,
      }),
      Animated.timing(this.state.yPosition, {
        toValue: 0,
        duration: 2500
      })
    ]).start(() => this.cycleHoverAnimation());
  }

  enterSpinAnimation() {
    Animated.timing(this.state.yRotation, {
      toValue: 180,
      duration: 300
    }).start();
  }

  exitSpinAnimation() {
    Animated.timing(this.state.yRotation, {
      toValue: 0,
      duration: 300
    }).start();
  }

  rotateAndZoomAnimation() {
    Animated.parallel([
      Animated.timing(this.state.xPosition, {
        toValue: -0.3,
        duration: 300
      }),
      Animated.timing(this.state.yPosition, {
        toValue: -0.2,
        duration: 300
      }),
      Animated.timing(this.state.zPosition, {
        toValue: 0.3,
        duration: 300
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 300
      })
    ]).start(() => this.props.onClick());
  }
}

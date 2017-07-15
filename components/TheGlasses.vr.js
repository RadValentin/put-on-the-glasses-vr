import React from 'react';
import { asset, Model, VrButton, View, Animated, Box } from 'react-vr';

export default class TheGlasses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
          width: 0.8,
          height: 0.1,
          transform: [
            { translateX: this.state.xPosition },
            { translateY: this.state.yPosition },
            { translateZ: this.state.zPosition },
            { rotateY: this.state.yRotation }
          ]
        }}>
        <VrButton
          onClick={this.rotateAndZoomAnimation}
          onEnter={this.enterSpinAnimation}
          onExit={this.exitSpinAnimation}>
          <Model
            lit={true}
            materialParameters={{
            }}
            source={{
              obj: asset('raybanz.obj'),
              mtl: asset('raybanz.mtl')
            }}
            style={{ transform: [{ scale: 0.002 }] }}
          />
          {/* Add an invisible box so that we catch hover events in the 
           approximate area of the glasses without stickying strictly to their 
           shape. */}
          <Box
            dimWidth={1.2}
            dimDepth={1.2}
            dimHeight={1}
            style={{
              opacity: 0,
              transform: [{ translate: [0, 0.2, 0] }]
            }}
          />
        </VrButton>
      </Animated.View>
    );
  }

  cycleHoverAnimation() {
    Animated.sequence([
      Animated.timing(this.state.yPosition, {
        toValue: 0.2,
        duration: 2500
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
      })
    ]).start(() => this.props.onClick());
  }
}

import React, { useState, useEffect } from "react";
import { Dimensions, Animated } from "react-native";

const SlideInView = props => {
  const [yPosition] = useState(
    new Animated.Value(Dimensions.get("window").height / 2)
  );

  useEffect(() => {
    if (props.isOpen) {
      Animated.timing(yPosition, {
        toValue: 0,
        duration: 250
      }).start();
    } else {
      Animated.timing(yPosition, {
        toValue: Dimensions.get("window").height / 2,
        duration: 250
      }).start(props.animationComplete);
    }
  }, [props.isOpen]);

  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [
          {
            translateY: yPosition
          }
        ]
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default SlideInView;

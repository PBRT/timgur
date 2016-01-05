import { PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';

export default class ImageTransition extends React.Component {
  constructor() {
    super();
    this.willEnter = this.willEnter.bind(this);
  }
  willEnter(key) {
    return {
      handler: this.props.children[this.props.tiles[key].index],
      opacity: spring(0),
      position: spring(4),
    };
  }
  getStyles() {
    const { children, tiles } = this.props;
    let configs = {};
    Object.keys(tiles).forEach(key => {
      configs[key] = {
        handler: children[tiles[key].index],
        opacity: spring(1),
        position: spring(0),
      };
    });
    return configs;
  }
  render() {

    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
      >
        {interpolated =>
          <div>
            {Object.keys(interpolated).map(key =>
              <div
                key={`${key}-transition`}
                style={{
                  width: '100%',
                  position: 'absolute',
                  opacity: interpolated[key].opacity,
                  transform: `translate3d(0px, ${interpolated[key].position}, 0px)`
                }}
              >
               {interpolated[key].handler}
              </div>
            )}
          </div>
        }
      </TransitionMotion>
    );
  }
};

ImageTransition.propTypes = {
  tiles: PropTypes.object.isRequired,
};

ImageTransition.displayName = 'ImageTransition';

// Redux
import { likeImage, dislikeImage } from '../../actions/images.js';
import { connect } from 'react-redux';
import { fetchImagesIfNeeded } from '../../actions/images.js';
import ImageComp from 'image-comp.jsx';

let s = getStyle();

class ImagesSwiper extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchImagesIfNeeded());
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.imageList !== nextProps.imageList) {
      this.props.dispatch(fetchImagesIfNeeded());
    }
  }
  render() {
    const { dispatch, imageList } = this.props;
    return (
      <div style={s.container}>
        <div style={s.title}>
          Image List
        </div>
        {imageList.filter((image) => !image.isLiked).map((image, index) => (
          <ImageComp
            key={index}
            onLikeImage={() => dispatch(likeImage(image))}
            onDislikeImage={() => dispatch(dislikeImage(image))}
            image={image} />
        ))}
      </div>
    );
  }
};


function getStyle() {
  return {
    container: {
      textAlign: 'center',
    },
    title: {
      fontSize: UI.fontXL,
      marginBottom: 20,
    },
  };
}
ImagesSwiper.displayName = 'ImagesSwiper';

function select(state) {
  return {
    imageList: state.images.imageList,
  };
}

export default connect(select)(ImagesSwiper);

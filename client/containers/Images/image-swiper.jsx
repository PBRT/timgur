// Redux
import { likeImage } from '../../actions/images.js';
import { connect } from 'react-redux';

import ImageComp from 'image-comp.jsx';

let s = getStyle();

let ImagesSwiper = (props) => {
  const { dispatch, imageList } = props;

  return (
    <div style={s.container}>
      <div style={s.title}>
        Image List
      </div>
      {imageList.filter((image) => !image.liked).map((image, index) => (
        <ImageComp key={index} onImageClick={() => dispatch(likeImage(image))} image={image} />
      ))}
    </div>
  );
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
    imageList: state.images.images,
  };
}

export default connect(select)(ImagesSwiper);

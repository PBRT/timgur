// Redux
import { connect } from 'react-redux';
import ImageComp from 'image-comp.jsx';

let s = getStyle();

let ImagesLiked = (props) => {
  const { imageList } = props;

  return (
    <div style={s.container}>
      <div style={s.title}>
        Image Liked
      </div>
      {imageList.filter((image) => image.isLiked).map((image, index) => (
        <ImageComp key={index} image={image} />
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
ImagesLiked.displayName = 'ImagesLiked';

function select(state) {
  return {
    imageList: state.images.imageList,
  };
}

export default connect(select)(ImagesLiked);

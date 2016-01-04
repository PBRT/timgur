// Redux
import { connect } from 'react-redux';
import ImageComp from 'image-comp.jsx';

let s = getStyle();

let ImagesLiked = (props) => {
  const { imageList } = props;

  return (
    <div style={s.container}>
      <div style={s.title}>
        Images you liked
      </div>
      <div style={s.imagesContainer}>
        {imageList.filter((image) => image.isLiked).length === 0 ?
          <div>You did not liked anything so far!</div> :
          imageList.filter((image) => image.isLiked).map((image, index) => (
            <div style={s.imageWrapper} key={index}>
              <ImageComp image={image} isLast={true}/>
            </div>
        ))}
      </div>
    </div>
  );
};


function getStyle() {
  return {
    container: {
      textAlign: 'center',
      margin: 30,
    },
    title: {
      fontSize: UI.fontXL,
      marginBottom: 20,
    },
    imagesContainer: {
      margin: 'auto',
      maxWidth: 400,
    },
    imageWrapper: {
      margin: '40px 0px',
    },
  };
}
ImagesLiked.displayName = 'ImagesLiked';
ImagesLiked.propTypes = {
  imageList: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

// Get the global state
function select(state) {
  return {
    imageList: state.images.imageList,
  };
}

export default connect(select)(ImagesLiked);

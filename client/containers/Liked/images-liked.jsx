// Redux
import { connect } from 'react-redux';
import ImageTile from 'image-tile.jsx';

let s = getStyle();

let ImagesLiked = (props) => {
  const { imageList, isMobile} = props;
  const containerStyle = Object.assign({}, s.container, {margin: isMobile ? '100px 30px' : '100px'});

  return (
    <div style={containerStyle}>
      <div style={s.title}>
        Images you liked
      </div>
      <div style={s.imagesContainer}>
        {imageList.filter((image) => image.isLiked).length === 0 ?
          <div>You did not liked anything so far!</div> :
          imageList.filter((image) => image.isLiked).map((image, index) => (
            <div style={s.imageWrapper} key={index}>
              <ImageTile image={image} isLast={true}/>
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
      margin: 100,
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
    isMobile: state.viewport.isMobile,
  };
}

export default connect(select)(ImagesLiked);

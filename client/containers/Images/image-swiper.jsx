// Redux
import { likeImage, dislikeImage } from 'images.js';
import { connect } from 'react-redux';
import { fetchImagesIfNeeded } from 'images.js';
import ImageTile from 'image-tile.jsx';
import Spinner from 'spinner/spinner.jsx';

let s = getStyle();

class ImagesSwiper extends React.Component{
  constructor(props) {
    super(props);
    this.handleAction = this.handleAction.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchImagesIfNeeded());
    $(this.refs.like).velocity({rotateZ: '-35deg'});
    $(this.refs.dislike).velocity({rotateZ: '35deg'});
  }
  // Check if need to fetch other images
  componentWillReceiveProps(nextProps) {
    if (this.props.imageList !== nextProps.imageList) {
      this.props.dispatch(fetchImagesIfNeeded());
    }
  }
  // Handle animation and dispatch actions
  handleAction(image, type) {
    $(this.refs[type]).velocity('stop');
    $(this.refs[type]).velocity({opacity: 1}, {
      duration: 300,
      complete: function() {
        if (type === 'like') { this.props.dispatch(likeImage(image));}
        else if (type === 'dislike') { this.props.dispatch(dislikeImage(image)); }
        $(this.refs[type]).velocity({opacity: 0}, 0);
      }.bind(this)
    });
  }
  render() {
    const { imageList, isFetching } = this.props;
    // The array is reversed to have the correct order displayed on the stack
    const imageListToDisplay = imageList.filter((image) => !image.isLiked).filter((img, index) => index < 5).reverse();
    const imageDisplayed = imageListToDisplay[imageListToDisplay.length - 1];

    // Styles
    const likeTagStyle = Object.assign({}, s.tag, {borderColor: UI.lightGreen});
    const dislikeTagStyle = Object.assign({}, s.tag, {borderColor: UI.lightRed});


    return (
      <div style={s.container}>
        <div style={s.stack}>
          <div style={s.likeContainer} ref='like'>
            <div style={likeTagStyle}>LIKED</div>
          </div>
          <div style={s.dislikeContainer} ref='dislike'>
            <div style={dislikeTagStyle}>DISLIKED</div>
          </div>
          { isFetching ? <Spinner /> :
          imageListToDisplay.map((image, index) => {
            return (
              <div style={s.imageWrapper} key={index} >
                <ImageTile image={image} isLast={index === imageListToDisplay.length - 1}/>
              </div>
          );})}
        </div>
        <div
          style={s.like}
          className='image-swiper-button'
          onClick={() => this.handleAction(imageDisplayed, 'like')}>
            <img src={require('./assets/like.png')} style={s.icon}/>
          </div>
        <div
          style={s.dislike}
          className='image-swiper-button'
          onClick={() => this.handleAction(imageDisplayed, 'dislike')}>
          <img src={require('./assets/cross.png')} style={s.icon}/>
        </div>
      </div>
    );
  }
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
    stack: {
      position: 'relative',
      marginTop: 30,
      maxWidth: 300,
      height: 370,
      margin: 'auto',
    },
    like: {
      marginRight: 15,
    },
    dislike: {
      marginLeft: 15,
    },
    imageWrapper: {
      top: 0,
      left: 0,
      position: 'absolute',
    },
    tag: {
      backgroundColor: UI.lightWhite,
      borderRadius: 5,
      padding: '0px 20px',
      display: 'inline-block',
      border: '3px solid',
      paddingTop: 4,
    },
    likeContainer: {
      color: UI.lightGreen,
      fontSize: 30,
      position: 'absolute',
      marginTop: 50,
      width: '100%',
      textAlign: 'center',
      zIndex: 10,
      left: -50,
      opacity: 0,
    },
    dislikeContainer: {
      color: UI.lightRed,
      fontSize: 30,
      position: 'absolute',
      marginTop: 50,
      width: '100%',
      textAlign: 'center',
      zIndex: 10,
      left: 55,
      opacity: 0,
    },
    icon: {
      width: 30,
      margin: 20,
    },
  };
}
ImagesSwiper.displayName = 'ImagesSwiper';
ImagesSwiper.propTypes = {
  imageList: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

// Get the correct state
function select(state) {
  return {
    imageList: state.images.imageList,
    isFetching: state.images.isFetching,
  };
}

export default connect(select)(ImagesSwiper);

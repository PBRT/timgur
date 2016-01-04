// Redux
import { likeImage, dislikeImage } from '../../actions/images.js';
import { connect } from 'react-redux';
import { fetchImagesIfNeeded } from '../../actions/images.js';
import ImageComp from 'image-comp.jsx';

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
  componentWillReceiveProps(nextProps) {
    if (this.props.imageList !== nextProps.imageList) {
      this.props.dispatch(fetchImagesIfNeeded());
    }
  }
  handleAction(image, type) {
    if (type === 'like') {
      $(this.refs.like).velocity({opacity: 1}, {
        duration: 300,
        complete: function() {
          this.props.dispatch(likeImage(image));
          $(this.refs.like).velocity({opacity: 0}, 0);
        }.bind(this)});
    } else if (type === 'dislike') {
      $(this.refs.dislike).velocity({opacity: 1}, {
        duration: 300,
        complete: function() {
          this.props.dispatch(dislikeImage(image));
          $(this.refs.dislike).velocity({opacity: 0}, 0);
        }.bind(this)});
    }
  }
  render() {
    const { imageList } = this.props;
    const imageListToDisplay = imageList.filter((image) => !image.isLiked).filter((img, index) => index < 5).reverse();
    const imageDisplayed = imageListToDisplay[imageListToDisplay.length - 1];

    return (
      <div style={s.container}>
        <div style={s.stack}>
          <div style={s.likeContainer} ref='like'>
            <div style={s.likeTag}>LIKED</div>
          </div>
          <div style={s.dislikeContainer} ref='dislike'>
            <div style={s.dislikeTag}>DISLIKED</div>
          </div>
          {imageListToDisplay.map((image, index) => {
            return (
              <div style={s.imageWrapper} key={index} >
                <ImageComp image={image} isLast={index === imageListToDisplay.length - 1}/>
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
    likeContainer: {
      color: '#16a085',
      fontSize: 30,
      position: 'absolute',
      marginTop: 50,
      width: '100%',
      textAlign: 'center',
      zIndex: 10,
      left: -50,
      opacity: 0,
    },
    likeTag: {
      backgroundColor: '#ecf0f1',
      borderRadius: 5,
      padding: '0px 20px',
      display: 'inline-block',
      border: '3px solid #16a085',
      paddingTop: 4,
    },
    dislikeContainer: {
      color: '#FF6A67',
      fontSize: 30,
      position: 'absolute',
      marginTop: 50,
      width: '100%',
      textAlign: 'center',
      zIndex: 10,
      left: 55,
      opacity: 0,
    },
    dislikeTag: {
      backgroundColor: '#ecf0f1',
      borderRadius: 5,
      padding: '0px 20px',
      display: 'inline-block',
      border: '3px solid #FF6A67',
      paddingTop: 4,
    },
    icon: {
      width: 30,
      margin: 20,
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

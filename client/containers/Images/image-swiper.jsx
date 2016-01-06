// Redux
import { likeImage, dislikeImage, updateTag, updateSort } from 'images.js';
import { connect } from 'react-redux';
import { fetchImagesIfNeeded } from 'images.js';
import ImageTile from 'image-tile.jsx';
import Spinner from 'spinner/spinner.jsx';
import TopFilter from 'filter/top-filter.jsx';
import { stackDesktop, stackMobile } from 'constant.js';
const Swing = require('swing');

let stack;
let s = getStyle();

class ImagesSwiper extends React.Component{
  constructor(props) {
    super(props);
    this.attachCardListener = this.attachCardListener.bind(this);
    this.getImageListDisplayed = this.getImageListDisplayed.bind(this);
    this.handleThrowOut = this.handleThrowOut.bind(this);
  }
  handleThrowOut(image, type) {
    $(this.refs[`image-${image.id}`]).velocity('fadeOut', {
      duration: 400,
      complete: function() {
        stack.getCard(this.refs[`image-${image.id}`]).destroy();
        if (type === 'like') {
          this.props.dispatch(likeImage(image));
        } else if (type === 'dislike') {
          this.props.dispatch(dislikeImage(image));
        }
      }.bind(this)
    });
  }
  componentDidMount() {
    stack = Swing.Stack(this.props.isMobile ? stackMobile : stackDesktop);
    this.props.dispatch(fetchImagesIfNeeded());

    this.attachCardListener();

    stack.on('dragmove', (e) => {

      const list = this.getImageListDisplayed(this.props);
      const image = list[list.length -1];
      if (e.throwOutConfidence > 0) {
        if (e.throwDirection === 1) {
          $(this.refs[`dislike-${image.id}`]).css('opacity', 0);
          $(this.refs[`like-${image.id}`]).css('opacity', 1);
        } else if (e.throwDirection === -1) {
          $(this.refs[`dislike-${image.id}`]).css('opacity', 1);
          $(this.refs[`like-${image.id}`]).css('opacity', 0);
        }
      }
    });

    stack.on('dragend', () => {
      const list = this.getImageListDisplayed(this.props);
      const image = list[list.length -1];
      $(this.refs[`dislike-${image.id}`]).css('opacity', 0);
      $(this.refs[`like-${image.id}`]).css('opacity', 0);
    });

    // When image is dropped - LIKED
    stack.on('throwoutright', () => {
      const list = this.getImageListDisplayed(this.props);
      const image = list[list.length -1];
      $(this.refs[`like-${image.id}`]).css('opacity', 1);
      this.handleThrowOut(image, 'like');
    });

    // When image is dropped - DISLIKED
    stack.on('throwoutleft', () => {
      const list = this.getImageListDisplayed(this.props);
      const image = list[list.length -1];
      $(this.refs[`dislike-${image.id}`]).css('opacity', 1);
      this.handleThrowOut(image, 'dislike');
    });

    // When image is dropped - DISLIKED
    stack.on('throwoutend', () => {
      const list = this.getImageListDisplayed(this.props);
      const image = list[list.length -1];
      $(this.refs[`dislike-${image.id}`]).css('opacity', 0);
      $(this.refs[`like-${image.id}`]).css('opacity', 0);
    });

  }
  // Check if need to fetch other images
  componentWillReceiveProps(nextProps) {
    if (this.props.imageList !== nextProps.imageList) {
      this.props.dispatch(fetchImagesIfNeeded());
    }
  }
  getImageListDisplayed(tab) {
    return [...tab.imageList.filter((image) => !image.isLiked).filter((img, index) => index < 3)].reverse();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.imageList !== this.props.imageList) {
      this.attachCardListener();
    }
  }
  attachCardListener() {
    const list = this.getImageListDisplayed(this.props);
    if (list.length === 3) {
      const image = this.getImageListDisplayed(this.props)[list.length - 1];
      stack.createCard(this.refs[`image-${image.id}`]);
    }
  }
  throwOutCard(image, type) {
    if (type === 'like') {
      stack.getCard(this.refs[`image-${image.id}`]).throwOut(50, -20);
    } else if (type === 'dislike') {
      stack.getCard(this.refs[`image-${image.id}`]).throwOut(-50, -20);
    }
  }

  render() {
    const { imageList, isFetching, tag, sort, dispatch, isMobile } = this.props;

    // The array is reversed to have the correct order displayed on the stack
    const imageListToDisplay = imageList
      .filter((image) => !image.isLiked)
      .filter((img, index) => index < 3)
      .reverse();
    const imageDisplayed = imageListToDisplay[imageListToDisplay.length - 1];

    // Styles
    const containerStyle = Object.assign({}, s.container, {margin: isMobile ? '70px 20px' : '70px'});
    const likeTag = Object.assign({}, s.tag, s.likeContainer);
    const dislikeTag = Object.assign({}, s.tag, s.dislikeContainer);

    return (
      <div style={containerStyle}>
        <TopFilter
          tag={tag}
          onTagChange={(tag) => dispatch(updateTag(tag))}
          sort={sort}
          onSortChange={(sort) => dispatch(updateSort(sort))}/>
        <div style={s.stack}>
          { isFetching ? <Spinner /> :
          imageListToDisplay.map((image, index) => {
            return (
              <div style={s.imageWrapper} key={image.id} ref={`image-${image.id}`}>
                <div style={likeTag} ref={`like-${image.id}`}><div style={s.like}>LIKE</div></div>
                <div style={dislikeTag} ref={`dislike-${image.id}`}><div style={s.dislike}>DISLIKE</div></div>
                <ImageTile
                  redirect={false}
                  image={image}
                  isLast={index === imageListToDisplay.length - 1}/>
              </div>
          );})}
        </div>
        <div
          style={s.dislikeButton}
          className='image-swiper-button'
          onClick={() => this.throwOutCard(imageDisplayed, 'dislike')}>
          <img src={require('./assets/cross.png')} style={s.icon}/>
        </div>
        <div
          style={s.likeButton}
          className='image-swiper-button'
          onClick={() => this.throwOutCard(imageDisplayed, 'like')}>
            <img src={require('./assets/like.png')} style={s.icon}/>
          </div>
        <a style={s.githubLink} href='https://github.com/PBRT/timgur' target='_blank'>Check source code</a>
      </div>
    );
  }
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
    stack: {
      position: 'relative',
      marginTop: 30,
      maxWidth: 300,
      height: 350,
      margin: 'auto',
    },
    likeButton: {
      marginLeft: 15,
    },
    dislikeButton: {
      marginLeft: 15,
    },
    like: {
      pointerEvents: 'none',
    },
    dislike: {
      pointerEvents: 'none',
    },
    imageWrapper: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      border: '1px solid #f0f0f0',
      borderRadius: 5,
      cursor: 'pointer',
    },
    tag: {
      backgroundColor: UI.white,
      borderRadius: 5,
      padding: '10px',
      display: 'inline-block',
      border: '3px solid',
    },
    likeContainer: {
      color: UI.lightGreen,
      fontSize: 30,
      position: 'absolute',
      top: 55,
      textAlign: 'center',
      zIndex: 10,
      left: 20,
      opacity: 0,
      pointerEvents: 'none',
      WebkitTransform: 'rotate(-35deg)',
    },
    dislikeContainer: {
      color: UI.lightRed,
      fontSize: 30,
      position: 'absolute',
      top: 55,
      textAlign: 'center',
      zIndex: 10,
      right: 20,
      opacity: 0,
      pointerEvents: 'none',
      WebkitTransform: 'rotate(35deg)',
    },
    icon: {
      width: 30,
      margin: 20,
    },
    githubLink: {
      textAlign: 'center',
      color: UI.lightGrey,
      margin: '40px 0px 20px',
      display: 'block',
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
    tag: state.images.tag,
    sort: state.images.sort,
    isMobile: state.viewport.isMobile,
    routing: state.routing,
  };
}

export default connect(select)(ImagesSwiper);

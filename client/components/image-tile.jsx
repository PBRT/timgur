let s = getStyle();

let ImageTile = (props) => {

  const { image, redirect } = props;

  const Wrapper = (props) => redirect ?
    (<a href={image.link} target={'_blank'}>{props.children}</a>) :
    (<div>{props.children}</div>);

  const containerStyle = Object.assign({}, s.container,
    {boxShadow: props.isLast ? '0px 0px 4px 0px rgba(0,0,0,0.15)' : 'none'});

  return (
    <Wrapper>
      <div style={containerStyle}>
        <div style={s.overlay}></div>
        <img
          style={s.img}
          src={image['is_album'] ? `http://i.imgur.com/${image['cover']}.jpg` : image['link'] } />
        <div style={s.titleContainer}>
          <div style={s.title}>
            {image.title.length > 80 ? image.title.substring(0, 80) + '...' : image.title}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};


function getStyle() {
  return {
    container: {
      maxWidth: 300,
      width: 300,
      height: 341,
      margin: 'auto',
      position: 'relative',
      borderRadius: 3,
    },
    overlay: {
      height: 280,
      width: 300,
      position: 'absolute',
      top: 0,
      left: 0,
    },
    img: {
      width: '100%',
      maxWidth: 300,
      height: 280,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
    titleContainer: {
      marginTop: -4,
      borderTop: '1px solid #F0F0F0',
      backgroundColor: 'white',
      height: 40,
      display: 'flex',
      alignItems: 'center',
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
      padding: 10,
      textDecoration: 'none',
    },
    title: {
      flex: 1,
      overflow: 'hidden',
    },
  };
}
ImageTile.displayName = 'ImageTile';
ImageTile.propTypes = {
  image: React.PropTypes.object.isRequired,
  isLast: React.PropTypes.bool.isRequired,
  redirect: React.PropTypes.bool.isRequired,
};

export default ImageTile;

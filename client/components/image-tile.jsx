let s = getStyle();

let ImageTile = (props) => {

  const { image, redirect } = props;
  const containerStyle =
    Object.assign({}, s.container, {boxShadow: props.isLast ? '0px 0px 5px 0px rgba(0,0,0,0.2)' : 'none'});

  return (
    <a href={redirect ? image.link : '#'} target={redirect ? '_blank' : '_self'}>
      <div style={containerStyle}>
        <img
          style={s.img}
          src={image['is_album'] ? `http://i.imgur.com/${image['cover']}.jpg` : image['link'] } />
        <div style={s.titleContainer}>
          <div style={s.title}>
            {image.title.length > 80 ? image.title.substring(0, 80) + '...' : image.title}
          </div>
        </div>
      </div>
    </a>
  );
};


function getStyle() {
  return {
    container: {
      maxWidth: 300,
      height: 341,
      margin: 'auto',
      borderRadius: 3,
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)',
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

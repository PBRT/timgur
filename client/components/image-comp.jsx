let s = getStyle();

let ImageComp = (props) => {

  const { image } = props;
  const containerStyle =
    Object.assign({}, s.container, {boxShadow: props.isLast ? '0px 0px 5px 0px rgba(0,0,0,0.2)' : 'none'});

  return (
    <div style={containerStyle}>
      <img
        style={s.img}
        src={image['is_album'] ? `http://i.imgur.com/${image['cover']}.jpg` : image['link'] } />
      <div style={s.title}>
        <div style={{flex: 1}}>
          {image.title.length > 80 ? image.title.substring(0, 80) + '...' : image.title}
        </div>
      </div>
    </div>
  );
};


function getStyle() {
  return {
    container: {
      width: '100%',
      height: '100%',
      borderRadius: 3,
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)',
    },
    img: {
      width: '100%',
      height: 300,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
    title: {
      borderTop: '1px solid #F0F0F0',
      backgroundColor: 'white',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
      padding: 10,
    },
  };
}
ImageComp.displayName = 'ImageComp';


export default ImageComp;

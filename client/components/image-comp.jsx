let s = getStyle();

let ImageComp = (props) => {

  return (
    <div style={s.container}>
      <div>{props.image.title}</div>
      <span onClick={props.onLikeImage}> LIKE IMAGE</span>
      <img style={s.img} src={props.image['is_album'] ? `http://i.imgur.com/${props.image['cover']}.jpg` : props.image['link'] } />
      <span onClick={props.onDislikeImage}> DISLIKE IMAGE</span>
    </div>
  );
};


function getStyle() {
  return {
    container: {
      marginTop: 60,
      textAlign: 'center',
    },
    img: {
      width: 200,
      height: 300,
    },
    title: {
      fontSize: UI.fontXL,
      marginBottom: 20,
    },
  };
}
ImageComp.displayName = 'ImageComp';


export default ImageComp;

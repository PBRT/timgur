let s = getStyle();

let ImageComp = (props) => {

  return (
    <div style={s.container} onClick={props.onImageClick}>
      <div>{props.image.title}</div>
      <img src={props.image['is_album'] ? `http://i.imgur.com/${props.image['cover']}.jpg` : props.image['link'] } />
    </div>
  );
};


function getStyle() {
  return {
    container: {
      marginTop: 60,
      textAlign: 'center',
    },
    title: {
      fontSize: UI.fontXL,
      marginBottom: 20,
    },
  };
}
ImageComp.displayName = 'ImageComp';


export default ImageComp;

let s = getStyle();

let Home = () =>
  (<div style={s.container}>
    <div className='text-center title'>TIMGUR</div>
    <div className='text-center subtitle'>
      Tinder UI for IMGUR API
    </div>
    <div className='row no-padding' style={s.row}>
      Like or dislike
    </div>
  </div>);


function getStyle() {
  return {
    container: {
      marginTop: 40,
      textAlign: 'center',
    },
    row: {
      marginTop: 50,
    },
  };
}
Home.displayName = 'Home';

export default Home;

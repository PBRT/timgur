import { Link } from 'react-router';

let s = getStyle();

let Index = (props) =>
  (<div>
    <div style={s.container}>
      <div style={s.logo}><Link to='home'>Timgur</Link></div>
      <div style={s.links}>
        <div style={s.link}><Link to='likes'>Liked</Link></div>
      </div>
    </div>
    <div style={s.children}>{props.children}</div>
  </div>);


function getStyle() {
  return {
    container: {
      width: '100%',
      height: 60,
      backgroundColor: UI.lightWhite,
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
    },
    children: {
      marginTop: 100,
    },
    logo: {
      flex: 'initial',
      padding: 20,
      cursor: 'pointer',
    },
    links: {
      flex: 1,
      textAlign: 'right',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    link: {
      padding: 20,
      cursor: 'pointer',
      color: 'red',
    },
  };
}
Index.displayName = 'Index';

export default Index;

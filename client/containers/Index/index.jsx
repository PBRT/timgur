import { Link } from 'react-router';

let s = getStyle();

let Index = (props) =>
  (<div>
    <div style={s.container}>
      <div style={s.logoContainer}><Link to='home' style={s.logo}>Timgur</Link></div>
      <div style={s.links}>
        <div style={s.link}>
          <Link to='liked'>
            <img style={s.icon} src={require('./assets/like.png')} />
          </Link>
        </div>
      </div>
    </div>
    {props.children}
  </div>);


function getStyle() {
  return {
    container: {
      width: '100%',
      height: 60,
      backgroundColor: UI.lightBlue,
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      zIndex: 100,
      boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.3)',
    },
    logoContainer: {
      flex: 'initial',
      padding: 20,
      cursor: 'pointer',
    },
    logo: {
      color: UI.white,
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
    },
    icon: {
      width: 30,
    },
  };
}
Index.displayName = 'Index';
Index.propTypes = {
  children: React.PropTypes.object.isRequired,
};

export default Index;

let s = getStyle();

let Dropdown = (props) => {

  const { onChange, list, current } = props;

  return (
    <div style={s.container}>
      <select
        value={current}
        style={{color: 'white'}}
        onChange={(e) => onChange(e.target.value)}>
        {list.map((item, index) => (
          <option key={index} style={s.item}>
            {item}
          </option>
        ))}
      </select><span style={s.arrow}>&#x25BC;</span>
    </div>
  );
};

function getStyle() {
  return {
    container: {
      display: 'inline-block',
      position: 'relative',
      cursor: 'pointer',
      fontWeight: 'bold',
      padding: '7px',
      color: UI.white,
      backgroundColor: UI.lightBlue,
      borderRadius: 5,
    },
    list: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: UI.white,
    },
    item: {
      padding: 10,
      borderBottom: '1px solid',
    },
    arrow: {
      fontSize: 8,
      marginLeft: 5,
    },
  };
};

Dropdown.propTypes = {
  current: React.PropTypes.string,
  list: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
};

export default Dropdown;

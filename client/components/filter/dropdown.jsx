let s = getStyle();

let Dropdown = (props) => {

  const { onChange, list, current } = props;

  return (
    <div style={s.container}>
      <select
        value={current}
        style={s.select}
        onChange={(e) => onChange(e.target.value)}>
        {list.map((item, index) => (
          <option key={index} style={s.item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

function getStyle() {
  return {
    container: {
      display: 'inline-block',
      position: 'relative',
      fontWeight: 'bold',
      color: UI.white,
      backgroundColor: UI.lightBlue,
      borderRadius: 5,
    },
    select: {
      color: UI.white,
      backgroundImage: `url(${require('./assets/arrow.png')})`,
      backgroundSize: '10px 12px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 52,
      width: 70,
      padding: '7px 0px 7px 10px',
      cursor: 'pointer',
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

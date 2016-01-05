let s = getStyle();

let Dropdown = (props) => {

  const { onChange, list, current } = props;

  return (
    <div style={s.container}>
      <select
        value={current}
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          textDecoration: 'underline',
          width: `${props.current.length * 9}px`}}
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
  };
};

Dropdown.propTypes = {
  current: React.PropTypes.string,
  list: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
};

export default Dropdown;

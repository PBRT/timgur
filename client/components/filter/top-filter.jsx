import Dropdown from './dropdown.jsx';

let s = getStyle();
const tagList = ['cats', 'dogs'];
const sortList = ['viral', 'time', 'top'];

let TopFilter = (props) => {
  const { tag, sort, onTagChange, onSortChange } = props;

  return (
    <div style={s.container}>
      Show me&nbsp;
      <Dropdown list={tagList} current={tag} onChange={(tag) => onTagChange(tag)}/>
      &nbsp;sorted by&nbsp;
      <Dropdown list={sortList} current={sort} onChange={(sort) => onSortChange(sort)}/>
    </div>
  );
};

function getStyle() {
  return {
    container: {
      padding: '20px 0px',
      margin: '10px 0px',
      width: '100%',
      color: UI.lightBlue,
      fontWeight: 'bold',
      fontSize: 18,
    },
  };
};

TopFilter.propTypes = {
  onTagChange: React.PropTypes.func.isRequired,
  onSortChange: React.PropTypes.func.isRequired,
};

export default TopFilter;

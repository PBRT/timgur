import { path } from './path.js';

let Spinner = () => {
  return (
    <div style={{textAlign: 'center', margin: '60px 0px'}}>
      <svg width='100' height='95' viewBox='0 0 100 90'>
        <path
          transform='translate(5,2.5)'
          className='spinner-path'
          fill={UI.lightBlue}
          stroke={UI.lightBlue}
          strokeWidth='3'
          d={path}
          id='Shape'></path>
      </svg>
    </div>
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;

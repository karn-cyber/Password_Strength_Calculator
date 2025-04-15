import React from 'react';

const StrengthBarDesign = ({ strength }) => {
  let barStyle = {
    height: '15px',
    width: '0%',
    backgroundColor: '',
    borderRadius: '5px',
    transition: 'width 0.4s ease-in-out',
  };

  switch (strength) {
    case 'weak':
      barStyle.width = '25%';
      barStyle.backgroundColor = 'red';
      break;
    case 'medium':
      barStyle.width = '50%';
      barStyle.backgroundColor = '#FF8C00'; // dark orange
      break;
    case 'strong':
      barStyle.width = '75%';
      barStyle.backgroundColor = '#FFA500'; // orange
      break;
    case 'verystrong':
      barStyle.width = '100%';
      barStyle.backgroundColor = 'green';
      break;
    default:
      barStyle.width = '0%';
      barStyle.backgroundColor = 'transparent';
  }

  return (
    <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', marginTop: '10px' }}>
      <div style={barStyle}></div>
    </div>
  );
};

export default StrengthBarDesign;

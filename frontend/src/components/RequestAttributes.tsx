import { useState } from 'react';

function RequestAttributes({title, value}: {title: string, value: any}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  const barStyle = {
    backgroundColor: isHovered ? '#00E8FA' : '#A1F8FF',
    padding: '10px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    borderBottomLeftRadius: isVisible ? '0px' : '5px',
    borderBottomRightRadius: isVisible ? '0px' : '5px',
    color: '#003366',
    width: '400px',
  }

  const valueStyle = {
    display: isVisible ? 'block' : 'none',
    backgroundColor: '#515cae',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
    padding: '10px',
    color: '#C9FFA1',
    width: '400px',
  }

  const handleHoverChange = () => setIsHovered((val) => !val);
  const handleClick = () => setIsVisible((val) => !val);

  return (
    <div style={{paddingBottom: '10px'}}>
      <div
        style={barStyle}
        onMouseEnter={handleHoverChange}
        onMouseLeave={handleHoverChange}
        onClick={handleClick}
      >
        <p>{title}</p>
      </div>
      <div style={valueStyle}>
      <pre
        style={{
          backgroundColor: "#2e2e4f",
          color: "lime",
          padding: "1rem",
          borderRadius: "8px",
          overflow: "auto",
          fontFamily: "monospace",
          textAlign: 'left',
        }}
      >
        {value}
      </pre>
      </div>
    </div>
  )
}

export default RequestAttributes;
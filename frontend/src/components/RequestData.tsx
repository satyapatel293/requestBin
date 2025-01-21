import { RequestDataProps } from "../types";
import { useState } from 'react';

function RequestData({ path, headers, params, body }: RequestDataProps) {
  const [isHovered, setIsHovered] = useState(false);

  function isParams(params: string | null) {
    if (params) {
      return (
        <div>{params}</div>
      )
    }
  }

  const barStyle = {
    backgroundColor: isHovered ? '#00E8FA' : '#A1F8FF',
    padding: '10px',
    borderRadius: '5px',
    color: '#003366',
  }

  const handleHover = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <fieldset>
      <div style={barStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        <p>Route: {path}</p>
      </div>
      <div>
        <p>Headers: {JSON.stringify(headers)}</p>
      </div>

      {isParams(params)}

      <div>
        <p>Payload: {body}</p>
      </div>
    </fieldset>
  )
}

export default RequestData;
// remember we may get query params back from backend
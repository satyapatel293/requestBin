import { RequestDataProps } from "../types";
import { useState } from 'react';
import RequestAttributes from './RequestAttributes';

function RequestData({ path, headers, params, body }: RequestDataProps) {
  const [isHovered, setIsHovered] = useState(false);

  function isProvided(params: string | null, title: string) {
    if (params) {
      return (
        <RequestAttributes title={title} value={params}/>
      )
    }
  }

  const barStyle = {
    backgroundColor: isHovered ? '#00E8FA' : '#A1F8FF',
    padding: '10px',
    borderRadius: '5px',
    color: '#003366',
  }



  const handleHoverChange = () => setIsHovered((val) => !val);
  // const handleMouseLeave = () => setIsHovered(false);

  return (
    <div style={{display: 'inline-block'}}>
    {/* <fieldset> */}
      {/* <div style={barStyle}
        onMouseEnter={handleHoverChange}
        onMouseLeave={handleHoverChange}
      >
        <p>Route: {path}</p>
      </div> */}
      <RequestAttributes title="Route" value={path} />
      <RequestAttributes title="Headers" value={JSON.stringify(headers)} />

      {isProvided(params, 'Query Parameters')}
      {isProvided(body, 'Payload')}
    {/* </fieldset> */}
    </div>
  )
}

export default RequestData;
// remember we may get query params back from backend
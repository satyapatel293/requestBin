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
  

  let prettifiedJSON = JSON.stringify(headers, null, 2);
  return (
    <div style={{display: 'inline-block'}}>
      <RequestAttributes title="Route" value={path} />
      <RequestAttributes title="Headers" value={prettifiedJSON} />

      {isProvided(params, 'Query Parameters')}
      {isProvided(body, 'Payload')}
    </div>
  )
}

export default RequestData;
// remember we may get query params back from backend
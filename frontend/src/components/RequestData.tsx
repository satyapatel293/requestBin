import { CustomObject, RequestDataProps } from "../types";
import RequestAttributes from './RequestAttributes';

function RequestData({ path, headers, params, body }: RequestDataProps) {
  
  const prettify = (obj: CustomObject | string) => JSON.stringify(obj, null, 2).replace(/\"/g, '');

  function isProvided(value: CustomObject, title: string) {
    if (Object.values(value).length > 0) {
      return (
        <RequestAttributes title={title} value={prettify(value)}/>
      )
    }
  }


  return (
    <div style={{display: 'inline-block'}}>
      <RequestAttributes title="Route" value={prettify(path)} />
      <RequestAttributes title="Headers" value={prettify(headers)} />

      {isProvided(params, 'Query Parameters')}
      {isProvided(body, 'Payload')}
    </div>
  )
}

export default RequestData;
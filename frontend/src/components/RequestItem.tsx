import { RequestProps } from "../types";

import RequestData from "./RequestData";

function RequestItem({ request }: RequestProps) {

  return (
    // <div>
    //   <p>{request.path}</p>
    // </div>
    // <MethodAndDate method={request.method} date={request.time}/>
    <RequestData path={request.path} headers={request.headers} params={request.params} body={request.body} />
  )
}

export default RequestItem;
import { RequestProps } from "../types";
import RequestData from "./RequestData";
import DateAndTime from "./DateAndTime";

function RequestItem({ request }: RequestProps) {

  const itemStyle = {
    borderBottom: '1px solid gray',
    paddingTop: '5px',
    // position: 'relative',
  } 

  return (
    // <div>
    //   <p>{request.path}</p>
    // </div>
    // <MethodAndDate method={request.method} date={request.time}/>
    <>
      <div>
        <div style={itemStyle}>
        <DateAndTime method={request.method} time={456123489} />
        <RequestData path={request.path} headers={request.headers} params={request.params} body={request.body} />
        </div>
      </div>
    </>
    )
}

export default RequestItem;
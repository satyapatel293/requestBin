import { RequestProps, Styles } from "../types";
import RequestData from "./RequestData";
import DateAndTime from "./DateAndTime";
import copyBtn from '../assets/copy icon.png';

function RequestItem({ request }: RequestProps) {

  const itemStyle = {
    borderBottom: '3px solid darkgray',
    paddingTop: '5px',
    // position: 'relative',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

  const imageStyle: Styles = {
    position: 'absolute',
    top: 2,
    left: 2,
  }

  return (
    <>
      <div>
        <div style={itemStyle}>
        <DateAndTime method={request.method} time={request.created_at} />
        <RequestData path={request.path} headers={request.headers} params={request.query_params} body={request.body} />
        <div style={{display: 'inline-block'}}>
          <button
            className="utility"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(request, null, 2))}
            >
            <img style={imageStyle} src={copyBtn} alt="copy button" width="40" ></img>
          </button>
        </div>
        </div>
      </div>
    </>
    )
}

export default RequestItem;
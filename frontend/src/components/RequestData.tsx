import { RequestDataProps } from "../types"

function RequestData({ path, headers, params, body }: RequestDataProps) {


  function isParams(params: string | null) {
    if (params) {
      return (
        <div>{params}</div>
      )
    }
  }

  return (
    <div>
      <div>
        <p>Route: {path}</p>
      </div>
      <div>
        <p>Headers: {JSON.stringify(headers)}</p>
      </div>

      {isParams(params)}

      <div>
        <p>Payload: {body}</p>
      </div>
    </div>
  )
}

export default RequestData;
// remember we may get query params back from backend
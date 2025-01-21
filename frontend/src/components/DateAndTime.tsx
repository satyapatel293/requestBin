

function DateAndTime({method, time}: {method: string, time: number}) {
  const style = {
    display: 'inline-block',
    // position: 'absolute',
    // top: 0,
  }
  
  return (
    <div style={style}>
      <ul style={{listStyle: 'none'}}>
        <li>[{method}]</li>
        <li>{time}</li>
      </ul>
    </div>
  )
}

export default DateAndTime;
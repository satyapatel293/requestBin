

function DateAndTime({method, time}: {method: string, time: string}) {
  const style = {
    display: 'inline-block',
    // position: 'absolute',
    // top: 0,
  }

  const formatDate = () => {
    let date = time.match(/\d{4}-\d{2}-\d{2}/);
    return date!.join('')
  }
  const formatTime = () => {
    
    let newTime = time.match(/\d{2}:\d{2}/) as RegExpMatchArray | null | string;
    let isPm = false;
    // console.log('The date is:', date);
    console.log('The time is:', newTime);
    if (newTime) {
      let temp: Array<string | number> = newTime[0].split(':').map(Number);
      if (typeof temp[0] === 'number' && temp[0] > 12) {
        temp[0] -= 12;
        isPm = true;
      }

      temp = temp.map(String).map(val => val.padStart(2, '0'));
      newTime = temp.join(':');
    }

    return `${newTime}${isPm ? 'pm' : 'am'}`
  }

  formatTime();

  return (
    <div style={style}>
      <ul style={{listStyle: 'none'}}>
        <li>[{method}]</li>
        <li>{formatDate()}</li>
        <li>{formatTime()}</li>
      </ul>
    </div>
  )
}

export default DateAndTime;
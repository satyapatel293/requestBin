import { HeaderProps, Styles } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import trashCan from '../assets/trash.png';
import services from '../services/basketService'

const topStyle = {
  color: '#5A2D0C',
  backgroundColor: "#FFF4E1",
  margin: 0,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
}

const headerStyle = {
  display: 'inline',
}

const trashStyle: Styles = {
  position: 'absolute',
  top: 0,
  left: -2,
}

const baseUrl = 'http://localhost:5173/web';

function Header({ pageTitle }: HeaderProps) {

  const navigate = useNavigate();

  const deleteBasket = async () => {
    console.log('hellohellohellohellohellohello');
    try {
      const result = await services.deleteBasket(pageTitle);
      console.log(result);
      navigate('/web/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Something went wront', err.message);
      } else {
        console.error('Boo');
      }
    }
  }

  const headerDesign = () => {
    if (pageTitle === 'Basket Case') {
      return (
        <div style={topStyle}>
          <h2 >Basket: {pageTitle}</h2>
        </div>
      )
    } else {
      return (
        <div style={topStyle}>
          <Link to={baseUrl}>Home</Link>
          <h2 style={headerStyle}>
            {pageTitle}
          </h2>
          <div>
            <button
              className="utility"
              onClick={deleteBasket}>
              <img src={trashCan} style={trashStyle} width='35px'></img>
            </button>
          </div>
        </div>
      )
    }
  }

  return (headerDesign())
}

export default Header;
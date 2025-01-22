import { HeaderProps } from '../types'

function Header({ pageTitle }: HeaderProps) {

  const headerStyle = {
    color: '#5A2D0C',
    backgroundColor: "#FFF4E1",
    margin: 0,
  }

  return (
    <>
    <h2 style={headerStyle}>{pageTitle}</h2>
    </>
  )
}

export default Header;
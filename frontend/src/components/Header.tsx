import { HeaderProps } from '../types'

function Header({ pageTitle }: HeaderProps) {


  return (
    <>
    <h2 style={{color: '#5A2D0C'}}>{pageTitle}</h2>
    </>
  )
}

export default Header;
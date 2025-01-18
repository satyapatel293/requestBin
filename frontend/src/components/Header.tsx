import { HeaderProps } from '../types'

function Header({ pageTitle }: HeaderProps) {


  return (
    <>
    <h2>{pageTitle}</h2>
    </>
  )
}

export default Header;
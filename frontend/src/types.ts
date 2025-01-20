export interface Header {
  [key: string]: string;
}

export interface Request {
  time: number;
  path: string;
  requestMethod: string;
  headers: Header;
  body: string;
}

export interface HeaderProps {
  pageTitle: string;
}

export interface Basket {
  basket_name: string;
}
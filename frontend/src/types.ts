export interface Header {
  [key: string]: string;
}

export interface Request {
  id: string; // added
  basket_id: string; // added
  time: number;
  path: string;
  requestMethod: string;
  params: string | null;
  headers: Header;
  body: string;
}

export interface HeaderProps {
  pageTitle: string;
}

export interface Basket {
  basket_name: string;
}

export interface RequestProps {
  request: Request;
}

export interface RequestDataProps {
  path: string;
  headers: Headers;
  params: string | null;
  body: string; // placeholder (might come back as json);
}

export interface Headers {
  [key: string]: string;
}
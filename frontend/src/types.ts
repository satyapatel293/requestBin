export interface Request {
  id: string; // added
  basket_id: string; // added
  created_at: string;
  path: string;
  method: string;
  query_params: CustomObject;
  headers: CustomObject;
  body: CustomObject;
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
  headers: CustomObject;
  params: CustomObject;
  body: CustomObject; // placeholder (might come back as json);
}

export interface CustomObject {
  [key: string]: string;
}

export interface Styles {
  [key: string]: string | number;
}

export interface BasketPageProps {
  id: string | null | undefined;
}


// potentially change Header types to CustomObject in other places
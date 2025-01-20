import express from 'express';
import { connectDB } from '../postgreSQL/sql_connection';
import sqlService from '../postgreSQL/queries';
import { NewRequest } from '../types';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  if (err instanceof Error) {
    throw new Error('Error connecting to postgreSQL');
  } else {
    throw new Error('Error');
  }
});

const PORT = 3000;


//THIS WILL CHANGE JUST A STAND IN FOR GENERATING UNIQUE URLS
const generateId = () => {
  const uuid = uuidv4();
  return uuid.slice(0,10);
};

app.get('/api/baskets', async (_req, res) => {
  try {
    const results = await sqlService.getAllBaskets(); 
    res.json(results);  
  } catch (err) {
    console.error(err); 
    res.status(500).send('An error occurred fetching all the baskets');  
  }
});

app.get('/api/baskets/:id', async (_req, res) => {
  try {
    const results = await sqlService.getSingleBasketRequests(_req.params.id); 
    /*

    Here we also need to quert mongo and get all the requests with matching uuids and parce them together
    and we need to return them all parced the way the frontend needs them
    */
 
    res.json(results);  
  } catch (err) {
    console.error(err); 
    res.status(500).send('An error occurred fetching a single basket');  
  }
});

app.post('/api/baskets', async (_req, res) => {
  try {
    const results = await sqlService.addNewBasket(String(generateId())); 
    console.log(results);
  } catch (err) {
    console.error(err); 
    res.status(500).send('An error occurred deleting a basket with requests');  
  }
});

app.delete('/api/baskets/:id', async (_req, res) => {
  try {
    const results = await sqlService.deleteBasket(_req.params.id);
    //delete bodies from mongo 
    console.log(results);
  } catch (err) {
    console.error(err); 
    res.status(500).send('An error occurred deleting a basket with requests');  
  }
});


app.all('/basket/:basket_name', async (req, res) => {
  try {
    const currentBasketName = req.params.basket_name;
    const results = await sqlService.getAllBaskets();
    if (results.map(obj => obj.basket_name).includes(currentBasketName)) {
      const requestObj: NewRequest = {
        id: generateId(),
        basket_id: currentBasketName,
        method: req.method,
        path: req.path,
        headers:  JSON.stringify(req.headers),
        time: Date.now().toString()
      };

      res.json(requestObj);
      await sqlService.addRequest(requestObj);
      //parse the request and insert parts into mongo and parts into sql       
    } else {  
      console.log('BAD request to get url');
      res.status(404).send('No basket with that name was found!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error getting url');
  }
});


/*
app.all('/bin/:someUniquePath') //catch all 

ok so this is going to catch all incoming requests 
we are going to use :someUniquePath to check if that exists 


if it does exist we are going to create a UUID for that request
we are going to add it to the requests SQL table with the new uuid and basketname(:someUniquePath)
we are going to add it to the requests MONGO table with the new uuid and basketname(:someUniquePath)

we dont need to return anything valuable
we configure nginx to look for /api and /bin to send to backend 

*/





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
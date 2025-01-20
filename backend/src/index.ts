import express from 'express';
import { connectDB } from '../postgreSQL/sql_connection';
import { getAllBaskets, getSingleBasketRequests, deleteBasket, addNewBasket} from '../postgreSQL/queries';
import cors from 'cors';
const app = express();
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
const randomURLGenerator = () => {
  let count = 1234567890;
  return () => count++;
};
const newCounter = randomURLGenerator();
/////


app.get('/api/baskets', async (_req, res) => {
  try {
    const results = await getAllBaskets(); 
    res.json(results);  
  } catch (err) {
    console.error(err); 
    res.status(500).send('An error occurred fetching all the baskets');  
  }
});

app.get('/api/baskets/:id', async (_req, res) => {
  try {
    const results = await getSingleBasketRequests(_req.params.id); 
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
    const results = await addNewBasket(String(newCounter())); 
    console.log(results);
  } catch (err) {
    console.error(err); 
    res.status(500).send('An error occurred deleting a basket with requests');  
  }
});

app.delete('/api/baskets/:id', async (_req, res) => {
  try {
    const results = await deleteBasket(_req.params.id); 
    console.log(results);
  } catch (err) {
    console.error(err); 
    res.status(500).send('An error occurred deleting a basket with requests');  
  }
});


app.all('/basket/:uniqueURL', async (req, res) => {
  try {
    const url = req.params.uniqueURL;
    const results = await getAllBaskets();
    if (results.map(obj => obj.basket_name).includes(url)) {
      res.json(req.method);

      //create a UUID for the request 
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
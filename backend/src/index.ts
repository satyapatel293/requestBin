import express from 'express';
import { connectDB } from '../postgreSQL/sql_connection';
import sqlService from '../postgreSQL/queries';
import mongoService from '../mongoDB/models/basket';
import { Headers, NewRequest, Body } from '../types';
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
    const results = await sqlService.getBasketRequests(_req.params.id); 
    const id = _req.params.id;
    const bodies =   await mongoService.find({ basket_id: id})
    .then(request => {
      return request as Body[];
    }).catch((error) => {
      if (error instanceof Error) {
        console.log("Error seeding data:", error.message);
      } else {
        console.log("some error");
      }
    });


    const finalResult: { body: string; id: string | number; basket_id: string; path: string; method: string; headers: Headers; }[] = [];

    results.forEach(result => {
      let current;
      if (bodies) {
         current = bodies.find(body => body.request_id === result.id);
      }
      if (current) {
        finalResult.push({...result, body: current.body});
      }
    });

    res.json(finalResult);  
  } catch (err) {
    console.error(err); 
    res.status(500).send('An error occurred fetching a single basket');  
  }
});

app.post('/api/baskets', async (_req, res) => {
  try {
    let newBasket = generateId();
    const names = await sqlService.getAllBaskets();

    while (names.map(obj => obj.basket_name).includes(newBasket)) {
      newBasket = generateId();
    }

    const results = await sqlService.addNewBasket(newBasket); 
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
      let requestId = generateId();
      const ids = await sqlService.getAllRequestIds();
  
      while (ids.map(obj => obj.id).includes(requestId)) {
        requestId = generateId();
      }

      const requestBody = new mongoService( {
        request_id: requestId,
        basket_id: currentBasketName,
        body: JSON.stringify(req.body),
      });

      await requestBody.save();

      const requestObj: NewRequest = {
        id: requestId,
        basket_id: currentBasketName,
        method: req.method,
        path: req.path,
        headers:  JSON.stringify(req.headers),
        time: Date.now().toString()
      };

      await sqlService.addRequest(requestObj);
      console.log('posted request to db');
      res.status(200);
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
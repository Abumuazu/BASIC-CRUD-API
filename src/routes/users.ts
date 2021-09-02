var express = require('express');
var router = express.Router();
const fs = require('fs');
const apps = require('../app');
let database:any;
if (fs.existsSync("/Users/e/Desktop/week-6-node-008-Abumuazu/lib/database.json")){
  database = fs.readFile("/Users/e/Desktop/week-6-node-008-Abumuazu/lib/database.json", (err:any, data:any) => {
          if(err){
            throw err
          }else {
            database =JSON.parse(data)
          }
  })
}else {
  database =[]
}

 interface users {
  organization: string
  createdAt: string
  updatedAt: string
  products: string[]
  marketValue: string
  address: string
  ceo: string
 country: string
  id:number
  noOfEmployees:number
  employees:string[]
 }

/* GET users listing. */

router.get('/', async function(req:any, res:any, next:any) {

  res.status(200).send(database);
});

// GET a single user listing
router.get('/:id', function (req:any, res:any, next:any) {
  const {id} = req.params
 const findUser:users = database.filter((x:users) => x.id === +(id)[0]);
  (!findUser)
? res.status(404).send("not found")
: res.send(findUser)
})

// POSTING data to the database
router.post('/', function(req:any, res:any, next:any) {
  const { organization,
          products,
          marketValue, 
          address, 
          ceo,
          country, 
          noOfEmployees,
          employees}    =    req.body
// assigning a new id
let id =  (database.length >0)
?         database[database.length - 1].id + 1
:         1
    
const newlyPosted = {
  organization: organization || "",
  createdAt: new Date().toString(),
  updatedAt: new Date().toString,
  products: products || [],
  marketValue: marketValue || "",
  address: address || "",
  ceo: ceo || "",
  country: country || "",
  id: id ||  1,
  noOfEmployees : noOfEmployees || 0,
  employees: employees || [],
}
database.push(newlyPosted)

try{
  fs.writeFile("/Users/e/Desktop/week-6-node-008-Abumuazu/lib/database.json", JSON.stringify(database, null, 2), (err:any) => {
    if(err)throw err
    console.log("data succefully written to file ")
  })
}catch (error) {
  console.error("error")
}
res.status(200).send(` ${organization} organization  with the id: ${id} has been added to the database `)
})

module.exports = router;
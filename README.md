# buckshee-endpont-auth

## there are two function implemeted in this end-point and it can be tested on localhost 
- yarn start
- open brower using this url : http://localhost:4004/graphql

## End point function for 
- Create user
- Login user

### Mutation 
```
mutation {
  createUser(
    name: "tharjaa",
    email: "test@gmail.com",
    password: "dssssdfdd"
  ) {
    _id
    name
    email
  }
}
```
 
 ### result : 
```
{
  "data": {
    "createUser": {
      "_id": "5ec62799751c5564c7966995",
      "name": "tharjaa",
      "email": "ddfdssdfqaaa@sds0.com"
    }
  }
}
```

### query
```
{
  login(email:"ddfdssdfqaa@sds0.com",password:"dssssdfdd"){
    token
    userId
  }
}
```

### result :
```
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWM1ZjMzNGYzOTdkODUyNjAwMWVkMmYiLCJlbWFpbCI6ImRkZmRzc2RmcWFhQHNkczAuY29tIiwiaWF0IjoxNTkwMDQyNzUxLCJleHAiOjE1OTAwNDYzNTF9.fjnNnCev3loejL6nzTpXOcVxo6vzFFHrUFBAJ4utwhs",
      "userId": "5ec5f334f397d8526001ed2f"
    }
  }
}
```


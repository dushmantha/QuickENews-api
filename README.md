# buckshee-endpont-auth

## there are two function implemeted in this end-point and it can be tested on localhost 
- yarn start
- open brower using this url : http://localhost:4004/graphql

## End point function for 
- Create user

### Mutation 
```
mutation {
  createUser(
    name: "tharjaa"
    email: "tdmihirand@gmail.com"
    password: "dssssdfdaaqd"
  ) {
    succeed
    accessToken
  }
}

```

### query
```
{
  newsList(category:"entertainment") {
   succeed
    list{
      title
      description
      url
      publishedAt
      authorName
    }
  }
}
```


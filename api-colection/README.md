# Device-Gateway-Manager (postman use)

## Collection

![image](/api-colection/imgs/api_enpoints.png)

<br>

## Endpoints

Specific endpoints:
- `Signup a user`: before use the API for first time, its required signup a user, creating a doc in the DB collection.

![image](/api-colection/imgs/signup_user.png)

-  `api/login`: after have basic credentials, and before user any endpoint, its required to login and get `Bearer` token.

![image](/api-colection/imgs/user_login.png)


- In this point the use of any enpoints its similar to this one using the `accessToken` provided in the login action:
  
![image](/api-colection/imgs/endpoint_example.png)

# Ecom-express

An E-Commerce Website Made With Html ,Css,Java Script , Node.Js,MongoDb.
I added a little bit of bootstrap in it to enhance this website .
In this website, user can enjoy dynamic things such as adding products to cart and
login as well as Register as a New User. Further, i am creating a admin panel with CRUD
operations.
![](/static/images/main.jpg)

# Docs

In this page

- [Signup](#signup)
- [Login](#login)
- [Contact Us](#Contact Us)
<!-- -   [Update calling status of users](#update-calling-status) -->

## HTTP status codes used in this API

| Status code | Description           |
| :---------- | :-------------------- |
| `200`       | OK                    |
| `201`       | Created               |
| `400`       | Bad Request           |
| `401`       | Unauthorized          |
| `409`       | Conflict              |
| `500`       | Internal Server Error |

<!-- **⚠️ Api key must be there in `x-api-key` header in every request.**

_invalid api key response_

```json
{
	"success": false,
	"message": "Invalid API key",
	"data": {}
}
``` -->

## Auth

### Signup

```http
POST: /register
```

**Body:**

```json
{
  "fname": "Sahib",
  "lname": "preet",
  "email": "testing123@gmail.com",
  "phone": 987654321,
  "password": "lol",
  "cpassword": "lol"
}
```

**Response:**

| status code | message                                    | reason                              |
| :---------- | :----------------------------------------- | :---------------------------------- |
| `201`       | User created successfully                  | request was successful              |
| `400`       | Please fill in all fields                  | any filed in body is missing        |
| `400`       | Password and Confirm Password do not match | password and cpassword are not same |
| `409 `      | Email or phone already exists              | User already exists in Data Base    |
| `500 `      | Internal server error                      | Internal server error               |

_User created successfully `201`:_

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "fname": "Sahib",
    "lname": "Preet",
    "email": "testing123@gmail.com",
    "phone": 98765431,
    "password": "$2b$10$q0Hlqu6PE8GMDDkqHRmBgOTNc8.AKpI9gMF8TdNkooX/q3x16CQdq",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZWVlYTA2OTQ2OGYxMmMwNzhhYSIsImlhdCI6MTY0MDI1OTMxMH0.wrLOMeEzUDunR5ladDrggHnSrQvcuzjxYnSiNXAk3kM"
}
```

### Login

```http
POST: /login
```

**Body:**

```json
{
  "email": "testing123@gmail.com",
  "password": "something"
}
```

**Response:**

| status code | message                     | reason                       |
| :---------- | :-------------------------- | :--------------------------- |
| `200`       | User logged in successfully | request was successful       |
| `400`       | Please fill in all fields   | any filed in body is missing |
| `401`       | Incorrect Password          | Incorrect Password           |
| `404 `      | User not found              | User has not signed up yet   |
| `500 `      | Internal server error       | Internal server error        |

_User logged in successfully `200`:_

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "fname": "Sahib",
    "lname": "preet",
    "email": "testing123@gmail.com",
    "phone": 98765431,
    "password": "$2b$10$q0Hlqu6PE8GMDDkqHRmBgOTNc8.AKpI9gMF8TdNkooX/q3x16CQdq",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZWVlYTA2OTQ2OGYxMmMwNzhhYSIsImlhdCI6MTY0MDI2MDg2MH0.-0N2tYca6cnU-_tY_-wDwYX2iVTmkf-3_dsgY3lLDb4"
}
```

## Users

### Contact Us

```http
GET: /contact
```

**Response:**

| status code | message                      | reason                 |
| :---------- | :--------------------------- | :--------------------- |
| `200`       | Users retrieved successfully | request was successful |
| `500 `      | Internal server error        | Internal server error  |

_Users retrieved successfully `200`_

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "61cc6543b370fa8fd782b5dd",
      "name": "sahib",
      "email": "testing123@gmail.com",
      "phone": 987654321,
      "message": "This is for testing",
      "__v": 0
    }
  ]
}
```

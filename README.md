# Concurrent and Distributed Programming

## Homework 1 (Quadratic equation)

```c
equation: ax^2+bx+c=0
Delta = b^2 - 4ac.

if(Delta > 0 ){
    x1 = (-b+sqrt(Delta))/2a
    x2 = (-b-sqrt(Delta))/2a
}
else if(Delta == 0){
    x1 = x2 = -b/2a
}
else{
Delta < 0 => "Equation are no real roots"
}
```

## Homework 2 (Node REST service)

- Database: Mongo (mLab)
  - Node pakage: Mongoose
- REST Client: Postman

### H2 Description

- Table(Collection): vehicles

- Routers
  - /vehicles
    - GET: get all collection(with query)
    - POST: post collection of vehicles
    - DELETE: delete collection(with query)
  - /vehicles/generate
    - GET: delete all elements and generate 20 elements
  - vehicle
    - POST: create new vehicle
  - vehicle/:id
    - GET: get vehicle by id
    - PUT: update vehicle by id
    - DELETE: delete vehicle by id

## Homework 3 (Distributed applications using Google Cloud)

### H3 Description

Create an application that use Google Cloud ecosystem. Requirements - the application is using at least three GAE services (one is Statefull) and is located in appspot.com domain.

#### Prerequisites

- A Google Cloud Platform Account and Google Cloud Project
- Node.js
- npm
- Docker
- gcloud

#### Used Services

- Google Cloud Platform
- Google App Engine
- Google Cloud Build
- Firebase
  - Authentication
  - Database
  - Storage

#### Deployed Project

- <https://yum-yum-app.appspot.com/>

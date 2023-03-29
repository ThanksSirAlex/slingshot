### simulation
I spend too much time on nodejs, express and mongoose. So I found that I didn't have enough time to implement the simulation. But I left some TODO which show the idea on how I'm going to implement it.

### websocket
The code of web socket is in `backend/bin/start:41`, path of the websocket url is `ws://localhost:3000/ws`, it implement features as follow:
1. if client send `miners`, it will return all miners.
2. if client send `planets`, it will return all planets.
3. if client send `asteroids`, it will return all asteroids.
4. otherwise it will just return `pong`.

### http
The code of http apis are at `backend/routes`, and business logics are in controllers that required in routes.
The APIs I build are as follow:

##### miners
1. GET `http://localhost:3000/miners`, query_params: planet_id
2. GET `http://localhost:3000/miners/{id}`
3. GET `http://localhost:3000/miners/{id}/histories`
3. PUT `http://localhost:3000/miners/{id}`
4. DELETE `http://localhost:3000/miners/{id}`
5. POST `http://localhost:3000/miners`

##### planets
1. GET `http://localhost:3000/planets`
2. GET `http://localhost:3000/planets/:id`
2. POST `http://localhost:3000/planets`

##### asteroids
1. GET `http://localhost:3000/asteroids`
2. GET `http://localhost:3000/asteroids/:id`
2. POST `http://localhost:3000/asteroids`

### How to run
prepare:
1. a local mongodb, default uri is `mongodb://localhost:27017`, but you can change it by setting env MONGO_URI

```
cd backend
yarn
yarn start
```

the start scripts will generate some data automatically



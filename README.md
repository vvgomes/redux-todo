# Redux Todo ✔

This is a Javascript todo app developed with [Redux](http://redux.js.org/). It exposes a HTTP API but not a front-end. The goal of this project is to demonstrate the usage of Redux in the context of a backend app. 

## Running

1. Ensure [Node.js](https://nodejs.org) is installed (v6.0.0 should work);
2. `$ npm install`
3. `$ npm start`

## API

### Add a new todo item

Request:

```bash
$ curl localhost:3000/api/actions -X POST \
  --data '{"type": "addTodo", "text": "wash dishes"}' \
  -H 'Content-Type:application/json'
```

Response:

```json
{
  "type": "addTodo",
  "text": "wash dishes"
}
```

### Toggle a todo

Request:

```bash
$ curl localhost:3000/api/actions -X POST \
  --data '{"type": "toggleTodo", "id": "cf373798-efbc-4219-8fb3-e10d4c505a0b"}' \
  -H 'Content-Type:application/json'
```

Response:

```json
{
  "type": "toggleTodo",
  "id": "c5cdc877-19da-48eb-99f3-983cde01379f"
}
```

### See the todo list

Request:

```bash
$ curl localhost:3000/api/state
```

Response:

```json
{
  "todos": [
    {
      "id": "c5cdc877-19da-48eb-99f3-983cde01379f",
      "text": "wash dishes",
      "completed": true,
      "timestamp": "2016-09-08T01:47:00.490+0000"
    }
  ]
}
```

The `/actions` end-point accepts **actions** identified by the `type` property. (This is a convention from the Redux [documentation](http://redux.js.org/). As a result of a successful action request, the action itself is responded to the client and the data store of the app is transformed by the appropriated action handler. As the samples above show, there are two types of **action** in the app: `addTodo` and `toggleTodo`. Those actions serve as representations of changes the users want to make to the underlying data store.

### Error Handling

In order to perform action validations and error handling, we've used the [redux-thunk](https://github.com/gaearon/redux-thunk) middleware. It allows us to run validations before dispatching the actual action to the Redux store.

Additionally, we've also used the [data.validation](https://github.com/folktale/data.validation) module from [Folktale](http://folktalejs.org/). That provides us with a Validation container to achieve [functional validation style](http://robotlolita.me/2013/12/08/a-monad-in-practicality-first-class-failures.html). 

When something goes wrong after posting a new action, the API returns errors and do not cause a action to be dispatched.

```bash
$ curl localhost:3000/api/actions -X POST \
  --data '{"type": "addTodo" }' \
  -H 'Content-Type:application/json'
```

```json
[
  "Todo must have a text description."
]
```

## Client App

You can serve the [React Redux Todo](https://github.com/vvgomes/react-redux-todo) app using [Webpack](https://webpack.github.io/) dev server. Just point to `localhost:3000/` and the server side will proxy requests to Webpack.

## License

Feel free to use this code as you please.


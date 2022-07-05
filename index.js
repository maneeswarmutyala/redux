const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreator = redux.bindActionCreators;
const applyMiddleware = redux.applyMiddleware;
const logger = require("redux-logger");
const log = logger.createLogger();
const CAKE_ORDERED = "CAKE_ORDERED";
const RESTOCK_CAKE = "RESTOCK_CAKE";

function orderCaked() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}
function addNewCake(qty = 1) {
  return {
    type: RESTOCK_CAKE,
    payload: qty,
  };
}
const initialstate = {
  numOfCakes: 10,
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case RESTOCK_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};
const store = createStore(reducer, applyMiddleware(log));
console.log(store.getState());

const unsub = store.subscribe(() => {});

const actions = bindActionCreator(
  {
    orderCaked,
    addNewCake,
  },
  store.dispatch
);
actions.orderCaked();
actions.orderCaked();
actions.orderCaked();
actions.addNewCake(1);
actions.addNewCake(4);
actions.orderCaked();

store.dispatch(orderCaked()); //using action creator - best
store.dispatch(orderCaked());
store.dispatch(addNewCake(1));
store.dispatch(addNewCake(4));
store.dispatch(orderCaked());
store.dispatch(orderCaked());
store.dispatch(orderCaked());

store.dispatch({
  type: CAKE_ORDERED,
}); // using action

unsub();

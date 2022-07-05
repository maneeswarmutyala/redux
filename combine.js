const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreator = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const CAKE_ORDERED = "CAKE_ORDERED";
const RESTOCK_CAKE = "RESTOCK_CAKE";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const RESTOCK_ICECREAM = "RESTOCK_ICECREAM";

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
function orderIceCream() {
  return {
    type: ICECREAM_ORDERED,
    payload: 1,
  };
}
function addNewIceCream(qty = 1) {
  return {
    type: RESTOCK_ICECREAM,
    payload: qty,
  };
}
const initialCakestate = {
  numOfCakes: 10,
};
const initialIceCreamstate = {
  numOficeCreams: 10,
};
const iceCreamReducer = (state = initialIceCreamstate, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOficeCreams: state.numOficeCreams - 1,
      };
    case RESTOCK_ICECREAM:
      return {
        ...state,
        numOficeCreams: state.numOficeCreams + action.payload,
      };
    default:
      return state;
  }
};
const cakeReducer = (state = initialCakestate, action) => {
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
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer);
console.log(store.getState());

const unsub = store.subscribe(() => {
  console.log("updated state", store.getState());
});

const actions = bindActionCreator(
  {
    orderCaked,
    addNewCake,
    orderIceCream,
    addNewIceCream,
  },
  store.dispatch
);
actions.orderCaked();
actions.orderCaked();
actions.orderCaked();
actions.addNewCake(1);
actions.addNewCake(4);
actions.orderCaked();
actions.orderIceCream();
actions.orderIceCream();
actions.addNewIceCream(5);

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

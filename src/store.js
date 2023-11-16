//create a store with middleware and Redux devTools Extenesion
//devTool extension that we have on Chrome
// the create sture is imported from redux but i alisaed as   legacy_createStor
// because Dedux has changed the way that createstore is used in newer verions
import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
  } from "redux";
  // thunk is a middleware.
  // This middleware allows you to write action creators that return functions instead of plain objects,
  // so you can perform asynchronous operations before dispatching the final action.
  import thunk from "redux-thunk";
  import rootReducer from "./reducer";
  //the initialState is argument that sets the initial state of the Redux store.
  const initialState = {};
  // the
  const middleware = [thunk];
  
  let store;
  
  if (window.navigator.userAgent.includes("Chrome")) {
    // createStore with the rootReducer, initialState, and enhancer as arguments
    // usual in enhancer he have middleware, but to able to work with multiple midleware we use compose,
    //we will compose our state by passing the applymidleware and the pass an array of middleware as parameter
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(...middleware)
      )
    );
  } else {
    // same thing only without the part for our extensions
    // we remove this part since if we are working without chrome then this part will be null
    // to avoid that we set our store for others browsers as well
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware))
    );
  }
  //the store variable is exported as the default export of the module, so it can be imported in other files
  export default store;
  
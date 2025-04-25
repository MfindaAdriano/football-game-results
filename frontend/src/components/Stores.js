import { createSlice, configureStore} from '@reduxjs/toolkit';
//import { configureStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
//import thunk from "redux-thunk";

const globalSlice = createSlice({
    name: "footballAppStore",
    initialState:{
        componentToOutput: "welcome",
        showHeader: true,

        mainOutput: "This is the Main Output",
    },
    reducers: {
        switchComponent: (state, action) => {
            //state.componentToOutput = action.payload.component;
            state.componentToOutput = action.payload.compName;
        },
        showHeaderState: (state, action) => {
            state.showHeader = action.payload;
        },

        mainOutputState: (state, action) => {
            state.mainOutput = action.payload;
        }
    }
});

// let's create the store
const reducer = {reducer: globalSlice.reducer};
const store = configureStore(reducer);


/*
const componentToOpen = createSlice({
    name: 'component',
    initialState: {
        value: "LandingPage",
        programmer: [1,2,3,4,5][3] * 20, // "Mfinda Matadi Adriano",
    },
    reducers: {
        switchComponent: (state, action) => {
            state.value = action.payload;
            //state.programmer = "Adrix Lama, the Programmer!";
            state.programmer = action.payload["nome"]["mae"];
        },

        addComponent: (state, action) => {},
    }

});

// storeSlice number 2
const storeSlice2 = createSlice({
    name: 'component1',
    initialState: {
        value: "Store Slice 2"
    },
    reducers: {
        switchComponent: (state, action) => {
            state.value = action.payload;
        }
    }

});



// create and configure store
const store = configureStore({
    reducer: componentToOpen.reducer
})

const store1 = configureStore({
    reducer: storeSlice2.reducer,
})

*/


// function to update store states using two arguments, the store and the actionEvent for the state meant to update
function updateStore(store, action) {
    store.dispatch(action)
    //return action;
}

function updateGlobalState(store, reducerName, value){
    const action = {payload: value, type: reducerName};
    store.dispatch(action);
}

// Subscribe to the store
//store.subscribe(() => console.log(store.getState()));

//export const {switchComponent} = componentToOpen.actions;
//export {chooseAndOpen, store};
//export {store, store1, updateStore};
export {store, updateGlobalState, updateStore};


/****Cheching */
/*
import {store, updateStore, updateGlobalState} from './Stores';

// get state from the redux store
let reduxStoreStates = store.getState(); // get the redux store object with initial values
[outputComponent, setOutputComponent]= useState(reduxStoreStates.componentToOutput);//componentToOutput prop in redux store

// update state in the redux store
store.dispatch({payload:false, type:"component/showHeaderState"})
setShowHeader(false);

*/
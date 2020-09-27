//context API

import React, { createContext, useContext, useReducer } from "react";

export const  DataLayerContext = createContext(); //(StateContext)prepare the data layer

//(StateProvider)
//children are compnents wrapped inside dataLayer/ stateProvider
export const DataLayer = ({ initialState, reducer, children }) => (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
);

//getting access to datalayer
export const useDataLayerValue = () => useContext(DataLayerContext);
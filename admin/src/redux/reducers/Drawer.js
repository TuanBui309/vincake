import React from 'react'
const initialState = {
    visible: false,
    title:'',
    ComponentContentDrawer: <p>default</p>,
    callBackSubmit: (propsValue) => { alert('click demo!') }
}

export const drawerReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'OPEN_DRAWER':
            return { ...state, visible: true }
        case 'CLOSE_DRAWER':
            return { ...state, visible: false }
        case 'OPEN_FORM_EDIT': {
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state }

        }
        case 'SET_SUBMIT_EDIT': {
            state.callBackSubmit = action.submitFunction;
            return {...state};
        }

        case 'SET_SUBMIT_CREATE' : {
            return {...state,callBackSubmit:action.submitFunction}
        }
        case 'SET_SUBMIT_CREATE' : {
            return {...state,callBackSubmit:action.submitFunction}
        }

        case 'OPEN_FORM_CREATE' : {
            state.visible = true;
            state.title = action.title;
            state.ComponentContentDrawer = action.Component;
            return {...state};

        }

        

        default:
            return state
    }
}

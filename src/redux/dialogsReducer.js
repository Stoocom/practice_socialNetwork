const ADD_MESSAGE = 'ADD-MESSAGE'

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' },
    ],
    dialogs: [
        { id: 1, name: 'Alexander' },
        { id: 2, name: 'Natasha' },
        { id: 3, name: 'Katya' },
        { id: 4, name: 'Maxim' },
        { id: 5, name: 'Pasha' },
    ],
}

const dialogsReducer = (state = initialState, action) => {
    
    switch (action.type) {
        
        case ADD_MESSAGE: {
            let body = action.formData
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id: state.messages.length + 1,
                        message: body,
                    }
                ]
            }
        }
        default:
            return state
    }
}

export const addMessageActionCreator = (formData) => {
    return { type: ADD_MESSAGE, formData }
}

export default dialogsReducer;
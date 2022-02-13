import { appReducer, InitialStateType, setErrorAC, setStatusAC } from "../app-reducer";

let startState : InitialStateType ;

beforeEach(()=>{
   
    startState = {
        error: null,
        status: 'idle'
    }
})

test('correct error should be added', () => {

    const endState = appReducer(startState,setErrorAC('some error'))

    expect(endState.error).toBe('some error');
});


test('correct status should be added', () => {

    const endState = appReducer(startState,setStatusAC('succeeded'))

    expect(endState.status).toBe('succeeded');
});



import { appReducer, InitialStateType, setErrorAC, setStatusAC } from "../app-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        statusRequest: 'idle',
        initialized: false
    }
})

test('correct error should be added', () => {

    const endState = appReducer(startState, setErrorAC({ error: 'some error' }))

    expect(endState.error).toBe('some error');
});


test('correct status should be added', () => {

    const endState = appReducer(startState, setStatusAC({ statusRequest: 'succeeded' }))

    expect(endState.statusRequest).toBe('succeeded');
});



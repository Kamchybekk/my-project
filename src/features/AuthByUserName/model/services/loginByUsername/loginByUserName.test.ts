import { Dispatch } from '@reduxjs/toolkit';
import { loginByUsername } from './loginByUsername';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

describe('loginByUserName.test', () => {
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });

    test('success login', async () => {
        const userValue = { username: '123', id: '1' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const action = loginByUsername({ username: '123', password: '123' });
        const result = await action(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue)
        );
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const action = loginByUsername({ username: '123', password: '123' });
        const result = await action(dispatch, getState, undefined);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual('error');
    });
});

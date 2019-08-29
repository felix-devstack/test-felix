import store from '@/store';
import jwtDecode from 'jwt-decode';

jest.mock('jwt-decode');
jwtDecode.mockImplementation(() => ({
  user: { id: '1234', name: 'Anton', email: 'anton@plxs.com.au' },
  'reference_id': 'ref123'
}));

describe('store', () => {
  beforeEach(() => {
    Object.assign(store._state, {
      levelOne: '1',
      levelTwo: {
        value: 2,
        levelThree: {
          value: 3
        }
      }
    });
  });

  describe('default values', () => {
    it('should set pageOneComplete to false', () => {
      expect(store.isPageOneComplete()).toEqual(false);
    });

    it('should set pageTwoComplete to false', () => {
      expect(store.isPageTwoComplete()).toEqual(false);
    });

    it('should initialise pageOne form data', () => {
      const expectedObject = {
        complete: false
      };
      expect(store.select('pageOne')).toMatchObject(expectedObject);
    });

    it('should initialise pageTwo form data', () => {
      const expectedState = {
        complete: false
      };

      expect(store.select('pageTwo')).toMatchObject(expectedState);
    });
  });

  describe('#select', () => {
    it('should return empty object if path isnt provided', () => {
      expect(store.select()).toEqual({});
    });

    it('should return empty object if path doesn\'t exist', () => {
      expect(store.select('road.to.rome')).toEqual({});
    });

    it('should return the value of the object when it exists', () => {
      expect(store.select('levelOne')).toEqual(store._state.levelOne);
    });

    it('should return the value of the object when it exists in deeply nested path', () => {
      expect(store.select('levelTwo.levelThree.value')).toEqual(store._state.levelTwo.levelThree.value);
    });

    it('should return a new copy of the object', () => {
      expect(store.select('pageOne')).not.toBe(store._state.pageOne);
    });
  });

  describe('#updatePageOneData', () => {
    let initialState;

    beforeEach(() => {
      initialState = store._state.pageOne;
      store.updatePageOneData({ value: 'test' });
    });

    it('should update values', () => {
      const { pageOne } = store._state;
      expect(pageOne).toMatchObject({ value: 'test' });
    });

    it('should not clobber references', () => {
      // Vue works by setting watchers around references
      expect(initialState).toBe(store._state.pageOne);
    });
  });

  describe('#updateBaseUrl', () => {
    let initialState;

    beforeEach(() => {
      initialState = store._state.userSessionData.baseUrl;
      store.updateBaseUrl('test');
    });

    it('should update values', () => {
      const { baseUrl } = store._state.userSessionData;
      expect(baseUrl).toEqual('test');
    });

    it('should not clobber references', () => {
      // Vue works by setting watchers around references
      expect(initialState).toBe(store._state.userSessionData.baseUrl);
    });
  });

  describe('#updateUserSessionData', () => {
    describe('with token', () => {
      let initialState;

      beforeAll(() => {
        initialState = store._state.userSessionData;
        store.updateUserSessionData({ token: 'test-jwt' });
      });

      it('should update user object', () => {
        const { user } = store._state.userSessionData;
        expect(user).toEqual({ id: '1234', name: 'Anton', email: 'anton@plxs.com.au' });
      });

      it('should update reference ID', () => {
        const { referenceId } = store._state.userSessionData;
        expect(referenceId).toEqual('ref123');
      });

      it('should not clobber references', () => {
        // Vue works by setting watchers around references
        expect(initialState).toBe(store._state.userSessionData);
      });
    });

    describe('with baseUrl', () => {
      let initialState;

      beforeAll(() => {
        initialState = store._state.userSessionData;
        store.updateUserSessionData({ baseUrl: 'dev.legalgateway.com.au' });
      });

      it('should update base url', () => {
        const { baseUrl } = store._state.userSessionData;
        expect(baseUrl).toEqual('dev.legalgateway.com.au');
      });

      it('should update env variable', () => {
        const { env } = store._state.userSessionData;
        expect(env).toEqual('dev');
      });

      it('should not clobber references', () => {
        // Vue works by setting watchers around references
        expect(initialState).toBe(store._state.userSessionData);
      });
    });
  });

});

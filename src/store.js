import get from 'lodash.get';
import jwtDecode from 'jwt-decode';
import * as gateway from 'legal-gateway-apps/src/legalGateway';

const isDev = process.env.NODE_ENV === 'development';

class Store {
  _state = {
    shared: {
      step: 1,
      steps: [1, 2]
    },
    pageOne: {
      complete: isDev
    },

    pageTwo: {
      complete: isDev
    },

    userSessionData: {
      baseUrl: null,
      env: null,
      token: null,
      user: {},
      referenceId: null
    }
  };

  get state() {
    return Object.assign({}, this._state);
  }

  /**
   * Get nested data out of the store state
   *
   * @param {string} path Dot notation path to
   * @returns {object} The resulting data at this path if it exists, otherwise return an empty object
   */
  select(path) {
    const res = get(this._state, path, {});
    return typeof res === 'object' ? Object.assign({}, get(this._state, path)) : res;
  }

  isPageOneComplete() {
    return this._state.pageOne.complete;
  }

  isPageTwoComplete() {
    return this._state.pageTwo.complete;
  }

  updatePageOneData(data, complete = true ) {
    Object.assign(this._state.pageOne, data, { complete });
  }

  updatePageTwoData(data, complete = true ) {
    Object.assign(this._state.pageTwo, data, { complete });
  }

  updateBaseUrl(baseUrl) {
    Object.assign(this._state.userSessionData, { baseUrl });
  }

  updateStep(step) {
    Object.assign(this._state.shared, { step });
  }

  updateUserSessionData({ token, baseUrl }) {
    if (token) {
      let { user, reference_id: referenceId } = jwtDecode(token);
      Object.assign(this._state.userSessionData, {
        token,
        user,
        referenceId
      });
    }
    if (baseUrl) {
      let env = gateway.getLegalGatewayEnv(baseUrl);
      Object.assign(this._state.userSessionData, {
        baseUrl,
        env
      });
    }
  }
}

// Export as a singleton
export default new Store();

import { getInitialState } from '../src/createLocationReducer'


export default (type, pathname) => { // eslint-disable-line import/prefer-default-export
  const current = { pathname, type, payload: { param: 'bar' } }
  const prev = { pathname: '/first', type: 'FIRST', payload: {} }

  return {
    type,
    pathname,
    current,
    prev,

    initialState: getInitialState(prev.pathname, prev.type, prev.payload),

    routesMap: {
      FIRST: '/first/',
      SECOND: '/second/:param',
    },

    action: {
      type,
      payload: { param: 'bar' },
      meta: {
        location: {
          current,
          prev,
          backNext: true,
          load: true,
        },
      },
    },

    expectState(state) {
      expect(state.pathname).toEqual(pathname)
      expect(state.type).toEqual(type)
      expect(state.payload).toEqual({ param: 'bar' })
      expect(state.prev).toEqual(prev)
      expect(state.load).toEqual(true)
      expect(state.backNext).toEqual(true)

      expect(state).toMatchSnapshot()
    },
  }
}

export const socketMiddleware = (Url, Actions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = Actions;
      if (type === wsInit) {
        socket = new WebSocket(`${Url}${payload}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          if (event.wasClean) {
            dispatch({ type: onClose, payload: event });
          } else {
            console.log(event.wasClean);
          }
          socket.close()
        };
      }

      next(action);
    };
  };
};
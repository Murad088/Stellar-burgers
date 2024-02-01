import { WS_CONNECTION_CLOSED, WS_PROFILE_CONNECTION_CLOSED } from "../actions/WebsocketActions";

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
          dispatch({ type: onClose, payload: event });
        };

        if (type === WS_PROFILE_CONNECTION_CLOSED) {
          socket.close(1000, "Нормальное закрытие без ошибок.");
          console.log("Привет, я тут отключаюсь от profile"); 
          socket = null;
        };
  
        if (type === WS_CONNECTION_CLOSED) {
          socket.close(1000, "Нормальное закрытие без ошибок.");          
          console.log("Привет, я тут отключаюсь от основы"); 
          socket = null;
        };
      }
    
      next(action);
    };
  };
};
class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(eventName, callback) {
    // 由于一个事件可能注册多个回调函数, 所以使用数组来存储事件队列
    const callbacks = this._events[eventName] || [];
    callbacks.push(callback);
    this._events[eventName] = callbacks;
  }

  emit(eventName, ...args) {
    const callbacks = this._events[eventName] || [];
    callbacks.forEach((cb) => cb(...args));
  }

  off(eventName, callback) {
    const callbacks = this._events[eventName] || [];
    this._events[eventName] = callbacks.filter(
      (cb) => cb != callback && cb.initialCallback != callback
    );
  }

  once(eventName, callback) {
    // 单次订阅，由于需要在回调函数执行后，取消订阅当前的事件
    const one = (...args) => {
      callback(...args);
      this.off(eventName, one);
    };

    one.initialCallback = callback;
    this.on(eventName, one);
  }
}

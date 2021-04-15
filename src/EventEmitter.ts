type Listener = (...args: any[]) => void;
type EventName = string | symbol;
export class EventEmitter {
  events: Map<EventName, Listener[]>;

  constructor() {
    this.events = new Map();
  }
  on(eventName: EventName, callback: Listener) {
    // TODOL Would just making it a get and type checking for unknown be moore performant than calling has to check events for existing event
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [callback]);
    } else {
      const existingEvent = this.events.get(eventName) as Listener[];
      this.events.set(eventName, [...existingEvent, callback]);
    }
    return this;
  }
  addListener = this.on;
  emit(eventName: EventName, args?: any) {
    if (!this.events.has(eventName)) {
      return new Error(`Event doesnt exist for ${String(eventName)}`);
    }
    const matchedEvent = this.events.get(eventName) as Listener[];
    console.log("matchedEvent: ", matchedEvent);
    matchedEvent.forEach((listener) => {
      listener(args);
    });
    return this;
  }
  removeListener(eventName: EventName, listener: Listener) {
    if (!this.events.has(eventName)) {
      return new Error(`Event doesnt exist for ${String(eventName)}`);
    }
    const existingEvent = this.events.get(eventName) as Listener[];
    existingEvent.splice(existingEvent.indexOf(listener), 1);
    return this;
  }
  removeAllListeners(eventName: EventName) {
    if (!this.events.has(eventName)) {
      throw new Error(`Event doesnt exist for ${String(eventName)}`);
    }
    this.events.set(eventName, []);
    return this;
  }
  once(args?: any) {}
}

const MyEmitter = new EventEmitter();

MyEmitter.on("New EventName", () => console.log("This is the New EventName"));
MyEmitter.on("New EventName", () => console.log("Did it work??????"))
  .removeAllListeners("New EventName")
  .emit("New EventName");
// import {EventEmitter } from "events";

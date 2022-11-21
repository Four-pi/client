export function addLoggerProxy<T extends Object>(target: T): T {
    const handler: ProxyHandler<T> = {
        get(target, prop, receiver) {
            console.log('[API]', target.constructor.name, '/', prop, );
            return Reflect.get(target, prop, receiver);
        }
    }
    return new Proxy(target, handler);
}
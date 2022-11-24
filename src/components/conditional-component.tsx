import { isLoggedIn } from "../models/login";

export function ConditionalComponent(props: any & { when: boolean | undefined }) {
    return props.when ? props.children : null;
}

export function RequiresLoggedIn(props: any) {
    return <ConditionalComponent {...props} when={isLoggedIn()} />
}

export function RequiresNotLoggedIn(props: any) {
    return <ConditionalComponent {...props} when={!isLoggedIn()} />
}
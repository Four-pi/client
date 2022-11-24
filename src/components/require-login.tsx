import { isLoggedIn } from "../models/login";

export function RequireLogin(props: any) {
    if (!isLoggedIn()) return null;

    return props.children ?? null;
}
import { User } from "../models/base";

export function UserText(props: { user: User }) {
    return <span>{props.user.name} ({props.user.id})</span>
}
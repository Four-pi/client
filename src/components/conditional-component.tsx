export function ConditionalComponent(props: any & { condition: boolean | undefined }) {
    return props.condition ? props.children : null;
}

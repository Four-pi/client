interface AddressProps {
    ip: string;
    port?: string | number | undefined;
    subnetMask?: string | number | undefined;
}

export function Address({ ip, port, subnetMask }: AddressProps) {
    return (
        <span>
            <Ip>{ip}</Ip>
            <Port>{port}</Port>
            <SubnetMask>{subnetMask}</SubnetMask>
        </span>
    );
}

function Ip({ children }: { children: string }) {
    return <span>{children}</span>;
}

function Port({ children }: { children: string | number | undefined }) {
    if (!children) return null;
    return <span style={{ color: "gray" }}>:{children}</span>;
}

function SubnetMask({ children }: { children: string | number | undefined }) {
    if (!children) return null;
    return <span style={{ color: "gray" }}>/{children}</span>;
}

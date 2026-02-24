import { Metadata } from "next";
import { sharedMetadata } from "../../shared-metadata";
import VirtualExpedition from "./VirtualExpedition";

export const metadata: Metadata = {
    ...sharedMetadata,
    title: "Virtual Expedition | Unmaad 2026",
};

export default function Page() {
    return (
        <main className="relative flex min-h-screen flex-col font-sans text-white">
            <VirtualExpedition />
        </main>
    );
}

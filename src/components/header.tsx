/** biome-ignore-all lint/correctness/useImageSize: Ignore */

import { SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
    return (
        <header className="px-4 py-2">
            <div className="container mx-auto flex items-center justify-between">
                <img alt="logo" src="/images/logo.svg" />

                <Button className="p-4 text-md" variant="secondary">
                    <SettingsIcon className="size-4"/>
                    Units
                </Button>
            </div>
        </header>
    );
};

export default Header;

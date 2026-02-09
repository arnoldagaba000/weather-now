/** biome-ignore-all lint/correctness/useImageSize: Ignore */

import UnitsMenu from "./units-menu";

const Header = () => {
    return (
        <header className="px-4 py-2">
            <div className="container mx-auto flex items-center justify-between">
                <img alt="logo" src="/images/logo.svg" />
                <UnitsMenu />
            </div>
        </header>
    );
};

export default Header;
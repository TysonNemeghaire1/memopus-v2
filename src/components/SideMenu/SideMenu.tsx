import React from 'react';

function SideMenu() {
    return (
        <div>
            <div className="flex justify-between items-center p-6">
                <h1 className="text-3xl text-blue-800 font-extrabold pr-6">Memopus</h1>
                <button className="lg:hidden">X</button>
            </div>
        </div>
    );
}

export default SideMenu;
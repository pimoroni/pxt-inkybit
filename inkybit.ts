//% weight=100 color=#000000 icon="\uf06e" block="Inky:Bit"
namespace inkybit {
    export function show() {
        _show();   
    }

    export function init() {
        _init();
    }

    export function setPixel(x: number, y: number, color: number): void {
        _setPixel(x, y, color);
        return;
    }

    //% shim=inkybit::show
    function _show(): void {
        return;
    }

    //% shim=inkybit::clear
    function _clear(): void {
        return;
    }

    //% shim=inkybit::setPixel
    function _setPixel(x: number, y: number, color: number): void {
        return;
    }

    //% shim=inkybit::init
    function _init(): void {
        return;
    }
}

inkybit.init();

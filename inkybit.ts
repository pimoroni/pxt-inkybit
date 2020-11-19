//% weight=100 color=#000000 icon="\uf06e" block="Inky:Bit"
namespace inkybit {
    
    const WIDTH: number = 250
    const HEIGHT: number = 122

    let UPSIDE_DOWN: boolean = false

    const ARROWOFFSET: number = 40

    const ICONS: string[] = [
        "Heart",
        "SmallH",
        "Yes",
        "No",
        "Happy",
        "Sad",
        "Confus",
        "Angry",
        "Asleep",
        "Surpri",
        "Silly",
        "Fabulo",
        "Meh",
        "TShirt",
        "Roller",
        "Duck",
        "House",
        "Tortoi",
        "Butter",
        "StickF",
        "Ghost",
        "Sword",
        "Giraff",
        "Skull",
        "Umbrel",
        "Snake",
        "Rabbit",
        "Cow",
        "Quarte",
        "EigthN",
        "Pitchf",
        "Target",
        "Triang",
        "LeftTr",
        "Chessb",
        "Diamon",
        "SmallD",
        "Square",
        "SmallS",
        "Scisso",
    
        "North",
        "NorthE",
        "East",
        "SouthE",
        "South",
        "SouthW",
        "West",
        "NorthW"
    ]

    //% block
    export enum Color {
        White = 0,
        Black = 1,
        Red = 2,
        Yellow = 2
    }

    let pixelSize: number = 1;

    function tokenize(text: string): string {
        let result: string = ""
        let icon: string = ""

        for (let x = 0; x < text.length; x++){
            let char: string = text.charAt(x)
            if (char == "}" && icon.length > 0) {
                let index: number = ICONS.indexOf(icon.substr(1,6))
                icon += char

                if (index > -1) {
                    icon = String.fromCharCode(DAL.MICROBIT_FONT_ASCII_END + 1 + index)
                }

                result += icon
                icon = ""
                continue
            }
            if (char == "{" || icon.length > 0) {
                icon += char
                continue
            }
            result += char
        }

        return result
    }

    /**
     * Display an icon on inky:bit
     * @param icon - icon to display
     * @param x - x position (0-249)
     * @param y - y position (0-119)
     * @param color - color to set (0-2)
     */
    //% blockId=inkybit_set_icon
    //% block="display icon %icon| at x %x| y %y| with color %color"
    //% icon.fieldEditor="gridpicker"
    //% icon.fieldOptions.width="400" icon.fieldOptions.columns="5"
    //% icon.fieldOptions.itemColour="black" icon.fieldOptions.tooltips="true"
    //% x.min=0 x.max=249
    //% y.min=0 y.max=119
    export function setIcon(icon: IconNames, x: number, y: number, color: Color = Color.Black): void {
        let image: Image = images.iconImage(icon)
        setImage(image, x, y, color)
    }

    /**
     * Display an arrow on inky:bit
     * @param arrow - arrow to display
     * @param x - x position (0-249)
     * @param y - y position (0-119)
     * @param color - color to set (0-2)
     */
    //% blockId=inkybit_set_arrow
    //% block="display arrow %arrow| at x %x| y %y| with color %color"
    //% x.min=0 x.max=249
    //% y.min=0 y.max=119
    export function setArrow(arrow: ArrowNames, x: number, y: number, color: Color = Color.Black): void {
        let image: Image = images.arrowImage(arrow)
        setImage(image, x, y, color)
    }

    /**
     * Display an image on inky:bit
     * @param image - image to display
     * @param x - x position (0-249)
     * @param y - y position (0-119)
     * @param color - color to set (0-2)
     */
    //% blockId=inkybit_set_image
    //% block="display image %image| at x %x| y %y| with color %color"
    //% x.min=0 x.max=249
    //% y.min=0 y.max=119
    export function setImage(image: Image, x: number, y: number, color: Color = Color.Black): void {
        for (let c_row = 0; c_row < 5; c_row++) {
            for (let c_col = 0; c_col < image.width(); c_col++) {
                if (image.pixelBrightness(c_col, c_row)) {
                    setPixel(x + c_col, y + c_row, color)
                }
            }
        }
    }

    /**
     * Set an pixel on inky:bit
     * @param x - x position (0-249)
     * @param y - y position (0-119)
     * @param color - color to set (0-2)
     */
    //% blockId=inkybit_set_pixel
    //% block="display image %image| at x %x| y %y| with color %color"
    //% x.min=0 x.max=249
    //% y.min=0 y.max=119
    export function setPixel(x: number, y: number, color: Color = Color.Black): void {
        x *= pixelSize;
        y *= pixelSize;
        let c: number = color
        let px: number = 0;
        let py: number = 0;
        for(py = 0; py < pixelSize; py++) {
            for(px = 0; px < pixelSize; px++) {
                _setPixel(x + px, y + py, c);
            }
        }
        return
    }

    /**
     * Set scroll:bit pixel size
     * @param size - pixel size (1 to 4)
     */
    //% blockId=inkybit_set_pixel_size
    //% block="set pixel size to %size"
    //% advanced color=#220000
    //% size.min=1 size.max=4
    export function setPixelSize(size: number): void {
        pixelSize = size;
    }

    /**
     * Get scroll:bit pixel size
     */
    //% blockId=inkybit_get_pixel_size
    //% advanced color=#220000
    export function getPixelSize(): number {
        return pixelSize;
    }

    /**
     * Measure text, returns a length in pixels
     * @param text - text to measure
     */
    //% blockId=inkybit_measure_text
    //% block="get length of %text in pixels"
    //% advanced color=#554444
    export function measureText(text: string): number {
        let len: number = 0
        for (let x: number = 0; x < text.length; x++){
            len += charWidth(text.charAt(x)) + 1
        }
        return len
    }

    /**
     * Draw a single alphanumeric character.
     * @param char - character to display
     * @param x - x position (0-249)
     * @param y - y position (0-119)
     * @param color - color to set (0-2)
     */
    export function drawChar(char: string, x: number, y: number, color: Color = Color.Black): void {
        if (char.charCodeAt(0) > DAL.MICROBIT_FONT_ASCII_END + ARROWOFFSET) {
            setArrow(char.charCodeAt(0) - DAL.MICROBIT_FONT_ASCII_END - ARROWOFFSET - 1, x, y, color)
            return
        }
        if (char.charCodeAt(0) > DAL.MICROBIT_FONT_ASCII_END) {
            setIcon(char.charCodeAt(0) - DAL.MICROBIT_FONT_ASCII_END - 1, x, y, color)
            return
        }
        let data: Buffer = getChar(char)
        for (let c_row = 0; c_row < 5; c_row++) {
            for (let c_col = 0; c_col < 5; c_col++) {
                if ((data[c_row] & (1 << (4 - c_col))) > 0) {
                    setPixel(x + c_col, y + c_row, color)
                }
            }
        }
    }

    /**
     * Draw text on scroll:bit
     * @param col - column to set (0-16)
     * @param row - row to set (0-6)
     * @param text - text to show
     * @param brightness - brightness to set (0-255)
     */
    //% blockId=inkybit_draw_text
    //% block="draw %text| at x %x| y %y| with color %color"
    //% advanced color=#220000
    //% x.min=0 x.max=249
    //% y.min=0 y.max=119
    export function drawText(text: string, x: number, y: number, color: Color = Color.Black): void {
        text = tokenize(text)
        _drawText(text, x, y, color)
    }
    export function _drawText(text: string, x: number, y: number, color: Color = Color.Black): void {
        let o_x: number = x;
        for (let char_index: number = 0; char_index < text.length; char_index++){
            let width:  number = charWidth(text.charAt(char_index))
            if ((x + width) * pixelSize >= WIDTH) {
                y += 6 // New line
                x = o_x
            }
            drawChar(text.charAt(char_index), x, y, color)
            x += width + 1 // 1px space between chars
        }
    }

    /**
     * Update inky:bit,
     * update the e-ink display with your pretty pixels
     */
    //% blockId=inkybit_show
    //% block="display your changes"
    export function show() {
        _show() 
    }

    export function init() {
        _init()
    }

    //% shim=inkybit::show
    function _show(): void {
        return
    }

    //% shim=inkybit::clear
    function _clear(): void {
        return
    }

    //% shim=inkybit::setPixel
    function _setPixel(x: number, y: number, color: number): void {
        return
    }

    //% shim=inkybit::init
    function _init(): void {
        return
    }

    // Font bindings

    //% shim=inkybit::getFontDataByte
    function getFontDataByte(index: number): number {
        return 0
    }

    //% shim=inkybit::getFontData
    function getFontData(index: number): Buffer {
        return pins.createBuffer(5)
    }

    //% shim=inkybit::getCharWidth
    function getCharWidth(char: number): number {
        return 5
    }

    function getChar(character: string): Buffer {
        return getFontData(character.charCodeAt(0))
    }

    function charWidth(character: string): number {
        let charcode: number = character.charCodeAt(0)
        if (charcode > DAL.MICROBIT_FONT_ASCII_END) {
            return 5
        }
        return getCharWidth(charcode)
    }
}

inkybit.init()

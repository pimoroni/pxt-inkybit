//% weight=100 color=#000000 icon="\uf043" block="Inky:Bit"
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

    export enum Color {
        //% block="black" defl=True
        Black = 1,
        //% block="white"
        White = 0,
        //% block="accent"
        Accent = 2
    }

    export enum PixelSize {
        //% block="normal (1x)" defl=True
        Normal = 1,
        //% block="double (2x)"
        Double = 2,
        //% block="triple (3x)"
        Triple = 3,
        //% block="quad (4x)"
        Quad = 4
    }

    export enum TextSize {
        //% block="regular (2x)" defl=True
        Regular = 2,
        //% block="tiny (1x)"
        Tiny = 1,
        //% block="medium (3x)"
        Medium = 3,
        //% block="large (4x)"
        Large = 4
    }

    let _pixelSize: number = 1

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
    /*
    // blockId=inkybit_draw_icon
    // block="draw icon %icon| at x %x| y %y| with color %color| and size %size"
    // icon.fieldEditor="gridpicker"
    // icon.fieldOptions.width="400" icon.fieldOptions.columns="5"
    // icon.fieldOptions.itemColour="black" icon.fieldOptions.tooltips="true"
    // x.min=0 x.max=249
    // y.min=0 y.max=119
    */
    export function drawIcon(icon: IconNames, x: number, y: number, color: Color = Color.Black, size: TextSize = TextSize.Regular): void {
        let image: Image = images.iconImage(icon)
        drawImage(image, x, y, color, size)
    }

    /**
     * Display an arrow on inky:bit
     * @param arrow - arrow to display
     * @param x - x position (0-249)
     * @param y - y position (0-119)
     * @param color - color to set (0-2)
     */
    /*
    // blockId=inkybit_draw_arrow
    // block="draw arrow %arrow| at x %x| y %y| with color %color| and size %size"
    // x.min=0 x.max=249
    // y.min=0 y.max=119
    */
    export function drawArrow(arrow: ArrowNames, x: number, y: number, color: Color = Color.Black, size: TextSize = TextSize.Regular): void {
        let image: Image = images.arrowImage(arrow)
        drawImage(image, x, y, color, size)
    }

    /**
     * Draw an image on inky:bit
     * @param image - image to display
     * @param x - x position (0-249)
     * @param y - y position (0-119)
     * @param color - color to set (0-2)
     */
    //% blockId=inkybit_draw_image
    //% block="draw image %image| at x %x| y %y| with color %color| and size %size"
    //% x.min=0 x.max=249
    //% y.min=0 y.max=119
    export function drawImage(image: Image, x: number, y: number, color: Color = Color.Black, size: TextSize = TextSize.Regular): void {
        let rows: number = 5 * size
        let cols: number = image.width() * size
        for (let c_row = 0; c_row < rows; c_row++) {
            let s_row: number = Math.floor(c_row / size)
            for (let c_col = 0; c_col < cols; c_col++) {
                let s_col: number = Math.floor(c_col / size)
                if (image.pixelBrightness(s_col, s_row)) {
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
    //% block="set pixel at x %x| y %y| with color %color"
    //% x.min=0 x.max=249
    //% y.min=0 y.max=119
    export function setPixel(x: number, y: number, color: Color = Color.Black): void {
        x *= _pixelSize
        y *= _pixelSize
        let c: number = color
        let px: number = 0
        let py: number = 0
        for(py = 0; py < _pixelSize; py++) {
            for(px = 0; px < _pixelSize; px++) {
                _setPixel(x + px, y + py, c)
            }
        }
        return
    }

    /**
     * Draw a rectangle on inky:bit
     * @param x - x position (0-249)
     * @param y - y position (0-119)
     * @param color - color to set (0-2)
     * @param filled - whether to fill the rectangle with color
     */
    //% blockId=inkybit_draw_rectangle
    //% block="draw rectangle at x %x| y %y| width %width| height %height| color %color| filled %filled"
    //% x.min=0 x.max=249
    //% y.min=0 y.max=119
    export function drawRectangle(x: number, y: number, width: number, height: number, color: Color = Color.Black, filled: Boolean = false): void {
        let c: number = color
        let px: number = 0
        let py: number = 0
        /*
          x, y          x+w, y

          x, y+h        x+w, y+h
        */
        drawLine(x, y, x + width, y, c)
        drawLine(x, y, x, y + height, c)
        drawLine(x + width, y, x + width, y + height, c)
        drawLine(x, y + height, x + width, y + height, c)

        if(filled) {
            x += 1
            y += 1
            width -= 2
            height -= 2
            for(py = y; py <= y + height; py++) {
                for(px = x; px <= x + width; px++) {
                    _setPixel(px, py, c)
                }
            }
        }
    }

    /**
     * Draw a line on inky:bit
     * @param x0 - start x position (0-249)
     * @param y0 - start y position (0-119)
     * @param x1 - end x position (0-249)
     * @param y1 - end y position (0-119)
     * @param color - color to set (0-2)
     */
    //% blockId=inkybit_draw_line
    //% block="draw line from x %x0 y %y0| to x %x1 y %y1| color %color"
    //% x0.min=0 x0.max=249
    //% y0.min=0 y0.max=119
    //% x1.min=0 x1.max=249
    //% y1.min=0 y1.max=119
    export function drawLine(x0: number, y0: number, x1: number, y1: number, color: Color = Color.Black): void {
        let c: number = color
        let dx: number = Math.abs(x1 - x0)
        let sx: number = x0 < x1 ? 1 : -1
        let dy: number = -Math.abs(y1 - y0)
        let sy: number = y0 < y1 ? 1 : -1

        let err: number = dx + dy;  /* error value e_xy */
        while (true) {  /* loop */
            _setPixel(x0, y0, c)
            if (x0 == x1 && y0 == y1) break;
            let e2: number = 2 * err;
            if (e2 >= dy) { /* e_xy+e_x > 0 */
                err += dy;
                x0 += sx;
            }
            if (e2 <= dx) { /* e_xy+e_y < 0 */
                err += dx;
                y0 += sy;
            }
        }
    }

    /**
     * Set scroll:bit pixel size
     * @param size - pixel size (1 to 4)
     */
    //% blockId=inkybit_set_pixel_size
    //% block="set pixel size to %size"
    //% advanced color=#220000
    //% size.defl=1
    export function setPixelSize(size: PixelSize = PixelSize.Normal): void {
        _pixelSize = size
    }

    /**
     * Get scroll:bit pixel size
     */
    //% blockId=inkybit_get_pixel_size
    //% block="get pixel size"
    //% advanced color=#220000
    export function getPixelSize(): PixelSize {
        return _pixelSize
    }

    /**
     * Measure text, returns a length in pixels
     * @param text - text to measure
     */
    //% blockId=inkybit_measure_text
    //% block="get length of %text in pixels| at size %size"
    //% advanced color=#554444
    export function measureText(text: string, size: TextSize = TextSize.Regular): number {
        let len: number = 0
        for (let x: number = 0; x < text.length; x++){
            len += charWidth(text.charAt(x), size) + (1 * size)
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
    export function drawChar(char: string, x: number, y: number, color: Color = Color.Black, size: TextSize = TextSize.Regular): void {
        let rows: number = 5 * size
        let cols: number = 5 * size

        if (char.charCodeAt(0) > DAL.MICROBIT_FONT_ASCII_END + ARROWOFFSET) {
            drawArrow(char.charCodeAt(0) - DAL.MICROBIT_FONT_ASCII_END - ARROWOFFSET - 1, x, y, color, size)
            return
        }
        if (char.charCodeAt(0) > DAL.MICROBIT_FONT_ASCII_END) {
            drawIcon(char.charCodeAt(0) - DAL.MICROBIT_FONT_ASCII_END - 1, x, y, color, size)
            return
        }
        let data: Buffer = getChar(char)
        for (let c_row = 0; c_row < rows; c_row++) {
            let s_row: number = Math.floor(c_row / size)
            for (let c_col = 0; c_col < cols; c_col++) {
                let s_col: number = Math.floor(c_col / size)
                if ((data[s_row] & (1 << (4 - s_col))) > 0) {
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
    //% block="draw text %text| at x %x| y %y| with color %color| and size %size"
    //% x.min=0 x.max=249
    //% y.min=0 y.max=119
    export function drawText(text: string, x: number, y: number, color: Color = Color.Black, size: TextSize = TextSize.Regular): void {
        text = tokenize(text)
        _drawText(text, x, y, color, size)
    }
    export function _drawText(text: string, x: number, y: number, color: Color = Color.Black, size: TextSize = TextSize.Regular): void {
        let o_x: number = x
        for (let char_index: number = 0; char_index < text.length; char_index++){
            let width:  number = charWidth(text.charAt(char_index), size)
            if ((x + width) * _pixelSize >= WIDTH) {
                y += 6 * size // New line, 5px tall + 1px gap
                x = o_x
            }
            drawChar(text.charAt(char_index), x, y, color, size)
            x += width + (1 * size) // 1px space between chars
        }
    }

    /**
     * Return the width of inky:bit
     */
    //% blockId=scrollbit_cols
    //% block="width"
    //% color=#444444
    //% icon=""
    export function width(): number {
        return WIDTH
    }

    /**
     * Return the height of inky:bit
     */
    //% blockId=inkybit_height
    //% block="height"
    //% color=#444444
    //% icon=""
    export function height(): number {
        return HEIGHT
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

    function charWidth(character: string, size: TextSize = TextSize.Regular): number {
        let charcode: number = character.charCodeAt(0)
        if (charcode > DAL.MICROBIT_FONT_ASCII_END) {
            return 5 * size
        }
        return getCharWidth(charcode) * size
    }
}

inkybit.init()

basic.showNumber(1)
serial.writeLine("Hello World")



// Name tag

inkybit.drawRectangle(0, 0, 249, 121, inkybit.Color.Accent, true)
inkybit.drawRectangle(0, 30, 249, 60, inkybit.Color.White, true)

inkybit.drawText("Hello, my name is:", 10, 10, inkybit.Color.White, inkybit.TextSize.Regular)

let size: number = inkybit.measureText("Phillius", inkybit.TextSize.Huge)
let x: number = Math.floor((250 - size) / 2)
inkybit.drawText("Phillius", x, 50, inkybit.Color.Black, inkybit.TextSize.Huge)



/*inkybit.drawLine(0, 0, 50, 50, inkybit.Color.Accent)
inkybit.drawLine(50, 0, 0, 50, inkybit.Color.Black)

inkybit.drawLine(0, 0, 0, 50, inkybit.Color.Black)

inkybit.drawRectangle(55, 5, 50, 50, inkybit.Color.Accent, false)

inkybit.drawRectangle(110, 5, 50, 50, inkybit.Color.Black, true)*/


/*
let n:number = 0;
for (n = 0; n < 50; n++){
    inkybit.setPixel(n, n, 1)
}
for (n = 0; n < 50; n++){
    inkybit.setPixel(n, 50-n, 1)
}

inkybit.setPixelSize(inkybit.PixelSize.Normal)
inkybit.drawText("Ahoy", 1, 1, inkybit.Color.Black, inkybit.TextSize.Regular)

inkybit.drawText("Hello {Asleep}", 1, 22)
inkybit.drawText("Test", 1, 30, inkybit.Color.Black, inkybit.TextSize.Regular)

inkybit.drawText("The quick brown fox jumps over the lazy dog.", 1, 40, inkybit.Color.Black, inkybit.TextSize.Regular)
*/

//inkybit.setIcon(IconNames.Heart, 0, 1, inkybit.Color.Accent, inkybit.TextSize.Tiny)
//inkybit.drawText("Hello world this is some text", 6, 1, inkybit.Color.Black, inkybit.TextSize.Tiny)

//inkybit.setIcon(IconNames.Heart, 0, 6, inkybit.Color.Accent, inkybit.TextSize.Regular)
//inkybit.drawText("Hello world this is some text", 12, 6, inkybit.Color.Black, inkybit.TextSize.Regular)

//inkybit.setIcon(IconNames.Heart, 0, 41, inkybit.Color.Accent, inkybit.TextSize.Medium)
//inkybit.drawText("Hello world this is some text", 18, 41, inkybit.Color.Black, inkybit.TextSize.Medium)


inkybit.show()

/*

inkybit.setPixelSize(2);
for (n = 0; n < 50; n++){
    inkybit.setPixel(n, 50-n, 1)
}
inkybit.setPixelSize(1);

inkybit.setIcon(IconNames.Heart, 0, 0, inkybit.Color.Accent)
inkybit.setIcon(IconNames.Ghost, 40, 40, inkybit.Color.Black)

inkybit.drawText("Hello world, this is some text with a {Tortoi}", 50, 0)

inkybit.drawText("This is some long text that wraps around the right-hand edge of the display and starts at its X origin again", 200, 20);

let y: number = 0;
for (n = 1; n < 5; n++){
    inkybit.setPixelSize(n);
    inkybit.setIcon(IconNames.Heart, n * 5, 0, inkybit.Color.Accent)

    inkybit.drawText("Hello World Wrap Text", 0, n * 3);
}

inkybit.setPixelSize(inkybit.PixelSize.Normal)
for (n = 0; n < 8; n++){
    inkybit.setArrow(n, 200 + (n * 5), 110)
}

basic.showNumber(2)
inkybit.show()
basic.showNumber(3)
basic.showNumber(4)
*/
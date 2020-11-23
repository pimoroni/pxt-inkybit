basic.showNumber(1)
serial.writeLine("Hello World")

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

//inkybit.setIcon(IconNames.Heart, 0, 1, inkybit.Color.Red, inkybit.TextSize.Tiny)
//inkybit.drawText("Hello world this is some text", 6, 1, inkybit.Color.Black, inkybit.TextSize.Tiny)

//inkybit.setIcon(IconNames.Heart, 0, 6, inkybit.Color.Red, inkybit.TextSize.Regular)
//inkybit.drawText("Hello world this is some text", 12, 6, inkybit.Color.Black, inkybit.TextSize.Regular)

//inkybit.setIcon(IconNames.Heart, 0, 41, inkybit.Color.Red, inkybit.TextSize.Medium)
//inkybit.drawText("Hello world this is some text", 18, 41, inkybit.Color.Black, inkybit.TextSize.Medium)


inkybit.show()

/*

inkybit.setPixelSize(2);
for (n = 0; n < 50; n++){
    inkybit.setPixel(n, 50-n, 1)
}
inkybit.setPixelSize(1);

inkybit.setIcon(IconNames.Heart, 0, 0, inkybit.Color.Red)
inkybit.setIcon(IconNames.Ghost, 40, 40, inkybit.Color.Black)

inkybit.drawText("Hello world, this is some text with a {Tortoi}", 50, 0)

inkybit.drawText("This is some long text that wraps around the right-hand edge of the display and starts at its X origin again", 200, 20);

let y: number = 0;
for (n = 1; n < 5; n++){
    inkybit.setPixelSize(n);
    inkybit.setIcon(IconNames.Heart, n * 5, 0, inkybit.Color.Red)

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
basic.showNumber(1)
serial.writeLine("Hello World")

let n:number = 0;
for (n = 0; n < 50; n++){
    inkybit.setPixel(n, n, 1)
}
for (n = 0; n < 50; n++){
    inkybit.setPixel(n, 50-n, 1)
}


inkybit.setPixelSize(2);
for (n = 0; n < 50; n++){
    inkybit.setPixel(n, 50-n, 1)
}
inkybit.setPixelSize(1);

inkybit.setIcon(IconNames.Heart, 0, 0, inkybit.Color.Red)
inkybit.setIcon(IconNames.Ghost, 40, 40, inkybit.Color.Black)

inkybit.drawText("Hello world, this is some text with a {Tortoi}", 50, 0)

inkybit.drawText("This is some long text that wraps around the right-hand edge of the display and starts at its X origin again", 200, 20);

for (n = 1; n < 5; n++){
    inkybit.setPixelSize(n);
    inkybit.setIcon(IconNames.Heart, n * 5, 0, inkybit.Color.Red)

    inkybit.drawText("Hello World", 0, n * 5);
}

basic.showNumber(2)
inkybit.show()
basic.showNumber(3)
basic.showNumber(4)
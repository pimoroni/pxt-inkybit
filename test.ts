// Name tag
inkybit.drawRectangle(0, 0, 249, 121, inkybit.Color.Accent, true)
inkybit.drawRectangle(0, 30, 249, 60, inkybit.Color.White, true)

inkybit.drawText("Hello, my name is:", 10, 10, inkybit.Color.White, inkybit.TextSize.Regular)

let size: number = inkybit.measureText("Phillius", inkybit.TextSize.Large)
let x: number = Math.floor((250 - size) / 2)
inkybit.drawText("Phillius", x, 50, inkybit.Color.Black, inkybit.TextSize.Large)

// Lines
inkybit.drawLine(0, 0, 50, 50, inkybit.Color.Accent)
inkybit.drawLine(50, 0, 0, 50, inkybit.Color.Black)
inkybit.drawLine(0, 0, 0, 50, inkybit.Color.Black)

inkybit.drawRectangle(55, 5, 50, 50, inkybit.Color.Accent, false)
inkybit.drawRectangle(110, 5, 50, 50, inkybit.Color.Black, true)

// Variable pixel size
let n:number = 0;
for (n = 0; n < 50; n++){
    inkybit.setPixel(n, n, 1)
}
for (n = 0; n < 50; n++){
    inkybit.setPixel(n, 50-n, 1)
}

inkybit.setPixelSize(inkybit.PixelSize.Normal)
inkybit.drawText("Ahoy", 1, 1, inkybit.Color.Black, inkybit.TextSize.Regular)

// Icon tokenization
inkybit.drawText("Hello {Asleep}", 1, 22)

// Icons
inkybit.setIcon(IconNames.Heart, 0, 1, inkybit.Color.Accent, inkybit.TextSize.Tiny)
inkybit.setIcon(IconNames.Heart, 0, 6, inkybit.Color.Accent, inkybit.TextSize.Regular)
inkybit.setIcon(IconNames.Heart, 0, 41, inkybit.Color.Accent, inkybit.TextSize.Medium)

inkybit.show()

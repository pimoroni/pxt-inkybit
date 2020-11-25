# inky:bit

 [![Build Status](https://travis-ci.org/pimoroni/pxt-inkybit.svg?branch=master)](https://travis-ci.org/pimoroni/pxt-inkybit)

 A 250x122 pixel, tri-colour e-ink display for low frequency, high visibility status display.

This package adds support for the Pimoroni inky:bit to makecode.microbit.org.

A inky:bit is required to use this package, grab yours here: https://shop.pimoroni.com/products/inky-bit

To use this package, go to https://makecode.microbit.org/, click "Advanced" then "Add Package" and search for inky:bit. 

## JavaScript Reference

inky:bit has a 250x122 pixel display, each pixel can be set to white, black or red.

### Text Size

There are four text sizes available, all using the built-in 5x5px micro:bit font:

1. `TextSize.Regular` - 2x - each font pixel is 2x2 real pixels
2. `TextSize.Tiny` - 1x - each font pixel is a single pixel
3. `TextSize.Medium` - 3x - each font pixel is 3x3 real pixels
4. `TextSize.Large` - 4x - each font pixel is 4x4 real pixels

### Get the size of your inky:bit

The blocks `width` and `height` return the width and height of inky:bit in pixels respectively.

Use these in your loops and flow control to draw amazing things!

### Set a single pixel

Set a single pixel on inky:bit. Note, you must call `show` to display your changes.

* `x` is the x position, from 0-249
* `y` is the y position, from 0-119
* `color` is the color, one of `inkybit.Color.White`,  `inkybit.Color.Black`,  `inkybit.Color.Accent`

```
inkybit.setPixel(x: number, y: number, color: number)
```

For example:

```
inkybit.setPixel(5, 5, inkybit.Color.Black)
```

### Display your changes

When you've finished setting pixels and drawing text, you must call `show` to display your changes.

```
inkybit.show()
```

### Clear the display

To clear the display, you can call `clear`, you must also call `show` if you want to display your changes.

```
inkybit.clear()
inkybit.show()
```

### Display an image

To show an image on inky:bit, use `drawImage`:

* `image` is the micro:bit image you want to display
* `x` is the x position, from 0-249
* `y` is the y position, from 0-119
* `color` is the color, one of `inkybit.Color.White`,  `inkybit.Color.Black`,  `inkybit.Color.Accent`
* `size` is the text size, one of `inkybit.TextSize.Tiny`, `inkybit.TextSize.Regular`, `inkybit.TextSize.Medium`, `inkybit.TextSize.Large`

```
inkybit.drawImage(image: Image, x: number, y: number, color: Color, size: TextSize)
```

### Display a text string

To show a string of text on inky:bit you should use `drawText`:

* `text` is the text you want to show
* `x` is the x position, from 0-249
* `y` is the y position, from 0-119
* `color` is the color, one of `inkybit.Color.White`,  `inkybit.Color.Black`,  `inkybit.Color.Accent`
* `size` is the text size, one of `inkybit.TextSize.Tiny`, `inkybit.TextSize.Regular`, `inkybit.TextSize.Medium`, `inkybit.TextSize.Large`

```
inkybit.drawText(text: string, x: number, y: number, color: Color, size: TextSize)
```

For example:

```
inkybit.drawText(0, 1, "Hello World")
```

### Measure a text string

It can be useful to know how long a string of text might be, in pixels, on inky:bit. Use `measureText` to find out:

```
inkybit.measureText(text: string, size: TextSize)
```

For example:

```
let width: number = inkybit.measureText("Hello World")
```

This will return a number of pixels corresponding to the length of the text as it's displayed on inky:bit (using the built-in 5x5 micro:bit font at the size you specify).

### Icons & Arrows

You can use icons and arrows in your text, just place their name in curly brackets like so: `"Hello {Heart} World"` or: `"Boo! Went the {Ghost}"` or: `"{Heart}{SmallHeart}{Heart} Happy Birthday! {Heart}{SmallHeart}{Heart}"`

Here's a list of icons you can use:

* Heart
* SmallHeart
* Yes
* No
* Happy
* Sad
* Confused
* Angry
* Asleep
* Surprised
* Silly
* Fabulous
* Meh
* TShirt
* Rollerskate
* Duck
* House
* Tortoise
* Butterfly
* StickFigure
* Ghost
* Sword
* Giraffe
* Skull
* Umbrella
* Snake
* Rabbit
* Cow
* QuarterNote
* EigthNote
* Pitchfork
* Target
* Triangle
* LeftTriangle
* Chessboard
* Diamond
* SmallDiamond
* Square
* SmallSquare
* Scissors
* North
* NorthEast
* East
* SouthEast
* South
* SouthWest
* West
* NorthWest

## License

MIT License

Copyright (c) 2018 Pimoroni Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Supported targets

* for PXT/microbit

```package
inkybit=github:pimoroni/pxt-inkybit
```

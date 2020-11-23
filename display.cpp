#include "pxt.h"
#include <vector>
using namespace pxt;

#ifndef PXT_CREATE_BUFFER
#define PXT_CREATE_BUFFER(data, len) ManagedBuffer(data, len).leakData()
#endif

#define DC uBit.io.P12   // MICROBIT_PIN_P12
#define CS uBit.io.P8    // MICROBIT_PIN_P8
#define RESET uBit.io.P2 // MICROBIT_PIN_P2
#define BUSY uBit.io.P16 // MICROBIT_PIN_P16

#define DRIVER_CONTROL 0x01
#define GATE_VOLTAGE 0x03
#define SOURCE_VOLTAGE 0x04
#define DISPLAY_CONTROL 0x07
#define NON_OVERLAP 0x0B
#define BOOSTER_SOFT_START 0x0C
#define GATE_SCAN_START 0x0F
#define DEEP_SLEEP 0x10
#define DATA_MODE 0x11
#define SW_RESET 0x12
#define TEMP_WRITE 0x1A
#define TEMP_READ 0x1B
#define TEMP_CONTROL 0x1C
#define TEMP_LOAD 0x1D
#define MASTER_ACTIVATE 0x20
#define DISP_CTRL1 0x21
#define DISP_CTRL2 0x22
#define WRITE_RAM 0x24
#define WRITE_ALTRAM 0x26
#define READ_RAM 0x25
#define VCOM_SENSE 0x28
#define VCOM_DURATION 0x29
#define WRITE_VCOM 0x2C
#define READ_OTP 0x2D
#define WRITE_LUT 0x32
#define WRITE_DUMMY 0x3A
#define WRITE_GATELINE 0x3B
#define WRITE_BORDER 0x3C
#define SET_RAMXPOS 0x44
#define SET_RAMYPOS 0x45
#define SET_RAMXCOUNT 0x4E
#define SET_RAMYCOUNT 0x4F

#define CS_ACTIVE 0
#define CS_INACTIVE 1
#define DC_DATA 1
#define DC_COMMAND 0

constexpr uint8_t luts[30] = {
    0x02, 0x02, 0x01, 0x11, 0x12, 0x12, 0x22, 0x22, 0x66, 0x69,
    0x69, 0x59, 0x58, 0x99, 0x99, 0x88, 0x00, 0x00, 0x00, 0x00,
    0xF8, 0xB4, 0x13, 0x51, 0x35, 0x51, 0x51, 0x19, 0x01, 0x00
};

constexpr uint8_t WIDTH = 250;
constexpr uint8_t HEIGHT = 122;

constexpr uint8_t COLS = 136;
constexpr uint8_t ROWS = 250;
constexpr uint8_t OFFSET_X = 0;
constexpr uint8_t OFFSET_Y = 6;

uint8_t *buf_b;
uint8_t *buf_r;

SPI spi(MOSI, MISO, SCK);

bool initialized = false;


namespace inkybit {
    void busyWait() {
        while(BUSY.getDigitalValue()) {
            uBit.sleep(50);
        }
    }

    void spiCommand(uint8_t command, const uint8_t *data, int len) {
        CS.setDigitalValue(CS_ACTIVE);
        DC.setDigitalValue(DC_COMMAND);
        spi.write(command);
        if (len > 0) {
            DC.setDigitalValue(DC_DATA);
            for(auto x = 0; x < len; x++){
                spi.write(data[x]);
            }
        }
        CS.setDigitalValue(CS_INACTIVE);
    }

    void spiCommand(uint8_t command) {
        spiCommand(command, NULL, 0);
    }

    void spiCommand(uint8_t command, std::initializer_list<uint8_t> data) {
        CS.setDigitalValue(CS_ACTIVE);
        DC.setDigitalValue(DC_COMMAND);
        spi.write(command);
        DC.setDigitalValue(DC_DATA);
        for(auto c : data){
            spi.write(c);
        }
        CS.setDigitalValue(CS_INACTIVE);
    }

    void spiData(uint8_t *data, int len) {
        CS.setDigitalValue(CS_ACTIVE);
        DC.setDigitalValue(DC_DATA);
	    for(auto x = 0; x < len; x++){
            spi.write(data[x]);
	    }
        CS.setDigitalValue(CS_INACTIVE);
    }

    //%
    void clear() {
        memset(buf_b, 0xff, (COLS / 8) * ROWS);
        memset(buf_r, 0x00, (COLS / 8) * ROWS);
    }

    //%
    void setPixel(int x, int y, int color) {
        if(x >= WIDTH) return;
        if(y >= HEIGHT) return;
        y += OFFSET_Y;
        y = COLS - 1 - y;
        uint8_t shift = 7 - (y % 8);
        y /= 8;
        uint16_t offset = (x * (COLS / 8)) + y;

        uint8_t byte_b = buf_b[offset] | (0b1 << shift);
        uint8_t byte_r = buf_r[offset] & ~(0b1 << shift);

        if(color == 2) {
            byte_r |= 0b1 << shift;
        }
        if(color == 1) {
            byte_b &= ~(0b1 << shift);
        }

        buf_b[offset] = byte_b;
        buf_r[offset] = byte_r;
    }

    //%
    void show() {
        RESET.setDigitalValue(0);
        uBit.sleep(100);
        RESET.setDigitalValue(1);
        uBit.sleep(100);

        spiCommand(0x12);
        uBit.sleep(500);
        busyWait();

        spiCommand(DRIVER_CONTROL, {ROWS - 1, (ROWS - 1) >> 8, 0x00});
        spiCommand(WRITE_DUMMY, {0x1B});
        spiCommand(WRITE_GATELINE, {0x0B});
        spiCommand(DATA_MODE, {0x03});
        spiCommand(SET_RAMXPOS, {0x00, COLS / 8 - 1});
        spiCommand(SET_RAMYPOS, {0x00, 0x00, (ROWS - 1) & 0xFF, (ROWS - 1) >> 8});
        spiCommand(WRITE_VCOM, {0x70});
        spiCommand(WRITE_LUT, luts, sizeof(luts));
        spiCommand(SET_RAMXCOUNT, {0x00});
        spiCommand(SET_RAMYCOUNT, {0x00, 0x00});
        
        spiCommand(WRITE_RAM);
        spiData(buf_b, (COLS / 8) * ROWS);
        spiCommand(WRITE_ALTRAM);
        spiData(buf_r, (COLS / 8) * ROWS);

        busyWait();
        spiCommand(MASTER_ACTIVATE);
    }

    //%
    void init() {
        if(initialized) return;

        buf_b = (uint8_t *)malloc((COLS / 8) * ROWS);
        buf_r = (uint8_t *)malloc((COLS / 8) * ROWS);
        clear();

        initialized = true;
    }
}

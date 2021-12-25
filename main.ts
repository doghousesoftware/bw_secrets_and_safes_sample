function notifyAlarm () {
    if (OnOrOff == 1) {
        soundAlarmOrDoServo()
        blinkLights()
        notifySafe(2)
        showBoxState(2)
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    OnOrOff = receivedNumber
    showBoxState(receivedNumber)
})
function soundAlarmOrDoServo () {
    for (let index = 0; index < 2; index++) {
        music.playMelody("C5 D C5 D C5 D C5 D ", 120)
    }
}
input.onButtonPressed(Button.A, function () {
    OnOrOff = 1
    basic.showString("ON")
    notifySafe(OnOrOff)
})
function notifySafe (state: number) {
    basic.showNumber(state)
    radio.sendNumber(state)
}
function blinkLights () {
    for (let index = 0; index < 4; index++) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.pause(500)
    }
}
input.onButtonPressed(Button.B, function () {
    OnOrOff = 0
    basic.showString("OFF")
    notifySafe(OnOrOff)
})
input.onPinPressed(TouchPin.P1, function () {
    basic.showString("OPENED")
    notifyAlarm()
})
function showBoxState (boxState: number) {
    basic.showNumber(boxState)
    if (boxState == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (boxState == 1) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.Sad)
    }
}
let OnOrOff = 0
radio.setGroup(23)

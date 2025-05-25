input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    tempo += -5
    basic.showString("-")
})
maqueen.irEvent(function (message) {
    // Fernbedienung taste1
    // Fernbedienung taste2
    // Fernbedienung taste1
    if (message == 221) {
        fahren = true
    } else if (message == 61) {
        drehen = true
    } else if (message == 31) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, tempo)
        basic.pause(5000)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 0)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    tempo += 5
    basic.showString("+")
})
let drehen = false
let fahren = false
let tempo = 0
basic.showString("hi!")
music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.InBackground)
tempo = 50
maqueen.setColor(0x0000ff)
basic.forever(function () {
    if (fahren == true) {
        fahren = false
        maqueen.setColor(0xff0000)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, tempo)
        basic.pause(5000)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
        maqueen.setColor(0x000000)
    } else if (drehen == true) {
        drehen = false
        maqueen.setColor(0x00ff00)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 25)
        basic.pause(5000)
        maqueen.setColor(0x000000)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 0)
    }
})

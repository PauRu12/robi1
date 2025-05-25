input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    tempo += -5
    basic.showString("-")
    basic.pause(1000)
    basic.clearScreen()
})
maqueen.irEvent(function (message) {
    // Fernbedienung taste1
    // Fernbedienung taste2
    // Fernbedienung taste1
    // Fernbedienung taste4
    // Fernbedienung taste5
    // Fernbedienung taste6
    if (message == 221) {
        fahren = true
    } else if (message == 61) {
        drehen = true
    } else if (message == 31) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, tempo)
        basic.pause(5000)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 0)
    } else if (message == 111) {
        Linienfahrt = true
        zähler1 = 0
    } else if (message == 151) {
        tempo2 += 5
    } else if (message == 79) {
        tempo2 += -5
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    tempo += 5
    basic.showString("+")
    basic.pause(1000)
    basic.clearScreen()
})
let zähler1 = 0
let Linienfahrt = false
let drehen = false
let fahren = false
let tempo = 0
basic.showString("hi!")
music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.InBackground)
tempo = 50
maqueen.setColor(0x0000ff)
let tempo2 = 45
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
    } else if (Linienfahrt == true) {
        maqueen.setColor(0xff00ff)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 20)
        if (maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Bright) && maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Bright)) {
            zähler1 += 1
            if (zähler1 > 10) {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
                Linienfahrt = false
                maqueen.setColor(0x000000)
            }
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Bright)) {
            zähler1 = 0
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, tempo2)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Bright)) {
            zähler1 = 0
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, tempo2)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        } else {
            zähler1 = 0
        }
    }
})

enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
}
/**
 * also part of aaron's walking speed code
 */
/**
 * Aaron made the double jump mech.
 */
/**
 * Aaron made the part that goes to the next level.
 */
/**
 * kaleb made all 3 of these, the void parts. this code allows for it to kill the player instantly
 */
/**
 * the message for when a flier hits you and you lose a life
 */
/**
 * when you pick up a coin, what happens when you do so.
 */
/**
 * kaleb made the flying animation. kaleb made the animation for the character, kind of buggy though, doesn't work sometimes .kaleb made the animation for the idle, also buggy.
 */
/**
 * kaleb made the jumping animations as well as all the other animations
 */
/**
 * Aaron made the level changing system
 */
/**
 * this function clears the level after you exit it I believe. Aaron made this
 */
/**
 * this code is for how the monsters are created.
 */
/**
 * kaleb made this. it is just an array of wherever this tile is placed, is where the character will spawn.
 */
/**
 * both Aaron and Kaleb aided in making the pickup/kill effects of the monsters/coins
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(1)
        music.spooky.play()
    } else {
        info.changeLifeBy(-1)
        sprite.say("ow, what the-", invincibilityPeriod)
        music.bigCrash.play()
    }
    pause(invincibilityPeriod)
})
function initializeAnimations () {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile19`, function (sprite, location) {
    info.changeLifeBy(-1000)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    info.changeLifeBy(-1000)
})
/**
 * kaleb made the animation of the coins within the level
 */
function initializeCoinAnimation () {
    coinAnimation = animation.createAnimation(ActionKind.Walking, 200)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . . 
        . . . f f c c c c c c c f f . . . 
        . . f c c c c c c c c c c c f . . 
        . . f c c c c c c c c c c c f . . 
        . f c c c c c c c c c c c c c f . 
        . f c f f f f c c c f f f f c f . 
        f c f f f f f c c c f f f f f c f 
        f c f f f f f c c c f f f f f c f 
        f c f f f f f c c c f f f f f c f 
        . f c f f f c c c c c f f f c f . 
        . . f c c c c f f f c c c c f . . 
        . . . f c c c f f f c c c f . . . 
        . . . f c c c c c c c c c f . . . 
        . . . f c c f c c c f c c f . . . 
        . . . . f f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . . 
        . . . f f c c c c c c c f f . . . 
        . . f c c c c c c c c c c c f . . 
        . . f c c c c c c c c c c c f . . 
        . f c c c c c c c c c c c c c f . 
        . f c f f f f c c c f f f f c f . 
        f c f f f f f c c c f f f f f c f 
        f c f f f f f c c c f f f f f c f 
        f c d f f f f c c c f f f f d c f 
        . f c d f f c c c c c f f d c f . 
        . . f c c c c f f f c c c c f . . 
        . . . f c c c f f f c c c f . . . 
        . . . f c c c c c c c c c f . . . 
        . . . f c c f c c c f c c f . . . 
        . . . . f f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . . 
        . . . f f c c c c c c c f f . . . 
        . . f c c c c c c c c c c c f . . 
        . . f c c c c c c c c c c c f . . 
        . f c c c c c c c c c c c c c f . 
        . f c f f f f c c c f f f f c f . 
        f c f f f f f c c c f f f f f c f 
        f c d f f f f c c c f f f f d c f 
        f c d f f f f c c c f f f f d c f 
        . f c d d f c c c c c f d d c f . 
        . . f c c c c f f f c c c c f . . 
        . . . f c c c f f f c c c f . . . 
        . . . f c c c c c c c c c f . . . 
        . . . f c c f c c c f c c f . . . 
        . . . . f f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . . 
        . . . f f c c c c c c c f f . . . 
        . . f c c c c c c c c c c c f . . 
        . . f c c c c c c c c c c c f . . 
        . f c c c c c c c c c c c c c f . 
        . f c f f f f c c c f f f f c f . 
        f c d f f f f c c c f f f f d c f 
        f c d f f f f c c c f f f f d c f 
        f c d f f f d c c c d f f f d c f 
        . f c d d d c c c c c d d d c f . 
        . . f c c c c f f f c c c c f . . 
        . . . f c c c f f f c c c f . . . 
        . . . f c c c c c c c c c f . . . 
        . . . f c c f c c c f c c f . . . 
        . . . . f f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(3)
    music.spooky.play()
})
/**
 * aaron made the attempt to double jump code. just see if you can double jump then sets your velocity for the double jump.
 */
function attemptJump () {
    if (guy.isHittingTile(CollisionDirection.Bottom)) {
        guy.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (guy.vy >= -40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            guy.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        guy.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(guy, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . . f e e e e e f f f . 
        . f e e e e e e e f f f 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        . f e 4 4 f f 4 e 4 f f 
        . . f d d d d 4 d 4 f . 
        . . f b b d e e f f f . 
        . . f e 4 e d d 4 f . . 
        . . f 1 1 e d d e f . . 
        . f f 6 6 f e e f f f . 
        . f f f f f f f f f f . 
        . . f f f . . . f f . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(guy, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . f f f e e e e e f . . 
        f f f e e e e e e e f . 
        f f f f e e e e e e e f 
        f f f f f e e e 4 e e f 
        f f f f e e e 4 4 e e f 
        f f f f 4 4 4 4 4 e f f 
        f f 4 e 4 f f 4 4 e f . 
        f f 4 d 4 d d d d f . . 
        . f f f 4 d d b b f . . 
        . 4 d d e 4 4 4 e f . . 
        . e d d e 1 1 1 1 f . . 
        . f e e f 6 6 6 6 f f . 
        . f f f f f f f f f f . 
        . . f f . . . f f f . . 
        `)
}
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 4) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 5) {
        tiles.setTilemap(tilemap`level_4`)
    } else if (level == 6) {
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 7) {
        tiles.setTilemap(tilemap`level_6`)
    } else if (level == 8) {
        tiles.setTilemap(tilemap`level_8`)
    }
    initializeLevel(level)
}
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Flying, 100)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 8 . . . . . 
        . . 2 2 . . . . . . 8 8 8 . . . 
        . 2 8 8 8 . . . . . 2 2 2 2 . . 
        . 8 8 8 8 f f f . 8 8 f f f 2 . 
        . 8 8 8 8 f f f 8 8 f 7 7 f 2 2 
        . . 8 8 f f f f f f f f 7 f 2 . 
        . . . 8 f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . 8 . . 2 f f f f f f 8 . . . 
        . 8 8 2 2 2 2 f f f 8 8 8 8 . . 
        . . 8 8 2 2 2 . f f 8 8 8 8 8 . 
        . . . 2 2 2 . . . . . 2 8 8 8 . 
        . . . . . . . . . . . . 2 2 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 8 . . . . . 
        . . 2 2 . . . . 2 2 8 8 8 . . . 
        . 2 2 8 8 . . . 2 2 2 2 2 2 . . 
        . 2 2 8 8 f f f . 8 8 f f f 2 . 
        2 2 8 8 8 f f f 8 8 f 7 7 f 2 2 
        2 . 8 8 f f f f f f f f 7 f 2 . 
        . . . 8 f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . 8 . . 2 f f f f f f 8 . . . 
        2 2 8 8 2 2 2 f f f 8 8 8 8 . . 
        . 2 2 8 8 8 2 . f f 8 8 8 8 2 2 
        . . . 2 2 8 8 . . . . 2 2 2 2 . 
        . . . . . . 8 8 . . . . 2 2 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 8 8 . . . . 
        . . . 8 8 . . . 2 2 2 2 2 2 . . 
        . . 2 8 8 f f f . 8 8 f f f 2 . 
        . . 8 8 8 f f f 8 8 f 7 7 f 2 . 
        . . 8 8 f f f f f f f f 7 f 2 . 
        . . . 8 f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . 8 . . 2 f f f f f f 8 . . . 
        . . 8 8 2 2 2 f f f 8 8 8 8 . . 
        . . 2 8 8 8 2 . f f 8 8 8 8 2 . 
        . . . . . 8 8 . . . . 2 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 . . . . . . 
        . . 8 8 . . . . . 2 2 2 . . . . 
        . 8 8 8 8 . . . . . 2 2 2 2 . . 
        . 8 8 8 8 f f f . 8 8 f f f 2 . 
        . 8 8 8 8 f f f 8 8 f 7 7 f 2 2 
        . . 8 8 f f f f f f f f 7 f 2 2 
        . . . 8 f f f f f f f f f f 2 2 
        . . . f f f f f f f f f f f 2 2 
        . . . . . 2 f f f f f f 8 . . 2 
        . . . 2 2 2 2 f f f 8 8 8 8 . . 
        . . 2 2 2 2 2 . f f 8 8 8 8 8 . 
        . . . 2 2 2 2 . . . . 8 8 8 8 . 
        . . . 2 2 . . . . . . 8 8 8 8 . 
        . . . 2 . . . . . . . 8 8 8 . . 
        . . . . . . . . . . . . 8 . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 8 . . . . . 
        . . 2 2 . . . . 2 2 8 8 8 . . . 
        . 2 2 8 8 . . . 2 2 2 2 2 2 . . 
        . 2 2 8 8 f f f . 8 8 f f f 2 . 
        2 2 8 8 8 f f f 8 8 f 7 7 f 2 2 
        2 . 8 8 f f f f f f f f 7 f 2 . 
        . . . 8 f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . 8 . . 2 f f f f f f 8 . . . 
        2 2 8 8 2 2 2 f f f 8 8 8 8 . . 
        . 2 2 8 8 8 2 . f f 8 8 8 8 2 2 
        . . . 2 2 8 8 . . . . 2 2 2 2 . 
        . . . . . . 8 8 . . . . 2 2 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierIdle = animation.createAnimation(ActionKind.Flying, 100)
    flierIdle.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 . . . . . . 
        . . 8 8 . . . . . 2 2 2 . . . . 
        . 8 8 8 8 . . . . . 2 2 2 2 . . 
        . 8 8 8 8 f f f . 8 8 f f f 2 . 
        . 8 8 8 8 f f f 8 8 f 7 7 f 2 2 
        . . 8 8 f f f f f f f f 7 f 2 2 
        . . . 8 f f f f f f f f f f 2 2 
        . . . f f f f f f f f f f f 2 2 
        . . . . . 2 f f f f f f 8 . . 2 
        . . . 2 2 2 2 f f f 8 8 8 8 . . 
        . . 2 2 2 2 2 . f f 8 8 8 8 8 . 
        . . . 2 2 2 2 . . . . 8 8 8 8 . 
        . . . 2 2 . . . . . . 8 8 8 8 . 
        . . . 2 . . . . . . . 8 8 8 . . 
        . . . . . . . . . . . . 8 . . . 
        `)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(guy, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . . f e e e e e f f f . 
        . f e e e e e e e f f f 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        . f e 4 4 f f 4 e 4 f f 
        . . f d d d d 4 d 4 f f 
        . . f b b d d 4 f f f . 
        . . f e 4 4 4 e d d 4 . 
        . . f 1 1 1 1 e d d e . 
        . f f 6 6 6 6 f e e f . 
        . f f f f f f f f f f . 
        . . f f f . . . f f . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . . f e e e e e f f f . 
        . f e e e e e e e f f f 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        . f e 4 4 f f 4 e 4 f f 
        . . f d d d d 4 d 4 f . 
        . . f b b d e e f f f . 
        . . f e 4 e d d 4 f . . 
        . . f 1 1 e d d e f . . 
        . f f 6 6 f e e f f f . 
        . f f f f f f f f f f . 
        . . f f f . . . f f . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . f f f f f . . . . 
        . . f e e e e e f f . . 
        . f e e e e e e e f f . 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        f f e 4 4 f f 4 e 4 f f 
        . f f d d d d 4 d 4 f . 
        . . f b b d d 4 f f f . 
        . . f e 4 4 4 e e f . . 
        . . f 1 1 1 e d d 4 . . 
        . . f 1 1 1 e d d e . . 
        . . f 6 6 6 f e e f . . 
        . . . f f f f f f . . . 
        . . . . . f f f . . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(guy, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . f f f e e e e e f . . 
        f f f e e e e e e e f . 
        f f f f e e e e e e e f 
        f f f f f e e e 4 e e f 
        f f f f e e e 4 4 e e f 
        f f f f 4 4 4 4 4 e f f 
        f f 4 e 4 f f 4 4 e f . 
        f f 4 d 4 d d d d f . . 
        . f f f 4 d d b b f . . 
        . 4 d d e 4 4 4 e f . . 
        . e d d e 1 1 1 1 f . . 
        . f e e f 6 6 6 6 f f . 
        . f f f f f f f f f f . 
        . . f f . . . f f f . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . f f f e e e e e f . . 
        f f f e e e e e e e f . 
        f f f f e e e e e e e f 
        f f f f f e e e 4 e e f 
        f f f f e e e 4 4 e e f 
        f f f f 4 4 4 4 4 e f f 
        f f 4 e 4 f f 4 4 e f . 
        . f 4 d 4 d d d d f . . 
        . f f f e e d b b f . . 
        . . f 4 d d e 4 e f . . 
        . . f e d d e 1 1 f . . 
        . f f f e e f 6 6 f f . 
        . f f f f f f f f f f . 
        . . f f . . . f f f . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . f f f f f . . . 
        . . f f e e e e e f . . 
        . f f e e e e e e e f . 
        f f f f e e e e e e e f 
        f f f f f e e e 4 e e f 
        f f f f e e e 4 4 e e f 
        f f f f 4 4 4 4 4 e f f 
        f f 4 e 4 f f 4 4 e f f 
        . f 4 d 4 d d d d f f . 
        . f f f 4 d d b b f . . 
        . . f e e 4 4 4 e f . . 
        . . 4 d d e 1 1 1 f . . 
        . . e d d e 1 1 1 f . . 
        . . f e e f 6 6 6 f . . 
        . . . f f f f f f . . . 
        . . . . f f f . . . . . 
        `)
}
function animateJumps () {
    mainJumpLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(guy, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . . f e e e e e f f f . 
        . f e e e e e e e f f f 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        . f e 4 4 f f 4 e 4 f f 
        . . f d d d d 4 d 4 f f 
        . . f b b d d 4 f f f . 
        . . f e 4 4 4 e d d 4 . 
        . . f 1 1 1 1 e d d e . 
        . f f 6 6 6 6 f e e f . 
        . f f f f f f f f f f . 
        . . f f f . . . f f . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . . f e e e e e f f f . 
        . f e e e e e e e f f f 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        . f e 4 4 f f 4 e 4 f f 
        . . f d d d d 4 d 4 f . 
        . . f b b d e e f f f . 
        . . f e 4 e d d 4 f . . 
        . . f 1 1 e d d e f . . 
        . f f 6 6 f e e f f f . 
        . f f f f f f f f f f . 
        . . f f f . . . f f . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . f f f f f . . . . 
            . . f e e e e e f f . . 
            . f e e e e e e e f f . 
            f e e e e e e e f f f f 
            f e e 4 e e e f f f f f 
            f e e 4 4 e e e f f f f 
            f f e 4 4 4 4 4 f f f f 
            f f e 4 4 f f 4 e 4 f f 
            . f f d d d d 4 d 4 f . 
            . . f b b d d 4 f f f . 
            . . f e 4 4 4 e e f . . 
            . . f 1 1 1 e d d 4 . . 
            . . f 1 1 1 e d d e . . 
            . . f 6 6 6 f e e f . . 
            . . . f f f f f f . . . 
            . . . . . f f f . . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(guy, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . f f f e e e e e f . . 
        f f f e e e e e e e f . 
        f f f f e e e e e e e f 
        f f f f f e e e 4 e e f 
        f f f f e e e 4 4 e e f 
        f f f f 4 4 4 4 4 e f f 
        f f 4 e 4 f f 4 4 e f . 
        f f 4 d 4 d d d d f . . 
        . f f f 4 d d b b f . . 
        . 4 d d e 4 4 4 e f . . 
        . e d d e 1 1 1 1 f . . 
        . f e e f 6 6 6 6 f f . 
        . f f f f f f f f f f . 
        . . f f . . . f f f . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . f f f e e e e e f . . 
        f f f e e e e e e e f . 
        f f f f e e e e e e e f 
        f f f f f e e e 4 e e f 
        f f f f e e e 4 4 e e f 
        f f f f 4 4 4 4 4 e f f 
        f f 4 e 4 f f 4 4 e f . 
        . f 4 d 4 d d d d f . . 
        . f f f e e d b b f . . 
        . . f 4 d d e 4 e f . . 
        . . f e d d e 1 1 f . . 
        . f f f e e f 6 6 f f . 
        . f f f f f f f f f f . 
        . . f f . . . f f f . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . f f f f f . . . 
            . . f f e e e e e f . . 
            . f f e e e e e e e f . 
            f f f f e e e e e e e f 
            f f f f f e e e 4 e e f 
            f f f f e e e 4 4 e e f 
            f f f f 4 4 4 4 4 e f f 
            f f 4 e 4 f f 4 4 e f f 
            . f 4 d 4 d d d d f f . 
            . f f f 4 d d b b f . . 
            . . f e e 4 4 4 e f . . 
            . . 4 d d e 1 1 1 f . . 
            . . e d d e 1 1 1 f . . 
            . . f e e f 6 6 6 f . . 
            . . . f f f f f f . . . 
            . . . . f f f . . . . . 
            `)
    }
}
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("what the- they can fly!?", invincibilityPeriod * 1.5)
    music.bigCrash.play()
    pause(invincibilityPeriod * 1.5)
})
function createEnemies () {
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        bumper = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 9 9 9 9 9 9 . . . . . . 
            . . . 9 f f f f f f 9 . . . . . 
            . . 9 f 9 9 9 9 9 f f 9 . . . . 
            . 9 f 9 d d d d d 9 f f 9 . . . 
            . 9 f 9 d c c c d 9 f f f 9 . . 
            9 f f 9 d c 7 c d 9 f f f 9 . . 
            9 f f 9 d c c c d 9 f f f f 9 . 
            9 f f 9 d d d d d 9 f f f f f 9 
            9 f f f 9 9 9 9 9 f f f f f f 9 
            . 9 f f f f f f f f f f f f f 9 
            . 9 f f f f f f f f f f f f f 9 
            . . 9 f f f f f f f f f f f f 9 
            . . . 9 f f f f f f f f f f 9 . 
            . . . . 9 9 f f f f f f f 9 . . 
            . . . . . . 9 9 9 9 9 9 9 . . . 
            `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
    for (let value6 of tiles.getTilesByType(assets.tile`flier`)) {
        flier = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . 2 . . . . . . 
            . . 8 8 . . . . . 2 2 2 . . . . 
            . 8 8 8 8 . . . . . 2 2 2 2 . . 
            . 8 8 8 8 f f f . 8 8 f f f 2 . 
            . 8 8 8 8 f f f 8 8 f 7 7 f 2 2 
            . . 8 8 f f f f f f f f 7 f 2 2 
            . . . 8 f f f f f f f f f f 2 2 
            . . . f f f f f f f f f f f 2 2 
            . . . . . 2 f f f f f f 8 . . 2 
            . . . 2 2 2 2 f f f 8 8 8 8 . . 
            . . 2 2 2 2 2 . f f 8 8 8 8 8 . 
            . . . 2 2 2 2 . . . . 8 8 8 8 . 
            . . . 2 2 . . . . . . 8 8 8 8 . 
            . . . 2 . . . . . . . 8 8 8 . . 
            . . . . . . . . . . . . 8 . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    info.changeLifeBy(-1000)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(guy.isHittingTile(CollisionDirection.Bottom))) {
        guy.vy += 80
    }
})
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.smallCrash.play()
    info.changeScoreBy(1)
}
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateJumps()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`goal`, function (sprite, location) {
    info.changeLifeBy(1)
    currentLevel += 1
    if (hasNextLevel()) {
        setLevelTileMap(currentLevel)
    } else {
        game.setDialogFrame(img`
            8 f 8 8 8 8 8 f 8 8 8 8 8 f 8 
            f f 8 8 8 8 8 f 8 8 8 8 8 f f 
            8 8 f 8 8 8 8 f 8 8 8 8 f 8 8 
            8 8 8 f 8 8 8 f 8 8 8 f 8 8 8 
            8 8 8 8 f 8 8 f 8 8 f 8 8 8 8 
            8 8 8 8 8 f 8 f 8 f 8 8 8 8 8 
            8 8 8 8 8 8 f 8 f 8 8 8 8 8 8 
            f f f f f f 8 f 8 f f f f f f 
            8 8 8 8 8 8 f 8 f 8 8 8 8 8 8 
            8 8 8 8 8 f 8 f 8 f 8 8 8 8 8 
            8 8 8 8 f 8 8 f 8 8 f 8 8 8 8 
            8 8 8 f 8 8 8 f 8 8 8 f 8 8 8 
            8 8 f 8 8 8 8 f 8 8 8 8 f 8 8 
            f f 8 8 8 8 8 f 8 8 8 8 8 f f 
            8 f 8 8 8 8 8 f 8 8 8 8 8 f 8 
            `)
        game.showLongText("congrats.", DialogLayout.Full)
        game.showLongText("you escaped with your life.", DialogLayout.Full)
        game.showLongText("now do it again.", DialogLayout.Full)
        game.setGameOverEffect(true, effects.slash)
        game.gameOver(true)
    }
})
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}
function initializeLevel (level: number) {
    playerStartLocation = tiles.getTilesByType(assets.tile`guy`)[0]
    tiles.placeOnTile(guy, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    spawnGoals()
}
function hasNextLevel () {
    return currentLevel != levelCount
}
/**
 * Aaron created the spawn array of the coins
 */
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(assets.tile`skul`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . . f 2 2 2 2 2 2 f . . . . 
            . . . f 2 f 2 2 2 2 f 2 f . . . 
            . . . f 2 2 2 2 2 2 2 2 f . . . 
            . . . f 2 2 2 2 2 2 2 2 f . . . 
            . . . f 2 2 f 2 2 f 2 2 f . . . 
            . . . . f 2 2 f f 2 2 f . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Walking)
        tiles.setTileAt(value7, assets.tile`tile0`)
    }
}
/**
 * kaleb made the on start commands as well as the art for the game
 */
let heroFacingLeft = false
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let flier: Sprite = null
let bumper: Sprite = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let doubleJumpSpeed = 0
let canDoubleJump = false
let coinAnimation: animation.Animation = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let guy: Sprite = null
game.setDialogTextColor(11)
game.setDialogCursor(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 8 8 8 8 2 b . . . . . . 
    . . . 8 8 b . 8 8 2 b . . . . . 
    . . . 8 2 c . . 8 8 b . . . . . 
    . . . 2 2 c . . 8 8 c . . . . . 
    . . . 8 2 9 9 9 8 8 c . . . . . 
    . . . 8 8 8 8 8 8 8 9 . . . . . 
    . . . . 2 8 8 2 2 8 9 . . . . . 
    . . . . . . . . 2 8 9 . . . . . 
    . . . . . . . . . 8 9 . 2 2 . . 
    . . . . . . . . . 8 8 . 8 8 . . 
    . . . . . . . . . 8 2 . 8 9 . . 
    . . . . . . . . . 8 2 2 8 9 . . 
    . . . . . . . . . 8 8 8 8 9 . . 
    . . . . . . . . . . . . . . . . 
    `)
game.setDialogFrame(img`
    f 8 f f f f f f f f 8 f f f 8 
    8 f 2 f f f 2 f 8 f f f f f f 
    f f f f 2 f f f f f 2 f f f 2 
    f f 2 f f f 8 f 8 f f f f f f 
    f f f f 2 f f f f f f f 2 f 8 
    2 f f f f 8 f 2 f f 2 f f f f 
    f f f f f f f f f f f f 2 f 8 
    f 2 f f 8 f f f f 2 f f f f f 
    8 f f f f f f 2 f f f f 2 f 8 
    f f f f f 8 f f 8 f f f f f f 
    f 8 f f f f f f f f f f 2 f f 
    8 f 2 f f f f f f 8 f f f f f 
    f f f f f 8 f f 2 f f 2 f f 8 
    2 f f 8 f f f f f f f f f 2 f 
    f f 8 f 8 f f f f f f f f f 8 
    `)
game.showLongText("There's Something In The Grass.                                                                                                     press q to play.", DialogLayout.Full)
guy = sprites.create(img`
    . . . . . . . . . . . . 
    . . . f f f f f f . . . 
    . f f f e e e e e f . . 
    f f f e e e e e e e f . 
    f f f f e e e e e e e f 
    f f f f f e e e 4 e e f 
    f f f f e e e 4 4 e e f 
    f f f f 4 4 4 4 4 e f f 
    f f 4 e 4 f f 4 4 e f . 
    f f 4 d 4 d d d d f . . 
    . f f f 4 d d b b f . . 
    . 4 d d e 4 4 4 e f . . 
    . e d d e 1 1 1 1 f . . 
    . f e e f 6 6 6 6 f f . 
    . f f f f f f f f f f . 
    . . f f . . . f f f . . 
    `, SpriteKind.Player)
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.setBackgroundImage(img`
    fffffffffffffffffff777fffffffffffffffffffffffffffffffffffffffffffffffffffbb77777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffbd66dddddddbbbbdd77dbfff
    ffffffffffffffffffbb77777777ffffffffffffffffffffffffffffffffffffffffffffbbbbbb777ffffffffffffffffffffffffffffffffffffffffffffffffffffffbd66ddddddddddbbbbd77dbff
    fffffffffffffffffbbbbbb777777fffffffffffffffffffffffffffffff1ffffffffffbbbbbbb7777ffffffffffffffffffffffffffffffffffffffffffffffffffffbd66ddd77ddddddddddbd77dbf
    ffffffffffffffffbbbbbbbb77777fffffffffffffffffffffffffffffffffffffffffbbbbbbbbbb7777777ffffffffffffff1fffffffffffffffffffffffffffffffbdb6dbbdd777ddddddddddd7ddb
    ffffffffffbbbbbbbbbbbbbbbb7777777ffffffffff1ffffffffffffffffffffffffffbbbbbbbbbbbbb777777ffffffffffffffffffffffffffffffffffff1fffffffbdbdbbbbdddd77ddddddddddddb
    fffffffffbbbbbbbbbbbbbbbbbb7777777ffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbb77ffffffffffffffffffffffffffffffffffffffffffbddddbbbbddddd777ddddddddddd
    ffffffffbbbbbbbbbbbbbbbbbbbbbbbbb777fffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbb77ffffffffffffffffffffffffffffffffffffffffffbdddddbbbddddddd77dddddddddd
    fffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbb777777ffffffffffffffff1fffffffffffffffffffbddddddddddddddddd7dddddddddd
    ffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbb777777fffffffffffffffffffffffffffffffffffbdddddddddd7ddddddd7ddbbbbddd
    ffffff66bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb777ffffffffffffffffffffffffffffffffffbdddddddd77dddddddd7dddbbbbdd
    ffffff6666bbbbbbbbbbbbbbbbbbbbb6666b6666ffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb777fffffffffffffffffffffffffffffffffbdddbdddd7dddbbbdddd7ddbbbddd
    fffffff6666666666666bbbbb666666666666666ffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffbdddbdddd77ddbbbbdddd7dbddddd
    ffffffffff66666666666666666666666ff666ffffffffffffff1fffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffbddbbbbddd7ddbbbbbddddddddddd
    ffffffffffffffffff6666666fffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffff1fffffbddbbbbdd7dddbddddddddd77777d
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbb6666bbbbbbbbbbbbbbbbbffffffffffffffff1ffffffffffffffffbdddbbdddddddddddddddd77ddddd
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6bbb66bbbbbbbb6666666666666bbbbbb666ffffffff1ffffffffffffffffffffffffbdddbbdddddd7777ddddddddddddd
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6666666666666666666666666666bbb66666fffffffffffffffffffffffffffffffffbddbbdddddddddd7777dddddddbdd
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff66666666666666fff66666666666666666ffffffffffffffffffffffffffffffffffbdddbddddddddddddddddddddbbdd
    ffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffff666666666666fffffffffff666666666ffffffffffffffffffffffffffffffffffffbdbdbbdddbbbbddddddddddbbbdd
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6666666fffffffffffffffffffffffffffffffffffffbdddddddddbbbdddddddddbbbddd
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbddddddddbbbddddddddbbbbddb
    fffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbd66dddddddbdddddddbbbbdddb
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffbd66dddddddddddddbbbbdddbf
    fffffffffffffffffffffffff1ffffffff1fffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbd666bddddddddddbbd7ddbff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffbdd6666ddddddd77777dbfff
    ffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbdd6666777777dddbbffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffbbdd6666dddddbbffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffff1ffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffff1fffffffffffffffffff1ffff
    ffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffff1fffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffff1ffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffff1ffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffff1fff
    fffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff8fff8fff8fff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8fff8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8fff8fff8fff8fff8fff8fff8fff8fff8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8f8f8fff8fff8fff8fff8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f
    f8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8fffffff8ffffffffffffffffffffffffffffff
    8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
initializeAnimations()
createPlayer(guy)
levelCount = 8
currentLevel = 0
setLevelTileMap(currentLevel)
music.play(music.createSoundEffect(WaveShape.Noise, 4122, 4102, 32, 33, 9999, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.LoopingInBackground)
game.showLongText("you have been sent here to complete a series of obstacles.", DialogLayout.Bottom)
game.showLongText("you must collect as many skulls as possible along the way.", DialogLayout.Bottom)
game.showLongText("be careful, there will be many monsters along your way.", DialogLayout.Bottom)
game.showLongText("good luck.", DialogLayout.Bottom)
game.onUpdate(function () {
    if (guy.vx < 0) {
        heroFacingLeft = true
    } else if (guy.vx > 0) {
        heroFacingLeft = false
    }
    if (guy.isHittingTile(CollisionDirection.Top)) {
        guy.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(guy, ActionKind.Walking)
        } else {
            animation.setAction(guy, ActionKind.Walking)
        }
    } else if (guy.vy < 20 && !(guy.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(guy, ActionKind.Walking)
        } else {
            animation.setAction(guy, ActionKind.Walking)
        }
    } else if (guy.vx < 0) {
        animation.setAction(guy, ActionKind.Walking)
    } else if (guy.vx > 0) {
        animation.setAction(guy, ActionKind.Walking)
    } else {
        if (heroFacingLeft) {
            animation.setAction(guy, ActionKind.Walking)
        } else {
            animation.setAction(guy, ActionKind.Walking)
        }
    }
})
/**
 * kaleb made all 3 of these, the void parts. this code allows for it to kill the player instantly
 */
game.onUpdate(function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value8.x - guy.x) < 60) {
            if (value8.x - guy.x < -5) {
                value8.vx = 25
            } else if (value8.x - guy.x > 5) {
                value8.vx = -25
            }
            if (value8.y - guy.y < -5) {
                value8.vy = 25
            } else if (value8.y - guy.y > 5) {
                value8.vy = -25
            }
            animation.setAction(value8, ActionKind.Walking)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Walking)
        }
    }
})
game.onUpdate(function () {
    if (guy.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})

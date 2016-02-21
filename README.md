# BounceAround
An HTML5 game!

### Take a minute to bounce and spin around! [Play here][http://zgavin1.github.io/BounceAround]


## Overview
In order to explore and learn about HTML5, CSS, and the canvas, I built this awesome trampoline game. Other pieces of the project were JavaScript and jQuery. The objective is to time your bounces (releasing the spacebar) with the trampoline itself, and spin (left and right arrows) to rack up the points.


## Features
### HTML5 Canvas
I use native HTML methods to grab the canvas and draw the game pieces on the screen

#### Jumper
The jumper is a sprite with two states, crouched and uncrouched, in which I display a different part of the sprite sheet.

The jumper's position on the canvas and velocity are calculated with vector mathematics, based on a 'gravity' component.

### The Bounce
When the game enters the state of isBouncing, both the trampoline and jumper components react.
The jumper has his velocity reversed, and multiplied by a certain coefficient, dependent on whether they have timed their "jump" correctly.

### The Trampoline
The trampoline sits near the bottom of the canvas, and reacts to the isBouncing state of the game with recoil, also calculated with vector equations. 

### The Skycam
If the position value of the jumper exceeds the top of the canvas (is below 0), the jumper is drawn in a box called SkyCam, along with his current altitude, so that users can time their next jump with the descent.

$$$ The ScoreBoard and Timer
Both the Score and the Timer are JavaScript classes included in the game to keep track of these vital pieces of information. The score is animated when a player hits each increment of 1000 points and the timer is animated for the final 10 seconds.
#!/usr/bin/env node

const exec = require('child_process').exec

const args = process.argv.splice(2)
const minutes = Number(args[0]) || 25
const message = `${minutes} minutes of focused work just flew by!`

// Verify argument
if (Number.isNaN(minutes) || minutes < 0) {
  throw new Error('Minutes should be a valid integer > 0');
}

// Callback for exec calls
function execCallback(err, res) {
  if (err) {
    console.error('Failed to execute notify-send')
    throw err
  }
}

// Notify of start
exec(`notify-send --urgency=low -a "pomodoro" "Timer set!" "Focus on this specific task for ${minutes} minutes, bro"`)

// Set timer
setTimeout(function () {
  exec(`notify-send --urgency=critical -a "pomodoro" "Time is up!" "${message}"`, execCallback)
}, minutes * 60 * 1000)

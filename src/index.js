#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');

const question = [{
    type: 'input',
    name: 'color',
    message: 'Input color: '
}]

inquirer
    .prompt(question)
    .then(answers => {
        const color = answers.color.trim();
        if (isHex(color)) {
            console.log(chalk.hex(color).bold(hexToRgb(color)));

        } else if (isRgb(color)) {
            const rgbArr = rgbHelp(color);
            console.log(chalk.rgb(...rgbArr).bold(rgbToHex(...rgbArr)));

        } else {
            console.error(chalk.bold.red('Error!\n'), chalk.bold('Template:\n'), chalk.inverse('rgb(255, 255, 255)\n'), chalk.inverse('#ffffff or #fff\n'));
        }
    })
    .catch(error => console.error(error));

const isRgb = color => /^rgb\((\d{1,3}[,]*[ ]*)+\)$/g.test(color);
const isHex = color => /^#([0-9A-F]{3}){1,2}$/i.test(color);

const rgbHelp = str => str.match(/\d+/g).join(' ').split(' ').map(parseFloat);

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('');

const hexToRgb = hex => {
    const rgbArr = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16));

    return `rgb(${rgbArr.join(', ')})`;
}

//console.log(rgbToHex(0, 51, 255)); // #0033ff
//console.log(hexToRgb('#fff')); // rgb(255, 255, 255)
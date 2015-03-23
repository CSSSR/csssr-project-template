#!/bin/sh
rm -rf node_modules
rm -rf app/scripts/libs
rm -rf dist
npm cache clean
npm i
bower cache clean
bower i


# 3Commas_Nodejs_Library
Nodejs 3Commas Library

``` javascript
/*
Input your API info below, or pass it as a param to CommasInit(false, config[object])
CommasInit(true) -- Uses global hardcoded config
CommasInit(false, {key: "", secret: ""}) -- Uses param passed to function
*/

//Example 1:
const Commas = CommasInit(true) //Uses global config var
const addExchange = Commas.addExchange()

//Example 2:
const Commas = CommasInit(false, {key: "XXX" : secret: "XXX"}) //Requires user object literal to be passed in
const addExchange = Commas.addExchange()
```

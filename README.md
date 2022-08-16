# 3Commas_Nodejs_Library
Nodejs 3Commas Library

This is a personal 3Commas Library I created to help expedite connecting and interacting with the 3Commas trading platform. At the time of creation it contains the most up to date endpoints, but by the time you see it it may not be up to date as 3Commas periodically updates their API.

If you need to add a new method, follow the method format that exists already.

For methods that do not require paramaters to be passed in you may use the following as an example:

``` javascript
newMethod: async (opts = false) => {}
```
For methods that do require parameters to be passed into the function please use the following:
``` javascript
newMethod: async (dataToSend = {}, opts = false) => {}
```

Make sure to update these:

`const ep` - with the new endpoint

`const signed` - if it requires secure signing (typically anything account related)

`const method` - with the type of request

`v: 1,` Found in `const map` - Version 1 is object based || Version 2 is JSON based (If 3Commas specifies using JSON use 2, otherwise use 1.. Example would be SmartTradeV2 method)

This is the typical pattern found in each method:

``` javascript
        const mp = "/public/api";
        const ep = `/ver1/accounts/transfer_history`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: {},
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
```

To use the library import it from your file and follow the examples below:
``` javascript
/*
Input your API info below, or pass it as a param to CommasInit(false, config[object] //Optional)
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

# weex.adapter.websocket
A W3C-compliant webSocket object based on the weex webSocket module

# Installation

```js
yarn add weex.adapter.websocket
```

or

```js
npm install weex.adapter.websocket
```

# How to use

```js
var Websocket = require('weex.adapter.websocket')
var ws = new WebSocket('wss://<doman>:<port>')
ws.onopen = function(){}
ws.addEventListener('open',function(){})
ws.onmessage = function(e){}
ws.onclose = function(){}
ws.send('hello word')
```

# When is it used?

- Develop websocket application in weex with W3C standard syntax
- Make existing libraries compatible with weex by replacing them. Such as socket.io-client

# Reference materials
- https://github.com/stackOverMind/WeApp-adapter
- https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket
- https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
const websocket = weex.requireModule('webSocket')
const EventTarget = require('event-target').default;
class WS extends EventTarget {
    constructor(url) {
        super()
        // Weex's socket is a singleton, the previous connection is closed by default.
        if (WS.instance != null) {
            WS.instance.close()
        }

        WS.instance = this

        this.readyState = WS.CONNECTING
        this.onopen = null;
        this.onclose = null;
        this.onerror = null;
        this.onmessage = null;

        websocket.onopen(() => {
            this.readyState = WS.OPEN
            this.onopen && this.onopen.call(this)
            this.dispatchEvent(new CustomEvent({
                'type': 'open'
            }))
        })

        websocket.onmessage((rs) => {
            if (this.readyState !== WS.OPEN && this.readyState !== WS.CLOSING) {
                return
            }
            /* webmessage https://www.w3.org/TR/2010/WD-webmessaging-20101118/  */
            var event = {
                'type': 'message',
                'data': rs.data
            } //TODO origin ...
            this.onmessage && this.onmessage.call(this, event)
            this.dispatchEvent(new CustomEvent(event))
        })

        websocket.onerror((e) => {
            var event = {
                'type': 'error',
                'data': e
            }
            this.onerror && this.onerror.call(this, event)
            this.dispatchEvent(new CustomEvent(event))
        })

        websocket.onclose((e) => {
            this.readyState = WS.CLOSED
            this.onclose && this.onclose.call(this, e)
        })

        websocket.WebSocket(url)
    }

    close() {
        websocket.close()
    }

    send(v) {
        websocket.send(v)
    }
}

WS.CONNECTING = 0;
WS.OPEN = 1;
WS.CLOSING = 2;
WS.CLOSED = 3;
WS.instance = null;

module.exports = WS;
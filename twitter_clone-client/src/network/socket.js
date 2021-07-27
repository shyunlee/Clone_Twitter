import socket from 'socket.io-client'

export default class Socket {
    constructor(baseURL, getAccessToken) {
        this.io = socket(baseURL, {
            // auth: (callback) => callback({token:getAccessToken()})
            auth:{token:getAccessToken()}
        })
    
        this.io.on('connect_error', (error) => {
            if (error) {
                console.log('Socket Error', error.message)
            }
        })
    }

    onSync(event, callback) {
        if (!this.io.connected) {
            this.io.connect()
        }
        this.io.on(event, (message) => {
            callback(message)
        })

        return () => this.io.off(event)
    }
}

//% color=#126180 icon="\uf0fb" block="Tello Drone Control"
//% groups="['ESP8266', 'Tello']"
namespace telloControl {

    // Function to send data via serial to ESP8266
    function sendCommand(command: string): void {
        serial.writeLine(command);
    }

    //% group="ESP8266"
    //% block="initialize ESP8266 on pins TX %tx RX %rx with baud rate %baudRate"
    export function initializeESP8266(tx: SerialPin, rx: SerialPin, baudRate: BaudRate): void {
        serial.redirect(tx, rx, baudRate);
        basic.pause(1000);
        basic.pause(2000);           // Wait for reset
        sendCommand("AT+RST");  // Connect to Tello drone's Wi-Fi network
        basic.pause(5000);           // Wait for connection
    }



    //% block="move forward %distance cm"
    //% group="Tello"
    //% distance.min=20 distance.max=500
    export function moveForward(distance: number): void {
        sendCommand("forward " + distance);
    }

    //% block="move backward %distance cm"
    //% group="Tello"
    //% distance.min=20 distance.max=500
    export function moveBackward(distance: number): void {
        sendCommand("back " + distance);
    }

    //% block="rotate left %degrees degrees"
    //% group="Tello"
    //% degrees.min=1 degrees.max=360
    export function rotateLeft(degrees: number): void {
        sendCommand("ccw " + degrees);
    }

    //% block="rotate right %degrees degrees"
    //% group="Tello"
    //% degrees.min=1 degrees.max=360
    export function rotateRight(degrees: number): void {
        sendCommand("cw " + degrees);
    }

    //% block="connect ESP8266 to Tello with Wi-Fi SSID %ssid"
    //% group="Tello"
    export function connectToTello(ssid: string): void {
        sendCommand(`AT+CWJAP="${ssid}",""`);  // Connect to Tello drone's Wi-Fi network using user input SSID
        basic.pause(5000);           // Wait for connection
    }

    //% block="land"
    //% group="Tello"
    export function land(): void {
        sendCommand("land");
    }

    //% block="takeoff"
    //% group="Tello"
    export function takeOff(): void {
        sendCommand("takeoff");
    }


}

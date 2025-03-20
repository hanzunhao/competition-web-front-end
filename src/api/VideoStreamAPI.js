const createVideoStreamSocket = (onMessageCallback) => {
    const socket = new WebSocket(`ws://localhost:8080/video-stream`);
    socket.binaryType = 'arraybuffer';

    socket.onopen = () => {
        console.log('WebSocket connection established.');
    };

    socket.onmessage = (event) => {
        if (onMessageCallback) {
            onMessageCallback(event);
        }
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed.');
    };

    return socket;
};

export default {
    createVideoStreamSocket,
};
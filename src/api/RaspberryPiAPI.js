import request from '../utils/request';

const move = async (idList) => {
    console.log(idList);

    try {
        const response = await request.post('/api/RaspberryPi/broadcast', 'move:' + idList.join(','),
            {
                headers: {
                    'Content-Type': 'text/plain',  // 设置请求头为 text/plain
                },
            });
        return response.data;
    } catch (error) {
        return [];
    }
};

const water = async (idList) => {
    console.log(idList);

    try {
        const response = await request.post('/api/RaspberryPi/broadcast', 'water:' + idList.join(','),
            {
                headers: {
                    'Content-Type': 'text/plain',  // 设置请求头为 text/plain
                },
            }
        );
        return response.data;
    } catch (error) {
        return [];
    }
};

const update = async (idList) => {
    console.log(idList);

    try {
        const response = await request.post('/api/RaspberryPi/broadcast', 'update:' + idList.join(','),
            {
                headers: {
                    'Content-Type': 'text/plain',  // 设置请求头为 text/plain
                },
            }
        );
        return response.data;
    } catch (error) {
        return [];
    }
};

const detect = async (idList) => {
    console.log(idList);

    try {
        const response = await request.post('/api/RaspberryPi/broadcast', 'detect:' + idList.join(','),
            {
                headers: {
                    'Content-Type': 'text/plain',  // 设置请求头为 text/plain
                },
            }
        );
        return response.data;
    } catch (error) {
        return [];
    }
};

export default {
    move,
    water,
    detect,
    update
};
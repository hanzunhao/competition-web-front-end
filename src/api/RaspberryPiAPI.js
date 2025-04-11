import request from '../utils/request';

const move = async (idList) => {
    try {
        const response = await request.post('/api/RaspberryPi/broadcast','move:'+idList.join(','),
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

const water = async () => {
    try {
        const response = await request.post('/api/RaspberryPi/broadcast','water',
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

const detect = async () => {
    try {
        const response = await request.post('/api/RaspberryPi/broadcast','detect',
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
    detect
};
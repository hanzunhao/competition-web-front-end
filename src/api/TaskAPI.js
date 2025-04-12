import request from "../utils/request";

const selectAllTask = async () => {
    try {
        const res = await request.get("/api/task/select");
        return res.data;
    } catch (error) {
        return [];
    }
}

const selectTaskIdByName = async (name) => {
    try {
        const res = await request.get(`/api/task/select/${name}`);        
        return res.data;
    } catch (error) {
        return [];
    }
}

const insertTask = async (name, weekDay, startTime) => {
    try {
        const task = {
            id: null,
            name: name,
            weekDay: weekDay,
            startTime: startTime
        }
        await request.put("/api/task/insert", task)
    } catch (error) {
        return [];
    }
}

const deleteTaskById = async (id) => {
    try {
        await request.delete(`/api/task/delete/${id}`);
    } catch (error) {
        return [];
    }
}

export default {
    selectAllTask,
    selectTaskIdByName,
    deleteTaskById,
    insertTask
}
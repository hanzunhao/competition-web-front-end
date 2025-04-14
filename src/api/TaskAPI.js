import request from "../utils/request";

const selectAllWeeklyTask = async () => {
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

const deleteTask = async (name, weekDay, startTime) => {
    try {
        await request.delete(`/api/task/delete/${name}/${weekDay}/${startTime}`);
    } catch (error) {
        return [];
    }
}

export default {
    selectAllWeeklyTask,
    selectTaskIdByName,
    deleteTask,
    insertTask
}
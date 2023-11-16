import { httpAxios } from "@/helper/httpHelper";
import axios from "axios";


export async function addTask(task) {
    const result = await httpAxios.post("/api/tasks", task).then((response) => response.data);
    return result;
}

export async function getTasksOfUser(userId) {
    const tasks = await httpAxios.get(`/api/users/${userId}/tasks`).then((response) => response.data);
    return tasks;
}

export async function deleteTask(taskId) {
    const result = await httpAxios.delete(`/api/tasks/${taskId}`).then((response) => response.data);
    return result;
}

export async function getTask(taskId) {
    const result = await httpAxios.get(`/api/tasks/${taskId}`).then((response) => response.data);
    return result;
}

export async function getPendingTasks(userId, status) {
    const result = await httpAxios.get(`/api/users/${userId}/tasks/${status}`).then((response) => response.data)
    return result;
}

export async function getCompletedTasks(userId, status) {
    const result = await httpAxios.get(`/api/users/${userId}/tasks/${status}`).then((response) => response.data)
    return result;
}

export async function updateTask(taskId, task) {
    const result = await axios.put(`http://localhost:3000/api/tasks/${taskId}`, JSON.stringify(task))
    .then((response) => console.log(response.data))
    return result;
}



import https from "./https"


export class TaskRepo {
    static gettask() {
        return async (dispatch, getState) => {
            try {
                dispatch({ type: "GET_TASK_REQUEST" })
                const res = await https.get("/tasks")
                console.log(res, 'resresresres')
                dispatch({ type: "GET_TASK_SUCCESS", payload: res.data })
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    static createTask(data) {
        return async (dispatch, getState) => {
            try {
                const state = getState();
                const { task } = state.task
                const res = await https.post("/tasks", data)
                dispatch({ type: "GET_TASK_SUCCESS", payload: [...task, res.data] })
            }
            catch (e) {
                console.log(e)
            }
        }
    }


    static updateTask(data) {
        return async (dispatch, getState) => {
            try {
                const { title, description } = data;
                const { task } = getState().task
                const res = await https.put(`/tasks/${data.taskId}`, { title, description })
                const updatedTasks = task.map(t => (t._id === data?.taskId ? res.data : t));
                dispatch({ type: "GET_TASK_SUCCESS", payload: updatedTasks });
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    static deleteTask(taskId) {
        return async (dispatch, getState) => {
            try {

                const { task } = getState().task
                await https.delete(`/tasks/${taskId}`)
                const updatedTasks = task.filter(t => t._id !== taskId);
                dispatch({ type: "GET_TASK_SUCCESS", payload: updatedTasks });
            }
            catch (e) {
                console.log(e)
            }
        }
    }

}

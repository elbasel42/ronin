// parent: number, // parent task name
// add depends on [...tasks].
// const returnSchema = `{
//     name: string, // name of the task
//     description: string, // description of the task
//     usefulLinks: string[], // links to resources that can help with the task
// }`;

// const SPLIT_TASK_PROMPT = `Divide task into two subtasks unless the task is too simple to divide further, only reply with a json array of the following object schema: ${returnSchema}, `;
export const getSubTasksPrompt = (task: string) =>
  `Divide the following function into multiple functions only if necessary, if the function is simple enough to be implemeneted without being split into smaller functions return the same function: ${task}`;

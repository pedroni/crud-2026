import { DIRECTION_EXPENSE, DIRECTION_INCOME } from "./constants.js";
import { generateId } from "./utils.js";

let DB = {
    data: [
        {
            id: 7019459,
            direction: DIRECTION_EXPENSE,
            description: "Rent",
            value: 1000,
            created_at: new Date("2026-09-10T00:00:00-03:00"),
        },
        {
            id: 7719210,
            direction: DIRECTION_INCOME,
            description: "Monthly Sallary",
            value: 2500,
            created_at: new Date("2026-09-10T00:00:00-03:00"),
        },
    ],
};

function formatRow(data) {
    return {
        ...data,
        id: generateId(),
        direction: data.direction == 1 ? DIRECTION_INCOME : DIRECTION_EXPENSE,
        created_at: data.created_at ? new Date(data.created_at) : new Date(),
        value: Number(data.value),
    };
}
function createExpense(data) {
    const row = formatRow(data);

    DB.data.push(row);

    return Promise.resolve({ data: row });
}

function updateExpense(id, data) {
    id = Number(id);
    DB.data = DB.data.map((row) => {
        if (row.id === id) {
            return {
                ...row,
                ...formatRow(data),
                id: id,
            };
        }

        return row;
    });

    return Promise.resolve();
}

function deleteExpense(id) {
    DB.data = DB.data.filter((row) => row.id !== id);
    return Promise.resolve();
}

function listExpenses() {
    return Promise.resolve({ data: DB.data });
}

function getExpense(id) {
    id = Number(id);
    console.log('the id im looking for', id)
    return Promise.resolve({
        data: DB.data.find((expense) => expense.id === id),
    });
}
export default {
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense,
    listExpenses,
};

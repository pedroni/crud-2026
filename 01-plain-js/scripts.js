import service from "./service.js";

function createRow(row) {
    const template = `
    <tr class="list-row">
        <td>${row.id}</td>
        <td>${row.direction == 1 ? "Income" : "Expense"}</td>
        <td>${row.value}</td>
        <td>${row.description}</td>
        <td>${row.created_at}</td>
        <td width="130">
            <button class="btn btn--amber" data-edit-expense="${row.id}" type="button">Edit</button>
            <button class="btn btn--rose" data-delete-expense="${row.id}" type="button">Delete</button>
        </td>
    </tr>
`;

    return template;
}

const listBody = document.getElementById("js-list-body");

async function renderEditForm(expenseId) {
    const form = document.getElementById("js-form");
    resetForm();

    console.log('the id i clicked at', expenseId)
    const response = await service.getExpense(expenseId);
    console.log(' the response, ', response)
    const expense = response.data;
    console.log(expenseId, await service.listExpenses(), expense)

    form.id.value = expense.id;
    form.value.value = expense.value;
    form.direction.value = expense.direction;
    form.description.value = expense.description;
    form.created_at.value = expense.created_at.toISOString().split('T')[0];
}

async function renderList() {
    let html = "";
    // todo: loading
    try {
        const response = await service.listExpenses();

        response.data.forEach((row) => {
            html += createRow(row);
        });

        listBody.innerHTML = html;

        Array.from(document.querySelectorAll("[data-delete-expense]")).forEach(
            (item) => {
                item.addEventListener("click", (event) => {
                    service.deleteExpense(
                        Number(item.getAttribute("data-delete-expense")),
                    );
                    renderList();
                });
            },
        );

        Array.from(document.querySelectorAll("[data-edit-expense]")).forEach(
            (item) => {
                item.addEventListener("click", (event) => {
                    renderEditForm(Number(item.getAttribute("data-edit-expense")));
                });
            },
        );

    } catch {
        // todo: catch error
    } finally {
        // todo: finish loading
    }
}

let submitting = false;
function resetForm() {
    const form = document.getElementById("js-form");
    form.reset();
    form.id.value = '';
}

function handleForm() {
    const form = document.getElementById("js-form");
    document.querySelector('.js-reset-form').addEventListener('click', resetForm)

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (submitting) {
            return;
        }

        submitting = true;

        const data = Object.fromEntries(new FormData(event.target));
        console.log('data', data)

        try {
            if (data.id) {
                await service.updateExpense(data.id, data);
            } else {
                await service.createExpense(data);
            }

            renderList();
            resetForm();
        } catch (e) {
            // todo: handle error
            console.error(e);
        } finally {
            submitting = false;
        }
    });
}

function main() {
    handleForm();
    renderList();
}

main();

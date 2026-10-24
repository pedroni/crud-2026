<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Expenses App</title>
        <link rel="stylesheet" href="./style.css" />
    </head>
    <body>
        <div class="container">
            <div>
                <h1>Expenses App</h1>
            </div>

            <div >
                <form  id="js-form" class="form">
                    <input type="hidden" name="id"/>
                    <div class="radio-inputs">
                        <label>
                            <input type="radio" required name="direction" value="-1" />
                            <span> Expense </span>
                        </label>

                        <label>
                            <input type="radio" required name="direction" value="1" />
                            <span> Income </span>
                        </label>

                    </div>
                    <input type="text" name="description" required placeholder="Description" />
                    <input type="number" name="value" required placeholder="Value" />
                    <input type="date" name="created_at" required placeholder="Date" />

                    <div class="form-footer">
                        <button type="button" class="js-reset-form btn btn--muted">
                            Cancel
                        </button>

                        <button type="submit" class="btn">
                            Submit
                        </button>
                    </div>

                </form>
            </div>
            <div id="js-list-view">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Direction (inc/exp)</th>
                            <th>Value</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="js-list-body"></tbody>
                </table>
            </div>

            <script src="./scripts.js" type="module"></script>
        </div>
    </body>
</html>

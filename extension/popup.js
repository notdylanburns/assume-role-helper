let opts = {};
let selected = null;

const accountId = document.getElementById("accountId");
const roleSelection = document.getElementById("roleSelection");
const updateButton = document.getElementById("updateButton");

updateButton.addEventListener("click", () => {
    const account_id = accountId.value;

    console.log(opts);
    console.log(selected);
    console.log(account_id);

    browser.tabs.query({
        currentWindow: true,
        active: true,
    }).then(tabs => tabs.forEach(tab => {
        browser.tabs.sendMessage(
            tab.id,
            {
                account_id,
                role: opts[selected].role.replaceAll("{}", account_id),
                display_name: opts[selected].display_name.replaceAll("{}", account_id),
            }
        )
    }));
});

roleSelection.addEventListener("change", () => {
    selected = roleSelection.value;
    console.log(selected);
});

console.log("load");
fetch("http://localhost:13323/config.json")
    .then(resp => resp.json())
    .then(data => {
        const selection = document.getElementById("roleSelection");
        opts = data;
        const keys = Object.keys(opts).sort();

        selected = keys[0];

        keys.forEach(key => {
            const option = document.createElement("option");
            option.value = key;
            option.innerText = key;

            selection.appendChild(option);
        });
    })
    .catch(e => console.error(e));

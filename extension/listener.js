function assumeRole(config) {
    console.log(config);
    const textbox = document.querySelector("input[type='text']");
    textbox.value = "Test";

    const acct_id = document.getElementById("account");
    const role = document.getElementById("roleName");
    const display_name = document.getElementById("displayName");
    
    acct_id.value = config.account_id;
    role.value = config.role;
    display_name.value = config.display_name;

    document.getElementById("input_switchrole_button").click();
}

browser.runtime.onMessage.addListener(msg => {
    assumeRole(msg);

    return Promise.resolve();
});
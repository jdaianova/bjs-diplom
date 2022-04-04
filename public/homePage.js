const logoutbutton = new LogoutButton;
logoutbutton.action = logout => ApiConnector.logout(c => {
    if (c.success) {location.reload();};
});

ApiConnector.current(c => {
    if (c.success) {ProfileWidget.showProfile(c.data);};
});

const board = new RatesBoard;

function getKursValut(b) {
    console.log('start func');
    ApiConnector.getStocks(c => {
        if (c.success) {
            b.clearTable();
            console.log('sdfsdf');
            b.fillTable(c.data);
        }else{console.log('else')};
    });
};
setInterval(getKursValut(board), 60000);

const money = new MoneyManager;
money.addMoneyCallback = data => ApiConnector.addMoney(data, c => {
    if (c.success) {
        ProfileWidget.showProfile(c.data);
        alert('Баланс пополнен успешно!');
    }else{
        alert(c.error);
    };
});







const logoutbutton = new LogoutButton;
logoutbutton.action = logout => ApiConnector.logout(c => {
    if (c.success) {location.reload();};
});

ApiConnector.current(c => {
    if (c.success) {ProfileWidget.showProfile(c.data);};
});

const board = new RatesBoard;

function getKursValut(b) {
    ApiConnector.getStocks(c => {
        if (c.success) {
            //alert('обновление курса');
            b.clearTable();
            b.fillTable(c.data);
        };
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

money.conversionMoneyCallback = data => ApiConnector.convertMoney(data, c => {
    if (c.success) {
        ProfileWidget.showProfile(c.data);
        alert('Конвертация выполнена успешно!');
    }else{
        alert(c.error);
    };
});

money.sendMoneyCallback = data => ApiConnector.transferMoney(data, c => {
    if (c.success) {
        ProfileWidget.showProfile(c.data);
        alert('Перевод валюты выполнен успешно!');
    }else{
        alert(c.error);
    };
});

const widget = new FavoritesWidget;

ApiConnector.getFavorites(c => {
    if (c.success) {
        console.log(с);
        widget.clearTable();
        widget.fillTable(с.data);
        widget.updateUsersList(с.data)
    }else{
        alert(c.error);
    };
});

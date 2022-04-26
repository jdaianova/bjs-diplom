const logoutbutton = new LogoutButton();
//кнопка выхода
logoutbutton.action = logout => ApiConnector.logout(response => {
    if (response.success) {
        location.reload();
    };
});

//виджет профиля пользователя
ApiConnector.current(currentUser => {
    if (currentUser.success) {
        ProfileWidget.showProfile(currentUser.data);
    };
});

//обновление курсов валют
const board = new RatesBoard();
function getNewStocks() {
    ApiConnector.getStocks(currentRate => {
        console.log('clear stocks');
        if (currentRate.success) {
            board.clearTable();
            board.fillTable(currentRate.data);
        };
    });
};

setInterval(getNewStocks, 60000);

//ОПЕРАЦИИ С ДЕНЬГАМИ

//пополнение баланса
const money = new MoneyManager;
let isSuccess = true;

money.addMoneyCallback = data => ApiConnector.addMoney(data, currentAddMoney => {
    if (currentAddMoney.success) {
        ProfileWidget.showProfile(currentAddMoney.data);
        money.setMessage(isSuccess, 'Баланс пополнен успешно!');
        //alert('Баланс пополнен успешно!');
    } else {
        money.setMessage(isSuccess, currentAddMoney.error);
    };
});

//конвертация денег
money.conversionMoneyCallback = data => ApiConnector.convertMoney(data, currentConvertMoney => {
    if (currentConvertMoney.success) {
        ProfileWidget.showProfile(currentConvertMoney.data);
        money.setMessage(isSuccess, 'Конвертация выполнена успешно!');
    } else {
        money.setMessage(isSuccess, currentConvertMoney.error);
    };
});

//перевод денег другому пользователю
money.sendMoneyCallback = data => ApiConnector.transferMoney(data, currentTransferMoney => {
    if (currentTransferMoney.success) {
        ProfileWidget.showProfile(currentTransferMoney.data);
        money.setMessage(isSuccess, 'Перевод денежных средств выполнен успешно!');
    } else {
        money.setMessage(isSuccess, currentTransferMoney.error);
    };
});

//РАБОТА СО СПИСКОМ ПОЛЬЗОВАТЕЛЕЙ
//заполнение начального списка
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(currentListFavorites => {
    if (currentListFavorites.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(currentListFavorites.data);
        money.updateUsersList(currentListFavorites.data);
    };
});

//добавление пользователя в список избранных
favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, newFavoriteUser => {
    if (newFavoriteUser.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(newFavoriteUser.data);
        money.updateUsersList(newFavoriteUser.data);
        favoritesWidget.setMessage(isSuccess, 'Пользователь добавлен в адресную книгу успешно!');
    } else {
        favoritesWidget.setMessage(isSuccess, newFavoriteUser.error);
    };
});

//удаление пользователя из списка избранных
favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, deleteFavoriteUser => {
    if (deleteFavoriteUser.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(deleteFavoriteUser.data);
        money.updateUsersList(deleteFavoriteUser.data);
        favoritesWidget.setMessage(isSuccess, 'Пользователь удален из адресной книги успешно!');
    } else {
        favoritesWidget.setMessage(isSuccess, deleteFavoriteUser.error);
    };
});
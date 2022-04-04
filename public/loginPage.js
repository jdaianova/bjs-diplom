"use strict";
const userform = new UserForm;
userform.loginFormCallback = data =>{
     ApiConnector.login(data, c => {
         //console.log(c.success);
         if (c.success) {location.reload();
        } else {
            alert(c.error);
        };
     });
};
(function(app){

    app.core.define('#menu', function(f){

        var informer,
            loggedMenuClass = 'menu-logged',

            validateResponse = function(obj){
                if('status' in obj && obj.status == 'ok' &&
                    'data' in obj &&
                    'email' in obj.data &&
                    'mail_cnt' in obj.data &&
                    'my_cnt' in obj.data){
                    return true;
                } else {
                    return false;
                }
            },

            responseHandler = function(response){
                if(f.isString(response)){
                    try {
                        response = JSON.parse(response);
                    } catch(ex){
                        return;
                    }

                } else if(!f.isObject(response)){
                    return;
                }

                var isResponseValid = validateResponse(response);

                if(isResponseValid){
                    f.addClass(f.getEl(), loggedMenuClass);
                    updateMailCounter(response.data.email, response.data.mail_cnt);
                    updateMyCounter(response.data.my_cnt);
                } else {
                    f.removeClass(f.getEl(), loggedMenuClass);
                }
            },

            retrieveUserDataFromEmail = function(email){
                var login = email.replace(/@.*/,'');
                var domain = email.replace(/.*@/,'').replace(/\.\S*$/,'');

                return {
                    login: login,
                    domain: domain
                }
            },

            updateMailCounter = function(email, count){
                var data = retrieveUserDataFromEmail(email);
                var menuItemEl = f.find('.email-counter')[0];
                var countElem = f.find('.menu__balloon', menuItemEl)[0];
                var emailElem = f.find('.menu__email', menuItemEl)[0];
                var menuUserPicElem = f.find('.menu__userpic', menuItemEl)[0];
                var userPicElem = f.find('.menu__userpic > img', menuItemEl)[0];

                if(email){
                    f.setAttribute(menuItemEl, 'href', 'http://r.mail.ru/clb19105358/e.mail.ru/cgi-bin/msglist');
                    f.show(emailElem);
                    f.show(menuUserPicElem);
                    f.setHTML(emailElem, email);
                    f.setAttribute(userPicElem, 'src', 'https://avt.foto.mail.ru/' + data.domain + '/' + data.login + '/_avatarsmall');
                } else {
                    f.setAttribute(menuItemEl, 'href', 'http://r.mail.ru/clb1321741/e.mail.ru');
                    f.hide(emailElem);
                    f.hide(menuUserPicElem);
                }

                if(count > 0){
                    f.show(countElem);
                    f.setHTML(countElem, count);
                } else {
                    f.hide(countElem);
                }
            },

            updateMyCounter = function(count){
                var countElem = f.find('.my-counter .menu__balloon')[0];

                if(count > 0){
                    f.show(countElem);
                    f.setHTML(countElem, count);
                } else {
                    f.hide(countElem);
                }
            };

        return {
            init: function(){

                var url = 'http://swa.mail.ru/cgi-bin/counters',
                    timeout = 60000;

                informer = Object.create(app.informer);
                informer.init({
                    timeout: timeout,
                    dataUrl: url,
                    handleResponse: responseHandler
                });
                informer.start();

            },
            destroy: function(){

                informer.stop();

            }
        }

    });

})(app);
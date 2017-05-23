/**
 * Created by RNaccache on 5/23/2017.
 */

//default settings for users/find
$.fn.api.settings.api = {
    'search' : '/users/find/{query}'
};
var returnedUserObject;


//used to search API /users/find for autocomplete
$('.ui.search')
    .search({
        type          : 'category',
        minCharacters: 3,
        apiSettings : {
            onResponse: function(reqResponse) {
                var response = {
                    results: {}
                };

                $.each(reqResponse, function(index, item){
                    var
                        name = item.displayName.substring (0,19)
                        maxResults = 9;

                    if(index>maxResults){
                        return false;
                    }
                    if(response.results[name] === undefined){
                        response.results[name] = {
                            name    :   name,
                            results :   []
                        };
                    }

                    response.results[name].results.push({
                        title       : item.mail
                    })
                });

                returnedUserObject = reqResponse;

                return response;
            }
        },
        onSearchQuery : function (query){
            $.each(returnedUserObject, function (i, user){
                var userMail = user.mail.toLowerCase();
                if(userMail === query.toLowerCase()){
                    populateUser(user);
                }
            });
        },
        onSelect : function (result, response){

            $.each(returnedUserObject, function (i, user){
                if(user.mail === result.title){
                    populateUser(user)
                }
            });
            return true;
        }
    })
;

//function used to populate new user form fields
function populateUser(userObject) {

    $("[name='user[name]']").val(userObject.displayName);
    $("[name='user[title]']").val(userObject.title);
    $("[name='user[employeeid]']").val(userObject.employeeID);
    $("[name='user[department]']").val(userObject.department);
    $("[name='user[country]']").val(userObject.co);
    $("[name='user[office]']").val(userObject.physicalDeliveryOfficeName);

}
/*
 * @author Shaumik "Dada" Daityari
 * @copyright December 2013
 */

/* Some info
Using newer versions of jQuery and jQuery UI in place of the links given in problem statement
All data is stored in local storage
User data is extracted from local storage and saved in variable todo.data
Otherwise, comments are provided at appropriate places
*/
Parse.initialize("zLRowA3ONTXnWOrV7yPuYszB88rs4B5tq1TxDRed", "1TVc4CN3DNrWZ6PJts3UmyKeanP68wVU2Kt5gNWJ");
      
var todo = todo || {},
    data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};

(function(todo, data, $) {

    var defaults = {
            todoTask: "todo-task",
            todoHeader: "task-header",
            todoDate: "task-date",
            todoDescription: "task-description",
            taskId: "task-",
            formId: "todo-form",
            dataAttribute: "data",
            deleteDiv: "delete-div"
        }, codes = {
            "1" : "#pending",
            "2" : "#inProgress",
            "3" : "#completed"
        };

    todo.init = function (options) {

        options = options || {};
        options = $.extend({}, defaults, options);

        $.each(data, function (index, params) {
            generateElement(params);
        });

        /*generateElement({
            id: "123",
            code: "1",
            title: "asd",
            date: "22/12/2013",
            description: "Blah Blah"
        });*/

        /*removeElement({
            id: "123",
            code: "1",
            title: "asd",
            date: "22/12/2013",
            description: "Blah Blah"
        });*/

        // Adding drop function to each category of task
        $.each(codes, function (index, value) {
            $(value).droppable({
                drop: function (event, ui) {
                        var element = ui.helper,
                            css_id = element.attr("id"),
                            id = css_id.replace(options.taskId, ""),
                            object = data[id];

                            // Removing old element
                            removeElement(object);

                            // Changing object code
                            object.code = index;

                            // Generating new element
                            generateElement(object);

                            // Updating Local Storage
                            data[id] = object;
                            localStorage.setItem("todoData", JSON.stringify(data));

                            // Hiding Delete Area
                            $("#" + defaults.deleteDiv).hide();
                    }
            });
        });

        // Adding drop function to delete div
        $("#" + options.deleteDiv).droppable({
            drop: function(event, ui) {
                var element = ui.helper,
                    css_id = element.attr("id"),
                    id = css_id.replace(options.taskId, ""),
                    object = data[id];

                // Removing old element
                removeElement(object);

                // Updating local storage
                delete data[id];
                localStorage.setItem("todoData", JSON.stringify(data));

                // Hiding Delete Area
                $("#" + defaults.deleteDiv).hide();
            }
        })

    };

    // Add Task
    var generateElement = function(id, name){
        var parent = $('#pending'),
            wrapper;

        if (!parent) {
            //return;
        }

        wrapper = $("<div />", {
            "class" : defaults.todoTask,
            "id" : defaults.taskId + id,
            "data" : id
        }).appendTo(parent);

        $("<div />", {
            "class" : defaults.todoHeader,
            "text": name
        }).appendTo(wrapper);

        
        wrapper.draggable({
            start: function() {
                $("#" + defaults.deleteDiv).show();
            },
            stop: function() {
                $("#" + defaults.deleteDiv).hide();
            },
            revert: "invalid",
            revertDuration : 200
        });

    };

    // Remove task
    var removeElement = function (params) {
        $("#" + defaults.taskId + params.id).remove();
    };

    todo.add = function() {
        var currentUser = Parse.User.current().id;
        var inputs = $("#" + defaults.formId + " :input"),
            errorMessage = "Title can not be empty",
            id, title, description, date, tempData;
        var food = $("#food").val();
        var FoodObject = Parse.Object.extend("FoodObject");
        var foodObject = new FoodObject();
        foodObject.save({FoodName: food, userId: currentUser}).then(function(object) {
          
        });


       

        // Saving element in local storage
        

        // Generate Todo Element
        
        var foodQuery = new Parse.Query(FoodObject);
            foodQuery.equalTo("userId", currentUser);
            foodQuery.find({
                success: function(results)
                    {
                        
                       for(var y = 0; y<results.length+1; y++){

                            generateElement(y, results[y]['attributes']['FoodName']);
                            
                       }
                    }

            });
            

        //

        // Reset Form
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
    };

    var generateDialog = function (message) {
        var responseId = "response-dialog",
            title = "Messaage",
            responseDialog = $("#" + responseId),
            buttonOptions;

        if (!responseDialog.length) {
            responseDialog = $("<div />", {
                    title: title,
                    id: responseId
            }).appendTo($("body"));
        }

        responseDialog.html(message);

        buttonOptions = {
            "Ok" : function () {
                responseDialog.dialog("close");
            }
        };  

        responseDialog.dialog({
            autoOpen: true,
            width: 400,
            modal: true,
            closeOnEscape: true,
            buttons: buttonOptions
        });
    };

   
    todo.clear = function () {
        data = {};
        localStorage.setItem("todoData", JSON.stringify(data));
        $("." + defaults.todoTask).remove();
    };

})(todo, data, jQuery);

    todo.updateFridge = function(){

        
    }
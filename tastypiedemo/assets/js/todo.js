var app = angular.module('todoApp', ['restangular']);

// configure restangular to work with tastypie, which returns data in an objects list, meta data in a meta object
app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl("/api/v1");
    RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
        var newResponse;
        if (operation === "getList") {
            newResponse = response.objects;
            newResponse.metadata = response.meta;
        } else {
            newResponse = response;
        }
        return newResponse;
    });
    RestangularProvider.setRequestSuffix('/?');
});


function TodoController($scope, Restangular){
    $scope.todos = [];

    $scope.getAllTodos = function(){
        Restangular.all("todos").getList().then(function(todos){
            $scope.todos = todos;
        });
    }

    $scope.getTotalTodos = function(){
        return $scope.todos.length;
    }

    $scope.addTodo = function(){
        var todo = {
            text: $scope.formTodoText,
            done: false
        };

        Restangular.all('todos').post(todo, 'todos').then(function(result){
            $scope.getAllTodos();
        });

        $scope.formTodoText = '';
    }

    $scope.todoDoneChanged = function(index){
        //save model updates to the server
        $scope.todos[index].put();
    }

    $scope.clearCompleted = function(){
        for(var i=0; i < $scope.todos.length; i++){
            var todo = $scope.todos[i];

            if(todo.done){
                todo.remove();
                $scope.todos.splice(i, 1)
            }
        }
    }

    $scope.getAllTodos();
}

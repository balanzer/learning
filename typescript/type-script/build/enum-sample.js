var TodoState;
(function (TodoState) {
    TodoState["New"] = "N";
    TodoState["Active"] = "A";
    TodoState["Pending"] = "P";
    TodoState["Completed"] = "C";
})(TodoState || (TodoState = {}));
var todo = {
    name: "hello",
    completed: false,
    state: TodoState.Completed
};

interface Todo {
  name: String;
  completed: boolean;
  dateCompleted?: Date;
  state: TodoState;
}

enum TodoState {
  New = "N",
  Active = "A",
  Pending = "P",
  Completed = "C"
}
let todo: Todo = {
  name: "hello",
  completed: false,
  state: TodoState.Completed
};

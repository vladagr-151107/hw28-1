import React from "react";
import { Formik, Form, Field , ErrorMessage} from "formik";

function App(){
    const onValidate = (values) => {
    const errors = {};
    if(!values.task) {
        errors.task = "Task is required";
    } else if( values.task.length < 5){
        errors.task = "Too small to be a task, ngl";
    }
    return errors;
}
    return <div className="container py-4">
             <h1 className="mb-4 text-center">ToDoList</h1>
        <Formik 
  initialValues={{ task: "", todos: [] }}
  validate={onValidate}
  onSubmit={(values, { resetForm, setFieldValue }) => {
    const newTodos = [...values.todos, { id: Date.now(), text: values.task }];
    setFieldValue("todos", newTodos);
    resetForm({ values: { task: "", todos: newTodos } });
  }}
>
  {({ values, setFieldValue }) => (
    <>
      <Form className="form d-flex gap-2 mb-4">
        <Field
          type="text"
          name="task"
          placeholder="Enter a task"
          className="form__input form-control"
        />
        <button type="submit" className="form__btn btn btn-success">
          Add
        </button>
      </Form>
      <ErrorMessage
        name="task"
        component="div"
        className="text-danger mb-2"
      />
      <ul className="list-unstyled mt-3 w-100">
        {values.todos.map((todo) => (
          <li
            key={todo.id}
            className="d-flex justify-content-between mb-2 p-2 border rounded"
          >
            <span>{todo.text}</span>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() =>
                setFieldValue(
                  "todos",
                  values.todos.filter((t) => t.id !== todo.id)
                )
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  )}
</Formik>
    </div>
}
export default App;
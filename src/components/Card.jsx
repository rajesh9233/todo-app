import React from "react";
import styled from "styled-components";
import moment from "moment";
import { MdDelete, MdDone, MdModeEdit } from "react-icons/md";
import TextInput from "./TextInput";

const TodoItem = styled.div`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: transparent;
  border-radius: 3px;
  border: 1px solid #c3c3c3;
  text-align: left;
  width: 40%;
  margin: 20px auto;
`;
const TodoTitle = styled.h5`
  cursor: pointer;
  width: 80%;
  display: inline-block;
  margin: 0;
  input {
    width: 90%;
    margin: 0;
  }
`;
const TodoAction = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  gap: 20px;
  width: 20%;
  cursor: pointer;
`;
const TodoTime = styled.small`
  font-size: 12px;
  display: block;
`;

export default function Card(props) {
  const { todo, handleInputChange, handleAddTodo, onSave, onEdit, onComplete } =
    props;

  return (
    <TodoItem>
      <TodoTitle>
        {todo.isEdit ? (
          <TextInput
            id="edit-task"
            name="edit-task"
            value={todo.name}
            onChange={handleInputChange}
            addTodo={handleAddTodo}
          />
        ) : todo.isDone ? (
          <strike>{todo.name}</strike>
        ) : (
          todo.name
        )}
      </TodoTitle>
      {!todo.isDone && (
        <TodoAction>
          {todo.isEdit ? (
            <MdDone onClick={onSave} />
          ) : (
            <>
              <MdModeEdit onClick={onEdit} />
              <MdDelete onClick={onComplete} />
            </>
          )}
        </TodoAction>
      )}
      {/* format the time */}
      <TodoTime>{moment(todo.createdAt).format("LLL")}</TodoTime>
    </TodoItem>
  );
}

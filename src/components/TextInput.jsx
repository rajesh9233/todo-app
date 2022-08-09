import React from "react";
import styled from "styled-components";

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: transparent;
  border-radius: 3px;
  width: 30%;
`;
export default function TextInput(props) {
  const handleKeyDown = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value) {
      props.addTodo(value);
    }
  };
  return (
    <Input
      id={props.id}
      type="text"
      onFocus={true}
      placeholder="Create a task..."
      onChange={(e) => props.onChange(e)}
      value={props.value}
      onKeyDown={handleKeyDown}
    />
  );
}

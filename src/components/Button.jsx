import styled from "styled-components";

const StyledButton = styled.button`
  background: ${(props) =>
    props.primary && props.color
      ? props.color
      : props.primary
      ? "grey"
      : "papayawhip"};
  color: ${(props) =>
    props.primary && props.color
      ? "papayawhip"
      : props.primary
      ? "papayawhip"
      : props.color
      ? props.color
      : "grey"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${(props) => (props.color ? props.color : "grey")};
  border-radius: 3px;
  cursor: pointer;
`;

const Button = ({ children, primary, color, onClick }) => {
  return (
    <StyledButton color={color} primary={primary} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
import styled from "styled-components";

const ModalForm = (props) => {
  const style = { display: props.display };
  return (
    <Container style={style}>
      <Card>
        <Span onClick={() => props.setDisplay("none")}>&times;</Span>
        {props.children}
      </Card>
    </Container>
  );
};

export default ModalForm;

const Container = styled.div`
  display: ${(props) => props.display};
  position: fixed; /* Stay in place */
  z-index: 99; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.8); /* Black w/ opacity */
`;

const Card = styled.div`
  background-color: #fefefe;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #888;
  max-width: 800px;
  width: 100%;
  position: relative;
  top: 30%;

  p {
    font-size: 24px;
  }
`;

const Span = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin: 0 10px;
  outline: none;

  &:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

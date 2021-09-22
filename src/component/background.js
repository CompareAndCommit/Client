import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  z-index: 0;
  transform: scale(1.1);
`;

export default Background;

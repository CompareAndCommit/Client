import styled from "styled-components";
import logoTransparentDay from "../assets/logoTransparent-Day.svg";
import logoTransparentNight from "../assets/logoTransparent-Night.svg";

const LogoImage = styled.div`
  background-image: url(${(props) =>
    props.isDay ? logoTransparentDay : logoTransparentNight});
  background-repeat: no-repeat;
  background-size: contain;
  width: ${(props) => props.dimen};
  height: ${(props) => props.dimen};
`;

export default LogoImage;

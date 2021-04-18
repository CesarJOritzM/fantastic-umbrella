import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  border-top: 1px solid var(--lightGray);
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
  a,
  button {
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1.4rem;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 1024px) {
      padding: 1rem 1.2rem;
      font-size: 1rem;
    }
    &:before {
      content: '';
      width: 2px;
      background: var(--lightGray);
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: red;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
      &:after {
        width: calc(100% - 60px);
        @media (max-width: 1024px) {
          width: calc(100% - 30px);
        }
      }

      /* @media (max-width: 700px) {
        width: calc(100% - 10px);
      } */
    }
  }
`;

export default NavStyles;

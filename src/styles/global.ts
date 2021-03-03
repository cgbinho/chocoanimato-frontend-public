import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
  --main-font: 400 16px Lato, sans-serif;
  --font-size: 16px;
  --base-font-size:1rem;
  --base-line-height: 1.25 * --base-font-size;
  --maxWidth: 1200px;
  --primary_light: #C6BAB4;
  --primary: #694633;
  --primary_dark: #512C1F;
  --secondary_light: #FFF1E9;
  --secondary: #FC8139;
  --secondary_dark: #CE4A00;
  --light_gray: #E1E1E1;
  --gray: #BFBFBF;
  --dark_gray: #808080;
  --success_color: #00e676;
  /* --success_color: #229E1F; */
  --fail_color: tomato;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}

body {
  background: #FFF;
  /* color: ${props => props.theme.colors.primary}; */
  color: var(--primary);
  font: var(--main-font);
  -webkit-font-smoothing: antialiased;
}

  h1,h2,h3,h4,h5,h6 {
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
      font-style: normal;
      line-height: 1.5;
  }

  a {
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: var(--primary);
  font-weight: normal;

    &:hover {
      color: var(--secondary_dark);
    }
  }

  p, ul, ol {
    line-height: 1.3;
    font-weight: 400;
  }
  li {
    list-style-type: none;
  }
  button {
    cursor: pointer;
  }

  select {
    /* height: 2rem; */
    font-size: 1rem;
  }
`;

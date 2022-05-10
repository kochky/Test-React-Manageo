import React from 'react'
import PeopleList from './components/PeopleList';
import Header from './components/Header';
import Hero from './components/Hero'
import Footer from './components/Footer';
import { createTheme,ThemeProvider  } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary:{
      main:"#00A0B0",
    },
    secondary:{
      main:"#CF5C78",
    },
    gray:{
      main:"#939597"
    },
    yellow:{
      main:"#F5DF4D"
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Header />
        <Hero />
        <PeopleList />
        <Footer />
      </>
    </ThemeProvider>

  );
}

export default App;

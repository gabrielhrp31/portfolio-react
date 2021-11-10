import Home from "./views/Home";
import GlobalStyles from "./styles/globalStyles";
import CustomThemeProvider from "./components/CustomThemeProvider";

function App() {

    return (
      <>
        <CustomThemeProvider >
          <div>
              <GlobalStyles />
            <Home/>
          </div>
        </CustomThemeProvider>
      </>
    );
}

export default App;

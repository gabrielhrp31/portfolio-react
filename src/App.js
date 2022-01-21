import Index from "./views/home";
import GlobalStyles from "./styles/globalStyles";
import CustomThemeProvider from "./components/CustomThemeProvider";

function App() {

    return (
      <>
        <CustomThemeProvider >
          <div>
            <GlobalStyles />
            <Index/>
          </div>
        </CustomThemeProvider>
      </>
    );
}

export default App;

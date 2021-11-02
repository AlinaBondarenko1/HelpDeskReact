import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Header} from "./Components/Header"
import { Step1 } from "./Components/Step1";
import { Step2 } from "./Components/Step2";
import { Result } from "./Components/Result";

// import { Result } from "./Result";
// import { Header } from "./components/Header";


const step2 = () => <> Step 2</>
const result = () => <>Result</>



function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Step1} />
          <Route path="/step2" component={Step2} />
          <Route path="/result" component={Result} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

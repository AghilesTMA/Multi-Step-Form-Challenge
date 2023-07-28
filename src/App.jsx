import FormContent from "./components/FormContent";
import Steps from "./components/steps";

function App() {
  return (
    <>
      <div className="backgroundImg"></div>
      <div className="formWrapper">
        <Steps />
        <FormContent />
      </div>
    </>
  );
}

export default App;

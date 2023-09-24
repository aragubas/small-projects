import { useState } from "react";
import "./App.css";
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";
import { OperationType } from "./OperationType";

function App() {
  const [operation, setOperation] = useState("");
  const [lastOperander, setLastOperander] = useState(0);
  const [currentOperander, setCurrentOperander] = useState("0");

  function doOperation(a: number, b: string, operation: string): string {
    switch (operation) {
      case OperationType.Add: {
        return (a + Number(b)).toString();
      }
      case OperationType.Subtraction: {
        return (a - Number(b)).toString();
      }
      case OperationType.Division: {
        if (Number(b) == 0) {
          return "0";
        }
        return (a / Number(b)).toString();
      }
      case OperationType.Multiplication: {
        return (a * Number(b)).toString();
      }

      default: {
        console.error(`Unknown Operation: ${operation}`);
        return "0";
      }
    }
  }

  function operandUpdate(isNumber: boolean, newOperation: number | OperationType) {
    if (isNumber) {
      setCurrentOperander(Number(`${currentOperander}${newOperation}`).toString());
      return;
    } else if (newOperation == OperationType.Backspace) {
      if (currentOperander.toString().length >= 2) {
        setCurrentOperander(`${currentOperander.toString().slice(0, currentOperander.toString().length - 1)}`);
        return;
      } else {
        setCurrentOperander("0");
      }
    } else if (newOperation == OperationType.Dot) {
      if (!currentOperander.toString().includes(".")) {
        setCurrentOperander(`${currentOperander}.`);
      }
      return;
    }

    // When the current operation has been set, and current operander is 0
    if (operation !== "") {
      switch (newOperation as OperationType) {
        case OperationType.Equals: {
          if (Number(currentOperander) == 0) {
            break;
          }
          setCurrentOperander(doOperation(lastOperander, currentOperander, operation));
          setLastOperander(0);
          setOperation("");
          break;
        }

        case OperationType.Clear: {
          setCurrentOperander("0");
          setOperation("");
          setLastOperander(0);
          break;
        }

        default: {
          // Avoids running operation when changing operation type
          if (operation != newOperation) {
            setOperation(newOperation as OperationType);
            return;
          }
          setOperation(newOperation.toString());
        }
      }
      return;
    }

    // When the current operation has been not set, and current operander is not 0
    if (Number(currentOperander) != 0) {
      switch (newOperation as OperationType) {
        case OperationType.Clear: {
          setCurrentOperander("0");
          setOperation("");
          setLastOperander(0);
          break;
        }

        case OperationType.Equals: {
          break;
        }

        default: {
          setLastOperander(Number(currentOperander));
          setOperation(newOperation.toString());
          setCurrentOperander("0");
          break;
        }
      }
    } else if (newOperation == OperationType.Clear) {
      setCurrentOperander("0");
      setOperation("");
      setLastOperander(0);
    }
  }

  return (
    <>
      <div className="calculatorBody">
        <TopSection
          operation={operation}
          lastOperander={lastOperander}
          currentOperander={currentOperander}
        ></TopSection>
        <BottomSection operation={operandUpdate} currentOperation={operation}></BottomSection>
      </div>
    </>
  );
}

export default App;

import { OperationType } from "./OperationType";
import "./BottomSection.css";

interface BottomSectionProps {
  operation: (isNumber: boolean, value: OperationType | number) => void;
  currentOperation: string;
}

export default function BottomSection({ operation, currentOperation }: BottomSectionProps) {
  return (
    <div className="bottomSection">
      <button onClick={() => operation(true, 7)}>7</button>
      <button onClick={() => operation(true, 8)}>8</button>
      <button onClick={() => operation(true, 9)}>9</button>
      <button
        className={`operator ${currentOperation == OperationType.Multiplication ? "active" : ""}`}
        onClick={() => operation(false, OperationType.Multiplication)}
      >
        &times;
      </button>
      <button onClick={() => operation(true, 4)}>4</button>
      <button onClick={() => operation(true, 5)}>5</button>
      <button onClick={() => operation(true, 6)}>6</button>
      <button
        className={`operator ${currentOperation == OperationType.Subtraction ? "active" : ""}`}
        onClick={() => operation(false, OperationType.Subtraction)}
      >
        -
      </button>
      <button onClick={() => operation(true, 1)}>1</button>
      <button onClick={() => operation(true, 2)}>2</button>
      <button onClick={() => operation(true, 3)}>3</button>
      <button
        className={`operator ${currentOperation == OperationType.Add ? "active" : ""}`}
        onClick={() => operation(false, OperationType.Add)}
      >
        +
      </button>
      <button
        className={`operator ${currentOperation == OperationType.Division ? "active" : ""}`}
        onClick={() => operation(false, OperationType.Division)}
      >
        &divide;
      </button>
      <button onClick={() => operation(true, 0)}>0</button>
      <button onClick={() => operation(false, OperationType.Dot)}>.</button>
      <button onClick={() => operation(false, OperationType.Equals)}>=</button>
      <div className="sidebyside">
        <button className="flexGrow-1" onClick={() => operation(false, OperationType.Clear)}>
          CLEAR
        </button>
        <button onClick={() => operation(false, OperationType.Backspace)}>&#9754;</button>
      </div>
    </div>
  );
}

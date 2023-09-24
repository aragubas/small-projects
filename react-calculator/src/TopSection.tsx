import "./TopSection.css";
import { operationToString } from "./OperationType";

export default function TopSection(state: { operation: string; lastOperander: number; currentOperander: string }) {
  return (
    <div className="topSection">
      <div className="operandsRow">
        <p className={state.lastOperander == 0 ? "operanderEmpty" : ""}>
          {state.lastOperander == 0 ? "+-*÷" : state.lastOperander}
        </p>
        <p>{operationToString(state.operation)}</p>
      </div>
      <div className="operandsRow">
        <p>{state.currentOperander}</p>
      </div>
    </div>
  );
}

export enum OperationType {
  Division = "division",
  Multiplication = "multiplication",
  Subtraction = "subtraction",
  Add = "add",
  Dot = "dot",
  Equals = "equals",
  Clear = "clear",
  Backspace = "backspace",
}

export function operationToString(operation: string): string {
  switch (operation) {
    case "": {
      return "";
    }

    case OperationType.Add: {
      return "+";
    }

    case OperationType.Multiplication: {
      return "x";
    }

    case OperationType.Subtraction: {
      return "-";
    }

    case OperationType.Division: {
      return "÷";
    }

    default: {
      return "?";
    }
  }
}

import "./App.css";
import { Button } from "./components/ui/Button";
import { Plus } from "lucide-react";

function App() {
  return (
    <>
      <Button variant="primary" size="sm" text="Add Content" startIcon={Plus} />
    </>
  );
}

export default App;

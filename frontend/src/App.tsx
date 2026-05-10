import "./App.css";
import { Button } from "./components/ui/Button";
import { Share2 } from "lucide-react";

function App() {
  return (
    <>
      <Button
        variant="secondary"
        size="md"
        text="Add Content"
        startIcon={Share2}
      />
    </>
  );
}

export default App;

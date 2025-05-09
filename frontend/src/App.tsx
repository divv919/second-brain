import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        text="This is a button"
        startIcon={<PlusIcon size="sm" />}
        endIcon={<ShareIcon size="sm" />}
      />

      <Button
        variant="primary"
        size="md"
        text="This is a button a bigger one"
        startIcon={<PlusIcon size="md" />}
        endIcon={<ShareIcon size="md" />}
      />
      <Button
        variant="primary"
        size="lg"
        text="This is a button a bigger one"
        startIcon={<ShareIcon size="lg" />}
        endIcon={<ShareIcon size="lg" />}
      />
    </>
  );
}

export default App;

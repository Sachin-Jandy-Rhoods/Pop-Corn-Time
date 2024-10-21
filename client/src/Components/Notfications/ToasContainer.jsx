import { Toaster } from "react-hot-toast";

const ToasContainer = () => {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 2000,
      }}
    />
  );
};

export default ToasContainer;

import { HTMLProps, useRef } from "react";
import classNames from "classnames";
import { Button } from "../Button";

const FileInput = ({ onChange, ...props }: HTMLProps<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button
        buttonType="primary"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        Upload Watch History
      </Button>
      <input
        type="file"
        ref={inputRef}
        onChange={onChange}
        className="hidden"
      />
    </>
  );
};

export default FileInput;

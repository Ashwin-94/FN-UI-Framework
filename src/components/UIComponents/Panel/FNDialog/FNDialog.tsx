import React, { FC } from "react";
import { Dialog, DialogProps } from "primereact/dialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export interface FNDialogProps extends Omit<DialogProps, "visible" | "onHide"> {
  header: string;
  content: string | React.ReactNode;
  footerButtons?: {
    label: string;
    icon: string;
    onClick: () => void;
    className?: string;
  }[];
  visible: boolean;
  onHide: () => void;
  className?: string;
}

const FNDialog: FC<FNDialogProps> = ({
  header,
  content,
  footerButtons = [],
  visible,
  onHide,
  className,
  ...restProps
}) => {
  const footerContent = (
    <div>
      {footerButtons.map((button, index) => (
        <Button
          type="button"
          key={index}
          label={button.label}
          icon={button.icon}
          onClick={button.onClick}
          className={button.className}
        />
      ))}
    </div>
  );

  return (
    <div className={`p-dialog ${className}`}>
      <Dialog
        header={header}
        visible={visible}
        onHide={onHide}
        footer={footerContent}
        {...restProps}
      >
        {content}
      </Dialog>
    </div>
  );
};

export default FNDialog;

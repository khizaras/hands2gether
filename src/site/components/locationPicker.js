import { Button, Modal, Typography } from "antd";
import React from "react";
import { ImLocation } from "react-icons/im";

const LocationPickerPopup = ({ address }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <section>
      <Button
        onClick={() => setOpen(!open)}
        type="default"
        size="large"
        icon={<ImLocation />}
      >
        {" "}
        {address?.city}, {address?.state}{" "}
      </Button>
      <Modal open={open} closable onCancel={() => setOpen(!open)}>
        <Typography.Title level={4}>Change City</Typography.Title>
      </Modal>
    </section>
  );
};

export default LocationPickerPopup;

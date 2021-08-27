import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Modal,
} from "@material-ui/core";
import React from "react";

const UserContainer = (props) => {
  <div></div>;
};

const SubscriberList = (props) => {
  const [open, setOpen] = React.useState(false);
  const openDetails = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Button onClick={openDetails}>UserDetails</Button>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>Subscription Detail</DialogTitle>
        <List>
          <ListItem>Prop</ListItem>
          <ListItem>Text</ListItem>
        </List>
      </Dialog>
    </Box>
  );
};

export default SubscriberList;

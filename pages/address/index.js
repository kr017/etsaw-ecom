import { useRef, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import { DialogBox } from "../../components/dialogbox";
import styles from "../../styles/Address.module.css";
import { getAddressList, insertAddress } from "../api";
import withAuth from "../../components/withAuth";

export const getStaticProps = () => {
  let user = store.getState();
  console.log(user);
  let data = [];
  getAddressList({ id: user.user.id }).then(res => {
    console.log(res);
  });

  return {
    props: {
      addresses: data,
    },
  };
};

const Address = props => {
  const router = useRouter();

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const nameInputRef = useRef();
  const contactInputRef = useRef();
  const streetInputRef = useRef();
  const zipInputRef = useRef();
  const cityInputRef = useRef();

  const handleSubmit = () => {
    let name = nameInputRef.current.value;
    let contact = contactInputRef.current.value;
    let street = streetInputRef.current.value;
    let city = cityInputRef.current.value;
    let pincode = parseInt(zipInputRef.current.value);
    if (
      name === "" ||
      contact === "" ||
      street === "" ||
      city === "" ||
      pincode === ""
    ) {
      alert("All fields are required");
    } else {
      let data = {
        name,
        contact,
        street,
        city,
        pincode,
        user_id: [user.user.id],
      };
      insertAddress(data).then(res => {
        setOpen(false);
      });
    }
  };
  const saveAddress = () => {
    return (
      <Button
        onClick={handleSubmit}
        className={styles.submitBtn}
        style={{ padding: "8px 28px" }}
        variant="contained"
        color="secondary"
      >
        Save{" "}
      </Button>
    );
  };
  const getAddressForm = () => {
    return (
      <Box className={styles.wrapper}>
        <Box>
          <Typography>Contact Details</Typography>
          <TextField
            id="contactName"
            name="contactName"
            placeholder="Contact Name"
            placeholder="Name"
            inputRef={nameInputRef}
            required
          />{" "}
          <TextField
            fullWidth
            type="number"
            id="contactNumber"
            name="contactNumber"
            placeholder="Contact Number"
            inputRef={contactInputRef}
          />
        </Box>

        <Box className={styles.container}>
          <Typography>Address</Typography>
          <TextField
            id="street"
            name="street"
            placeholder="Street Name"
            fullWidth
            inputRef={streetInputRef}
          />{" "}
          <TextField
            fullWidth
            id="city"
            name="city"
            placeholder="City"
            inputRef={cityInputRef}
          />
          <TextField
            id="zip"
            name="zip"
            placeholder="Pin code"
            fullWidth
            inputRef={zipInputRef}
          />
        </Box>
      </Box>
    );
  };
  return (
    <Grid className={styles.container}>
      {user.addresses.length > 0 ? (
        <Grid>
          {user.addresses.map(item => (
            <div className={styles.body} key={item.id}>
              <div className={styles.image}>
                <img
                  src={item.image}
                  alt={item.name}
                  height="90"
                  width="65"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p>{item.name}</p>
              <p>$ {item.price}</p>
              <p>{item.quantity}</p>

              <p>$ {item.quantity * item.price}</p>
            </div>
          ))}
        </Grid>
      ) : (
        <Grid>
          <h1> No Address Added!</h1>

          <div
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddCircleOutlinedIcon color="secondary" fontSize="large" />
          </div>
        </Grid>
      )}

      <DialogBox
        open={open}
        header="Add New Address"
        content={getAddressForm()}
        onClose={() => {
          setOpen(false);
        }}
        showAction={true}
        action={saveAddress()}
      />
    </Grid>
  );
};

export default (withRouter, withAuth)(Address);

import { getResponse } from "../../utils";
import { addressesTable, usersTable } from "../../airtable";
export const insertAddress = async data => {
  try {
    const item = await addressesTable.create([
      {
        fields: data,
      },
    ]);
    return getResponse(200, { msg: "address added!", data: item });
  } catch (err) {
    console.log(err);
    return getResponse(500, { msg: "Something went wrong", err: err });
  }
};

export const loginUser = async data => {
  try {
    let results = await usersTable
      .select({
        filterByFormula: `AND(
          (email = '${data.email}'),
          (password='${data.password}')
        )`,
      })
      .all();
    if (results) {
      return getResponse(200, {
        msg: "Logged in successful!!!",
        data: results,
      });
    } else {
      return getResponse(401, { msg: "please check your credentails" });
    }
  } catch (err) {
    console.log(err);
    return getResponse(500, { msg: "Something went wrong", err: err });
  }
};

export const getAddressList = async data => {
  try {
    console.log(data.id);
    let results = await addressesTable
      .select({
        filterByFormula: `AND(
          (user_id = '${data.id}')
        )`,
      })
      .all();
    if (results) {
      return getResponse(200, {
        msg: "Address List !!!",
        data: results,
      });
    } else {
      return getResponse(404, { msg: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

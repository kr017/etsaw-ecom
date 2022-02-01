import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Navbar.module.css";
import ExitToAppOutlined from "@material-ui/icons/ExitToAppOutlined";
import { removeUser } from "../../redux/user.slice";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };
  const handleSignout = () => {
    dispatch(removeUser());
    router.push("/");
  };
  return (
    <nav className={styles.navbar}>
      <h6 className={styles.logo}>EtsawEcom</h6>
      <ul className={styles.links}>
        <li className={styles.navlink}>
          <Link href="/">Home</Link>
        </li>

        <li className={styles.navlink}>
          <Link href="/cart">
            <span className={styles.navlink}>Cart ({getItemsCount()})</span>
          </Link>
        </li>
        <li className={styles.navlink} onClick={() => handleSignout()}>
          <ExitToAppOutlined />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

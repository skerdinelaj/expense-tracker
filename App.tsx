import { StatusBar } from "expo-status-bar";
import Root from "./screens/Root";
import store from "./store/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}

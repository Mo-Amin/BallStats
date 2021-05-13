import { createDrawerNavigator } from "react-navigation-drawer";
import MainProfile from "./Profile";

import CustomDrawerContentComponent from "./DrawerContent";

export default createDrawerNavigator(
  {
    MainProfile: { screen: MainProfile },
  },
  {
    initialRouteName: "MainProfile",

    contentComponent: CustomDrawerContentComponent,

    contentOptions: {
      activeTintColor: "#e91e63",
    },
  }
);
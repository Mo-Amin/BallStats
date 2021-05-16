import { createDrawerNavigator } from "react-navigation-drawer";
import MainProfile from "./Profile";
import Count from"./Count";

import CustomDrawerContentComponent from "./DrawerContent";


export default createDrawerNavigator(
  {
    MainProfile: { screen: MainProfile },
    Count:{screen:Count},
  },

  {
    initialRouteName: "MainProfile",

    contentComponent: CustomDrawerContentComponent,

    contentOptions: {
      activeTintColor: "#e91e63",
    },
  }
);
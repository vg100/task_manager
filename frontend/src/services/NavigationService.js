import {
  createNavigationContainerRef,
  StackActions,
  CommonActions,
} from '@react-navigation/native';

class NavigationService {
  constructor() {
    this.navigationRef = createNavigationContainerRef();
    this.currentRouteName = null;
  }

  navigate(name, params) {
    if (this.navigationRef.isReady()) {
      this.navigationRef.navigate(name, params);
    }
  }

  replace(name, params) {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(StackActions.replace(name, params));
    }
  }

  reset(name, params) {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name, params }],
        })
      );
    }
  }

  goBack() {
    if (this.navigationRef.isReady() && this.navigationRef.canGoBack()) {
      this.navigationRef.goBack();
    }
  }

  popToTop() {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(StackActions.popToTop());
    }
  }


}


export default new NavigationService();

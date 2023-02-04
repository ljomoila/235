import React, { Component } from 'react';
import { AppState } from 'react-native';

export default class ViewBase extends Component {
  constructor(props) {
    super(props);

    this.api = props.api;
    this.state = { loading: true, refreshing: false, appState: AppState.currentState };
  }

  // componentDidMount() {
  //   this.appStateSubscription = AppState.addEventListener('change', (nextAppState) => {
  //     if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
  //       this.onRefresh();
  //     }
  //     this.setState({ appState: nextAppState });
  //   });
  // }

  // componentWillUnmount() {
  //   if (this.appStateSubscription) this.appStateSubscription.remove();
  // }

  onRefresh = () => {
    if (!this.loadData) return;

    this.setState({ refreshing: true });

    this.loadData().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    return <>{this._render()}</>;
  }
}

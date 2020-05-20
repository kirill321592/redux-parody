import React from 'react';
import ReactReduxContext from '~s/context';
const connect = (mapStateToProps, mapDispatchToProps) =>
Component => {
  class WrappedComponent extends React.Component {
    static contextType = ReactReduxContext
    render() {
      return (
        <Component
          {...this.props}
          {...mapStateToProps(this.context.store.getState(), this.props)}
          {...mapDispatchToProps(this.context.store.dispatch, this.props)}
        />
      
      )
    }
    componentDidMount() {
      this.unsubscribe = this.context.store.subscribe(this.handleChange)
    }
    
    componentWillUnmount() {
      this.unsubscribe()
    }

    handleChange = () => {
      this.forceUpdate()
    }
  }

  return WrappedComponent
}

  export default connect;
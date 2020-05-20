import React from 'react';
import PropTypes from 'prop-types';
import ReactReduxContext from '~s/context';

class Provider extends React.Component {
    getChildContext =() => {
      return {
        store: this.props.store,
      }
    }
    
    render() {
        const Context = this.props.context || ReactReduxContext     
        return (      
          <Context.Provider value={this.getChildContext()}>
            {this.props.children}
          </Context.Provider>
        )
    }
  }
  
  Provider.childContextTypes = {
    store: PropTypes.object,
  }


  export default Provider;
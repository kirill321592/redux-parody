import React from 'react';
import ReactDom from 'react-dom';
import reducer from '~s/reducers/';
import connect from '~s/Connect/';
import Provider from '~s/Provider/';
import createStore from '~s/createStore/';
import {changeInterval} from '~s/actions/';

  // components
  
  class IntervalComponent extends React.Component {

    intervalHandler = val => {
      const {currentInterval, changeInterval} = this.props;

      if(currentInterval <= 1 && val<0){
        return false
      }

       changeInterval(val)
    }
    render() {
      return (
        <div>
          <span>Интервал обновления секундомера: {this.props.currentInterval} сек.</span>
          <span>
            <button onClick={() => this.intervalHandler(-1)}>-</button>
            <button onClick={() => this.intervalHandler(1)}>+</button>
          </span>
        </div>
      )
    }
  }
  
  const Interval = connect(
    state => ({
      currentInterval: state.currentInterval,
    }),
    dispatch => ({
      changeInterval: value => dispatch(changeInterval(value)),
    }),
    )(IntervalComponent)
  
  class TimerComponent extends React.Component {
    state = {
      currentTime: 0,
      isStart:false
    }
 
    render() {
      return (
        <div>
          <Interval />
          <div>
            Секундомер: {this.state.currentTime} сек.
          </div>
          <div>
            <button
              disabled={this.state.isStart}
              onClick={this.handleStart}
             >Старт
             </button>
            <button onClick={this.handleStop}>Стоп</button>
          </div>
        </div>
      )
    }
 
    handleStart=()=> {
      this.timer = setInterval(() => {
        this.setState((state, props) => ({
          currentTime: state.currentTime + props.currentInterval,
          isStart:true
        }));
        }, this.props.currentInterval *1000);
    }
    
    handleStop = ()=> {
      this.setState(() => ({
        currentTime:0,
        isStart:false
      }));
    
      clearInterval(this.timer);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }
  
  }
  
  const Timer = connect(state => ({
    currentInterval: state.currentInterval,
  }), () => {})(TimerComponent)
  

   // init state
   const initialState = {
    currentInterval: 1
  };
 
  ReactDom.render(
    <Provider store={createStore(reducer, initialState)}>
      <Timer />
</Provider>, document.querySelector('#app'));

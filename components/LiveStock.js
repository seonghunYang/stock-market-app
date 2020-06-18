import React, { Component } from "react";
import styled from 'styled-components/native'

const StateView = styled.View`
  flex-flow: row;
  align-items: flex-end;
  margin-left: 23px;
  margin-top: 10px;
`
const UpStateText = styled.Text`
  color: #2979ff;
  font-size: 45px;
  font-weight: bold;
`
const UpStateSubText = styled.Text`
  color: #2979ff;
  font-size: 17px;
  padding-bottom: 10px;
`
const DownStateText = styled.Text`
  color: #d32f2f;
  font-size: 45px;
  font-weight: bold;
`
const DownStateSubText = styled.Text`
  color: #d32f2f;
  font-size: 17px;
  padding-bottom: 10px;
`
const SameStateText = styled.Text`
  color: #757575;
  font-size: 45px;
  font-weight: bold;
`
const SameStateSubText = styled.Text`
  color: #757575;
  font-size: 17px;
  padding-bottom: 10px;
`


class LiveStock extends Component {
  constructor(props) {
    super(props);

    const changeValue =  this.props.stockInfo.c -this.props.stockInfo.pc;
    const changeP = Math.round((Math.abs(changeValue)/this.props.stockInfo.pc * 100)*100) / 100;
    let change = [];
    if (changeValue > 0){
      change = ["+", changeP]
    }else if(changeValue < 0){
      change = ["-", changeP]
    }else{
      change = ["=", changeP]
    }

    this.state = {
      currentPrice : this.props.stockInfo.c,
      changeList: change,
      socket: null
    }
  }
  // instance of websocket connection as a class property

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.symbol !== this.props.symbol){
      const changeValue =  nextProps.stockInfo.c -nextProps.stockInfo.pc;
      const changeP = Math.round((Math.abs(changeValue)/nextProps.stockInfo.pc * 100)*100) / 100;
      let change = [];
      if (changeValue > 0){
        change = ["+", changeP]
      }else if(changeValue < 0){
        change = ["-", changeP]
      }else{
        change = ["=", changeP]
      } 
      if(this.state.socket){
      this.state.socket.send(JSON.stringify({'type':'unsubscribe', 'symbol': this.props.symbol}))
      this.state.socket.send(JSON.stringify({'type':'subscribe', 'symbol': nextProps.symbol}))
      }
      this.setState({
        currentPrice: nextProps.stockInfo.c,
        changeList: change
      })
      return true;
    }
    return true;
  }
  

  componentDidMount() {
    const socket = new WebSocket('wss://ws.finnhub.io?token=bqgqrufrh5r8lcmqasig');
    let setTimer = true;
    socket.onopen = () => {
        // on connecting, do nothing but log it to the console
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': this.props.symbol}))
        console.log('connected')
        this.setState({
          socket: socket
      })
    }
    socket.onmessage = event => {
      // listen to data sent from the websocket server
      const socketData = JSON.parse(event.data)
        if(socketData.type === "ping" || socketData.data[0].s !== this.props.symbol) {
          return;
        }
        if(setTimer){
          const updatePrice = socketData.data[0].p;
          const changeValue =  updatePrice -this.props.stockInfo.pc;
          const changeP = Math.round((Math.abs(changeValue)/this.props.stockInfo.pc * 100)*100) / 100;
          let change = [];
          if (changeValue > 0){
            change = ["+", changeP]
          }else if(changeValue < 0){
            change = ["-", changeP]
          }else{
            change = ["=", changeP]
          }
          setTimer = false;
          this.setState({
            currentPrice: updatePrice,
            changeList: change
        });
      }
    }
      
    setInterval(() => {setTimer=true;
    }, 1000);
  }
  render(){
  return (
    <>
    {(this.state.changeList[0] === "+") &&
      <StateView>
        <UpStateText>
          {this.state.currentPrice}
        </UpStateText>
        <UpStateSubText>       
          (+
          {this.state.changeList[1]}%)
        </UpStateSubText>
      </StateView>
      }
    {(this.state.changeList[0] === "-") &&
      <StateView >
        <DownStateText>
          {this.state.currentPrice}
        </DownStateText>
        <DownStateSubText >       
          (-
          {this.state.changeList[1]}%)
        </DownStateSubText>
      </StateView>
    }
    {(this.state.changeList[0] === "=") &&
      <StateView>
        <SameStateText>
          {this.state.currentPrice}
        </SameStateText>
        <SameStateSubText>       
          (-
          {this.state.changeList[1]}%)
        </SameStateSubText>
      </StateView>
      }
    </>
  );
  }
}

export default LiveStock;


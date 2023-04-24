import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`

padding: 30px;
  
  .heading{
    text-align:center;
    color: #8C1D40;
  }
  
  .main-container{
    // max-width: 800px;
    height:30px;
    margin:0 auto;
    display:flex;
    justify-content: space-between;
  }
  
  .main-dice-container{
    padding:50px;
    display:flex;
    justify-content: center;
    margin-bottom:20px;
  }
  
  .dice-container{
    height: 20px;
    width:20px;
    perspective: 1000px;

  }
  
  .dice{
    width:20px;
    height:20px;
    transform-style: preserve-3d;
    transition: all 200ms;
    &.face-1{
      transform: rotateX(0);
    }
    &.face-2{
      transform: rotateY(90deg);
    }
    &.face-3{
      transform: rotateX(-90deg);
    }
    &.face-4{
      transform: rotateX(90deg);
    }
    &.face-5{
      transform: rotateY(-90deg);
    }
    &.face-6{
      transform: rotateX(-180deg);
    }
  }
  
  .dot-container{
    display:grid;
    grid-template-columns: repeat(3, 128);
    grid-template-rows: repeat(3, 128);
    grid-gap: 128/4 128/4;
  }
  
  .dot{
    background-color: black;
    border-radius: 50%;
    height:4px;
    width:4px;
  }
  
  .dice{
    [class^="face"]{
      position:absolute;
      width:20px;
      height:20px;
      outline: 2px solid #00BBFF;
      outline-offset: -2px;
      background-color: rgba(255,255,255,0.9);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .face-1{
      transform: translateX(0) translateY(0) translateZ(160px/2);
      .dot-container{
        .dot{
          grid-column: 2 / span 1;
          grid-row: 2 / span 1;
        }
      }
    }
  
    .face-3{
      transform: translateX(0) translateY(-50%) translateZ(0) rotateX(90deg);
      .dot-container{
        .dot:nth-child(1){
          grid-column: 3 / span 1;
          grid-row: 1 / span 1;
        }
        .dot:nth-child(2){
          grid-column: 2 / span 1;
          grid-row: 2 / span 1;
        }
        .dot:nth-child(3){
          grid-column: 1 / span 1;
          grid-row: 3 / span 1;
        }
      }
    }
  
    .face-2{
      transform: translateX(-50%) translateY(0%) translateZ(0) rotateY(90deg);
      .dot-container{
        .dot:nth-child(1){
          grid-column: 3 / span 1;
          grid-row: 1 / span 1;
        }
        .dot:nth-child(2){
          grid-column: 1 / span 1;
          grid-row: 3 / span 1;
        }
      }
    }
  
    .face-4{
      transform: translateX(0) translateY(50%) translateZ(0) rotateX(90deg);
      .dot-container{
        .dot:nth-child(1){
          grid-column: 1 / span 1;
          grid-row: 1 / span 1;
        }
        .dot:nth-child(2){
          grid-column: 1 / span 1;
          grid-row: 3 / span 1;
        }
        .dot:nth-child(3){
          grid-column: 3 / span 1;
          grid-row: 3 / span 1;
        }
        .dot:nth-child(4){
          grid-column: 3 / span 1;
          grid-row: 1 / span 1;
        }
      }
    }
  
    .face-5{
      transform: translateX(50%) translateY(0%) translateZ(0) rotateY(90deg);
      .dot-container{
        .dot:nth-child(1){
          grid-column: 1 / span 1;
          grid-row: 1 / span 1;
        }
        .dot:nth-child(2){
          grid-column: 1 / span 1;
          grid-row: 3 / span 1;
        }
        .dot:nth-child(5){
          grid-column: 2 / span 1;
          grid-row: 2 / span 1;
        }
        .dot:nth-child(3){
          grid-column: 3 / span 1;
          grid-row: 3 / span 1;
        }
        .dot:nth-child(4){
          grid-column: 3 / span 1;
          grid-row: 1 / span 1;
        }
      }
    }
  
    .face-6{
      transform: translateX(0) translateY(0) translateZ(-160px/2);
      .dot-container{
        .dot:nth-child(1){
          grid-column: 1 / span 1;
          grid-row: 1 / span 1;
        }
        .dot:nth-child(2){
          grid-column: 3 / span 1;
          grid-row: 3 / span 1;
        }
        .dot:nth-child(3){
          grid-column: 1 / span 1;
          grid-row: 3 / span 1;
        }
        .dot:nth-child(4){
          grid-column: 1 / span 1;
          grid-row: 2 / span 1;
        }
        .dot:nth-child(5){
          grid-column: 3 / span 1;
          grid-row: 1 / span 1;
        }
        .dot:nth-child(6){
          grid-column: 3 / span 1;
          grid-row: 2 / span 1;
        }
      }
    }
  }
  
  .button-container{
    display:flex;
    justify-content:center;
    margin-top:40px;
    button {
      height:30px;
    }
    
  }
  
  .dan-btn{
    text-decoration:none;
    display:inline-block;
    padding: 8px 10px;
    border-radius: 3px;
    background-color: #8C1D40;
    color:#444;
    cursor:pointer;
    &[disabled]{
      opacity:.4;
    }
  }
  
  .dan-btn--default{
    background-color: #dddddd;
    color:#444;
  }
`;

const AutoSimulationDice = ({ rollDice, rollTimes, diceFace, btnDisabled }) => {
    console.log(rollDice, 'rd')
    // const faces = 6;
    // const maxRollTimes = 10;

    // const [intrvl, setIntrvl] = useState();
    // const [diceFace, setDiceFace] = useState(1);
    // const [btnDisabled, setBtnDisabled] = useState(false);
    // const [rollTimes, setRollTimes] = useState();
    useEffect(() => {
        // if (rollTimes === 0) {
        //     clearInterval(intrvl);
        //     setBtnDisabled(false);
        // }
    });

    // function rollDice() {
    //     setBtnDisabled(true);
    //     clearInterval(intrvl);
    //     let counter = Math.floor((Math.random() * maxRollTimes) + 1);
    //     setRollTimes(counter);
    //     const interval = setInterval(() => {
    //         setDiceFace(Math.floor(Math.random() * faces) + 1);
    //         counter--;
    //         setRollTimes(counter);
    //     }, 200);
    //     setIntrvl(interval);
    // }

    const dice = (
        <div className="dice-container">
            <div className={`dice face-${diceFace}`}>
                <div className="face-1">
                    <div className="dot-container">
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="face-3">
                    <div className="dot-container">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="face-4">
                    <div className="dot-container">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="face-2">
                    <div className="dot-container">
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="face-5">
                    <div className="dot-container">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="face-6">
                    <div className="dot-container">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const rollButton = (
        <button className="dan-btn dan-btn--default" disabled={btnDisabled} onClick={() => rollDice('pull')}>
            {btnDisabled}
            Pull
        </button>

    );

    return (
        <Wrapper>
            <div className="main-container">
                <div className="main-dice-container">
                    {dice}
                </div>
                {/* <div className="button-container">
                    {rollButton}
                    <button className="dan-btn dan-btn--default" disabled={btnDisabled} onClick={() => rollDice('push')}>
                        {btnDisabled}
                        Push
                    </button>
                </div> */}
            </div>
        </Wrapper>
    )
}

export default AutoSimulationDice;


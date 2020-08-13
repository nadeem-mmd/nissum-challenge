import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './App.css';
import data from './input.js';

function App() {

  const [show, setShow] = useState(false);
  const [mensFlag, setMensFlag] = useState(true);
  const [womensFlag, setWomensFlag] = useState(false);
  const [kidsFlag, setKidsFlag] = useState(false);
  const [submitB, setSubmitButton] = useState(false);
  const [payload, setPayload] = useState({ payload: [] });

  const allSizes = [];
  const titles = [];
  const titleLabel = [];
  let op = { payload: [] };
  let sizes = [];

  for (let inp of data) {
    sizes = [];
    const title = inp.headerGroupValues[0].headerMetadata[0].hierarchyName;
    titles.push(title);
    titleLabel.push(inp.headerGroupValues[0].headerName);
    allSizes.push(inp.headerGroupValues[0].headerMetadata[0].hierarchyValues.map((val, i) => {
      sizes.push({ value: val.value, selected: val.selected })
      return { hVal: <span onClick={() => { selectionHandler(val.value, title) }} >{val.value}</span>, lable: val.value }
    }))
    op.payload.push({ headerName: inp.headerGroupValues[0].headerMetadata[0].hierarchyName, sizes: sizes });
  }

  useEffect(() => {
    setPayload(op);
  }, []);

  const mHandler = () => {
    setMensFlag(true);
    setWomensFlag(false);
    setKidsFlag(false)
  };

  const wHandler = () => {
    setMensFlag(false);
    setWomensFlag(true);
    setKidsFlag(false)
  };

  const kHandler = () => {
    setMensFlag(false);
    setWomensFlag(false);
    setKidsFlag(true)
  };
  const selectionHandler = (size, title) => {

    let tempPayload = { ...payload }
    const load = [...tempPayload.payload]
    const index = load.findIndex((value) => {
      return title === value.headerName;
    });
    const selectedLoad = load[index];
    const i = selectedLoad.sizes.findIndex((val) => {
      return size === val.value;
    });
    selectedLoad.sizes[i].selected = !selectedLoad.sizes[i].selected;
    load[index] = selectedLoad;
    setPayload(tempPayload);

    let b = []
    payload.payload.forEach(value => {
      b.push(value.sizes.reduce((i, val) => {
        return i || val.selected;
      }, false));
    });
    const setDisbale = b.reduce((i, val) => i || val, false)
    setSubmitButton(setDisbale);

  }

  let sizeKeys = [];
  sizeKeys = payload.payload.map(value => {
    return value.sizes.map(val => {
      return { [val.value]: val.selected }
    })
  });

  return (
    <div className="App">
      <button onClick={() => { setShow(true) }}>Open popup</button>
      <Modal show={show} clicked={() => { setShow(!show) }}>
        <h3>Edit My Sizes</h3>
        <ul>
          <li onClick={mHandler}>Men</li>
          <li onClick={wHandler}>Women</li>
          <li onClick={kHandler}>Kids</li>
        </ul>
        {mensFlag ? <h4>{titleLabel[0]}</h4> : ''}
        {womensFlag ? <h4>{titleLabel[1]}</h4> : ''}
        {kidsFlag ? <h4>{titleLabel[2]}</h4> : ''}
        <div className='titleBox'></div>
        {mensFlag ? (
          <div>
            <div className="title">{titles[0]}</div>
            {allSizes[0].map((value) => {
              let classes = "size"
              if (sizeKeys[0]) {
                sizeKeys[0].forEach(v => {
                  for (let i in v) {
                    if (i === value.lable) {
                      if (v[i])
                        classes = "size selectedSize"
                    }

                  }
                })
              }
              return (<div className={classes}>{value.hVal}</div>)
            })}
          </div>) : ''}
        {womensFlag ? (
          <div>
            <div className="title">{titles[1]}</div>
            {allSizes[1].map((value) => {
              let classes = "size"
              if (sizeKeys[1]) {
                sizeKeys[1].forEach(v => {
                  for (let i in v) {
                    if (i === value.lable) {
                      if (v[i])
                        classes = "size selectedSize"
                    }

                  }
                })
              }
              return (<div className={classes}>{value.hVal}</div>)
            })}
          </div>) : ''}
        {kidsFlag ? (
          <div>
            <div className="title">{titles[2]}</div>
            {allSizes[2].map((value) => {
              let classes = "size"
              if (sizeKeys[2]) {
                sizeKeys[2].forEach(v => {
                  for (let i in v) {
                    if (i === value.lable) {
                      if (v[i])
                        classes = "size selectedSize"
                    }

                  }
                })
              }
              return (<div className={classes}>{value.hVal}</div>)
            })}
          </div>) : ''}
        <button disabled={!submitB} onClick={() => { console.log(payload) }}>Save & Continue</button>
      </Modal>
    </div>
  );
}

export default App;



import React from 'react';
import { Button } from 'antd';
import DragItem from './components/dragItem';
import './App.css';
const App = () => (
  <div className="App">
    <Button type="primary">Button</Button>
    <DragItem />
  </div>
);

export default App;
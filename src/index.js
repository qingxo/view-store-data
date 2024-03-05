import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DragItem from './components/dragItem';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DragItem />
  </React.StrictMode>
);

export default DragItem;
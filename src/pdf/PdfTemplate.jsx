import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Barcode from 'react-barcode';

const PdfTemplate = ({ InvoiceNumber = '', date = '' }) => {
  const ref = useRef(null);
  const [openAirPopup, setAirPopup] = useState(false);
  const [Item, setItem] = useState('');
  const [amount, setAmount] = useState(0);
  const [List, setList] = useState([]);

  const addData = () => {
    if (!Item.trim() || amount <= 0) {
      alert('Please enter valid product and amount.');
      return;
    }
    setList([...List, { product: Item, amount }]);
    setItem('');
    setAmount(0);
    setAirPopup(false);
  };

  const sum = List.reduce((acc, item) => acc + Number(item.amount || 0), 0);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: `Invoice${InvoiceNumber}`,
  });

  const triggerPrint = () => {
    console.log('ref.current at print:', ref.current);
    if (!ref.current) {
      alert('Print content not ready.');
      return;
    }
    if (List.length === 0) {
      alert('There is nothing to print. Please add at least one product.');
      return;
    }
    handlePrint();
  };

  return (
    <>
      <div
        ref={ref}
        style={{
          padding: 20,
          backgroundColor: '#fff',
          color: '#000',
          minWidth: 300,
          border: '1px solid #ccc',
        }}
      >
        <h2>Invoice {InvoiceNumber}</h2>
        {InvoiceNumber && (
          <Barcode
            value={`4n%${InvoiceNumber}+ut%`}
            width={1}
            height={50}
            displayValue={false}
          />
        )}
        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: '10px', width: '100%', borderCollapse: 'collapse' }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => (
              <tr key={index}>
                <td>{item.product}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{sum}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <p>Date: {date}</p>
      </div>

      <button onClick={triggerPrint} style={{ marginTop: 20 }}>
        Print
      </button>

      <button onClick={() => setAirPopup(true)} style={{ marginLeft: 10 }}>
        Add Product
      </button>

      <Dialog open={openAirPopup} onClose={() => setAirPopup(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <input
            type="text"
            value={Item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Product"
            style={{ display: 'block', margin: '10px 0' }}
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
            style={{ display: 'block', margin: '10px 0' }}
          />
          <button onClick={addData}>Add</button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PdfTemplate;

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import Barcode from 'react-barcode';
import { Close } from '@mui/icons-material';
import ReactToPrint from 'react-to-print';

const PdfTemplate = (props) => {
    const ref = useRef();
  const [openAirPopup, setAirPopup] = useState(false);
  const [Item, setItem] = useState("");
  const [amount, setAmount] = useState(0);
  const [List, setList] = useState([]);

  const addData = () => {
    setList(prevList => [...prevList, { product: Item, amount }]);
    setItem("");
    setAmount("");
    setAirPopup(false);
  };

  let sum = 0;
  List.forEach(item => {
    sum += Number(item.amount) || 0;
  });
  return (
    <>
    <div className="container" ref={ref}>
        <div className="container">
          <div className="row">
            <div className='col-md-12'>
              <div className="row">
                <div className="col-md-4 barcode">
                  <Barcode value={`4n%${props.InvoiceNumber}+ut%`} width={1} height={50} displayValue={false} />
                </div>

                <div className="col-md-8 text-right bbc">
                  <h4 style={{ color: '#325aaB' }}><strong>Company Name</strong></h4>
                  <p>(+91) 1234567890</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 text-center">
                  <h2 style={{ color: '#325aab' }}>Invoice</h2>
                  <h5>Id: {props.InvoiceNumber}</h5>
                </div>
              </div>

              <table className='table'>
                <thead>
                  <tr>
                    <th><h5>Products</h5></th>
                    <th><h5>Amount</h5></th>
                  </tr>
                </thead>
                <tbody>
                  {List.map((items, index) => (
                    <tr key={index}>
                      <td className='col-md-9'>{items.product}</td>
                      <td className='col-md-3'>{items.amount}</td>
                    </tr>
                  ))}

                  <tr>
                    <td className='text-right'>
                      <p><strong>Total amount</strong></p>
                      <p><strong>Payable Amount</strong></p>
                    </td>
                    <td>
                      <p><strong>₹ {sum}</strong></p>
                      <p><strong>₹ {sum}</strong></p>
                    </td>
                  </tr>

                  <tr style={{ color: '#FB1d2d' }}>
                    <td className="text-right"><h4><strong>Total:</strong></h4></td>
                    <td className="text-left"><h4><strong>₹ {sum}</strong></h4></td>
                  </tr>
                </tbody>
              </table>

              <div className="col-md-12">
                <p><b>Date :</b> {props.date}</p>
                <br />
                <p><b>:Your name</b></p>
                <p><b>Contact: (+91) 1234567890</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => ref.current}
        documentTitle={`Invoice${props.InvoiceNumber}`}
      />
      <button onClick={() => setAirPopup(true)}>Add Products</button>

      <Dialog open={openAirPopup}>
        <DialogTitle>
          <div className="title">
            <div className="hed">New Product</div>
            <div className="icon-cross" onClick={() => setAirPopup(false)}>Close</div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="container">
            <div className="forms">
              <input type="text" value={Item} onChange={(e) => setItem(e.target.value)} placeholder='Product name' />
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' />
            </div>
            <div className="buttons">
              <button onClick={addData}>Add</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PdfTemplate;
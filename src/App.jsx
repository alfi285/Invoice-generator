import React, { useEffect, useState } from 'react'
import './App.css'
import PdfTemplate from './pdf/PdfTemplate';





const App = () => {
  const [InvoiceNumber, setInvoiceNumber] = useState("");
  const [Dates, setDates] = useState("");
  const [View, setView] = useState(false); // <-- start with form

  useEffect(() => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
    setDates(date);
  }, []);

  const create = () => {
    if (InvoiceNumber.trim()) {
      setView(true);
    } else {
      alert("Enter an invoice number first.");
    }
  }

  return (
    <>
      {
        !View ?

          <div className="container">
            <div className="form">
              <div className="inputs">
                <input
                  type="text"
                  placeholder='Invoice number'
                  value={InvoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>
              <div className="buttons">
                <button onClick={create}>Create</button>
              </div>
            </div>
          </div>
          : <PdfTemplate InvoiceNumber={InvoiceNumber} date={Dates} />
      }
    </>
  )
}

export default App;

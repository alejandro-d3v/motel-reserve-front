import { Link } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";

export default function PaymentFailure () {
  return (
    <HomeLayout pageName='Pago fallido'>
      <div className="items-center shadow-lg w-2/5 mx-auto mt-6 p-4">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-semibold">El pago no se realizó</h2>

          <div className="divider"></div> 
          
          <div style={{ width: '20rem', height: '20rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#EB0100">
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/>
            </svg>
          </div>

          <Link to={`/reservations-list`}>
            <button className="btn btn-neutral mt-3">Ver mis reservaciones</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}
import React from 'react'
import Sidebar from '../../common/components/Sidebar'
import Header from '../../common/components/Header'
import TablePreceptor from '../components/TablePreceptor'

export const PreceptorPage = () => {
  return (
    <>
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row" style={{ height: "100%" }}>
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 px-0" style={{ height: "100vh" }}>
            <Sidebar />
          </div>

          {/* Main content */}
          <main className="col-md-9 col-lg-10 px-0" style={{ overflowY: "auto", height: "100%", backgroundColor: "#f0f0f0" }}>
            <Header />
            <div className="container mt-4 p-4">
              {/* Table */}
                <TablePreceptor />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

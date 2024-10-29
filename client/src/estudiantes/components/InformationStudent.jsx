import React from 'react';

const InformationStudent = ({ isModalOpen, selectedUser, closeModal }) => {
  return (
    <>
      {isModalOpen && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Información Adicional</h5>
                
              </div>
              <div className="modal-body">
                {selectedUser && (
                  <div className="space-y-2">
                    <p>
                      <strong>Nombre:</strong> <span>{selectedUser.names}</span>
                    </p>
                    <p>
                      <strong>Apellido:</strong> <span>{selectedUser.lastname}</span>
                    </p>
                    <p>
                      <strong>DNI:</strong> <span>{selectedUser.dni}</span>
                    </p>
                    <p>
                      <strong>Dirección</strong> <span>{selectedUser.address}</span>
                    </p>
                    <p>
                      <strong>Teléfono</strong> <span>{selectedUser.phone}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  onClick={closeModal} 
                  className="btn btn-primary"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InformationStudent;

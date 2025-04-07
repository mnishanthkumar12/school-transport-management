import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const StudentQR = ({ student }) => {
  if (!student) return null;

  const qrData = JSON.stringify({
    id: student._id,
    name: student.name,
    boardingPoint: student.boardingPoint
  });

  return (
    <div>
      <h6 className="text-center">Scan QR to check-In</h6>
      <QRCodeSVG value={qrData} size={150} />
    </div>
  );
};

export default StudentQR;
